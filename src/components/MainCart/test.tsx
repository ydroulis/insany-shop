import React, { FC, ImgHTMLAttributes } from 'react';
import { render, screen } from '@testing-library/react';
import MainCart from './';
import { useCartStore } from '../../providers/cartStoreProvider';
import type { CartStore } from '../../stores/cartStore';
import type { CartProduct } from '../../types/Cart';

jest.mock('../../providers/cartStoreProvider', () => ({
    useCartStore: jest.fn(),
}));

const mockBack = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        back: mockBack,
    }),
}));

jest.mock('next/image', () => {
    const MockedImage: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
        return <img {...props} alt={props.alt || 'mocked image'} />;
    };
    return {
        __esModule: true,
        default: MockedImage,
    };
});

jest.mock('../CartList', () => ({
    __esModule: true,
    default: ({ products, ...props }: { products: CartProduct[] }) => (
        <ul {...props}>
            {products.map((p) => (
                <li key={p.id} data-testid="cart-product">
                    {p.name}
                    <svg data-testid="icon-svg" />
                </li>
            ))}
        </ul>
    ),
}));

jest.mock('../SumaryOrder', () => ({
    __esModule: true,
    default: ({ subtotal, ...props }: { subtotal: number }) => (
        <section {...props}>
            <span data-testid="subtotal">{subtotal}</span>
            <svg data-testid="summary-icon" />
        </section>
    ),
}));

describe('<MainCart />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockUseCartStore = (mockData: CartStore) => {
        (useCartStore as jest.Mock).mockImplementation(
            (selector: (state: CartStore) => unknown) => selector(mockData)
        );
    };

    it('should render cart with products', () => {
        const cartProducts: CartProduct[] = [
            { id: 1, name: 'Produto 1', price: 100, items: 1, description: '', image: '', stock: 0 },
            { id: 2, name: 'Produto 2', price: 100, items: 1, description: '', image: '', stock: 0 },
        ];

        mockUseCartStore({
            cart: { content: cartProducts, total: 200 },
            addProductToCart: jest.fn(),
            removeProductFromCart: jest.fn(),
            changeItems: jest.fn(),
            showFeedback: jest.fn(),
            feedback: false,
        });

        render(<MainCart />);

        expect(screen.getByRole('main')).toBeInTheDocument();
        expect(screen.getAllByTestId('cart-product')).toHaveLength(2);
        expect(screen.getAllByTestId('icon-svg')).toHaveLength(2);
        expect(screen.getByTestId('subtotal')).toHaveTextContent('200');
        expect(screen.getByTestId('summary-icon')).toBeInTheDocument();
    });

    it('should render empty cart message', () => {
        mockUseCartStore({
            cart: { content: [], total: 0 },
            addProductToCart: jest.fn(),
            removeProductFromCart: jest.fn(),
            changeItems: jest.fn(),
            showFeedback: jest.fn(),
            feedback: false,
        });

        render(<MainCart />);

        const status = screen.getByRole('status');
        expect(status).toBeInTheDocument();
        expect(screen.getByText(/seu carrinho esta vazio/i)).toBeInTheDocument();
        expect(status).toHaveAttribute('aria-labelledby', 'empty-cart-title');
    });

    it('should match snapshot', () => {
        const cartProducts: CartProduct[] = [
            { id: 1, name: 'Produto 1', price: 100, items: 1, description: '', image: '', stock: 0 },
            { id: 2, name: 'Produto 2', price: 100, items: 1, description: '', image: '', stock: 0 },
        ];

        mockUseCartStore({
            cart: { content: cartProducts, total: 200 },
            addProductToCart: jest.fn(),
            removeProductFromCart: jest.fn(),
            changeItems: jest.fn(),
            showFeedback: jest.fn(),
            feedback: false,
        });

        const { container } = render(<MainCart />);
        expect(container).toMatchSnapshot();
    });
});
