import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from './';

jest.mock('../QuantitySelector', () => {
    const QuantitySelectorMock = ({
        value,
        setValue,
        label,
        id,
    }: {
        value: string;
        setValue: React.Dispatch<React.SetStateAction<string>>;
        label: string;
        id: string;
    }) => (
        <div>
            <label htmlFor={id}>{label}</label>
            <select
                data-testid="quantity-selector"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    );
    QuantitySelectorMock.displayName = 'QuantitySelectorMock';
    return QuantitySelectorMock;
});

type MockCartProduct = {
    id: number;
    name: string;
    items: number;
};

type MockCart = {
    content: MockCartProduct[];
};

const mockCartStore = {
    removeProductFromCart: jest.fn(),
    changeItems: jest.fn(),
    showFeedback: jest.fn(),
    cart: { content: [] } as MockCart, // 👈 garantindo que cart.content existe
};

jest.mock('../../providers/cartStoreProvider', () => ({
    useCartStore: jest.fn(() => mockCartStore),
}));

describe('<CartItem />', () => {
    const defaultProps = {
        name: 'Produto Teste',
        description: 'Descrição do produto teste',
        price: 123.45,
        image: 'https://via.placeholder.com/256x211.png',
        id: 1,
        stock: 5,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockCartStore.cart.content = []; // limpa carrinho antes de cada teste
    });

    it('should render properly all elements', () => {
        render(<CartItem {...defaultProps} />);

        const container = screen.getByTestId('cart-item');
        expect(container).toBeInTheDocument();

        const image = screen.getByRole('img', { name: /imagem do produto produto teste/i });
        expect(image).toBeInTheDocument();

        expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
        expect(screen.getByText(defaultProps.description)).toBeInTheDocument();

        expect(
            screen.getByText((content) => content.replace(/\s/g, '') === 'R$123,45')
        ).toBeInTheDocument();

        const select = screen.getByTestId('quantity-selector') as HTMLSelectElement;
        expect(select).toBeInTheDocument();
        expect(select.value).toBe('1');

        const removeButton = screen.getByRole('button', { name: /remover produto teste do carrinho/i });
        expect(removeButton).toBeInTheDocument();
        const svg = removeButton.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('should allow change quantity and call changeItems', () => {
        render(<CartItem {...defaultProps} />);
        const select = screen.getByTestId('quantity-selector') as HTMLSelectElement;

        fireEvent.change(select, { target: { value: '3' } });
        expect(select.value).toBe('3');
        expect(mockCartStore.changeItems).toHaveBeenCalledWith(defaultProps.id, 3);
    });

    it('should call removeProductFromCart and showFeedback on remove button click', () => {
        render(<CartItem {...defaultProps} />);
        const removeButton = screen.getByRole('button', { name: /remover produto teste do carrinho/i });

        fireEvent.click(removeButton);
        expect(mockCartStore.removeProductFromCart).toHaveBeenCalledWith(defaultProps.id, defaultProps.price);
        expect(mockCartStore.showFeedback).toHaveBeenCalledWith(true);
    });

    it('should match snapshot', () => {
        const { container } = render(<CartItem {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });
});
