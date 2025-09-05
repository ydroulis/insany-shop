import React from 'react';
import { render, screen, fireEvent } from '../../../.jest/test-utils';
import ProductCard from './';
import { Product } from '@/types/Products';

jest.mock('../Button', () => {
    const MockButton = ({ action, ariaLabel, children }: { action: () => void; ariaLabel?: string; children: React.ReactNode }) => (
        <button onClick={action} aria-label={ariaLabel}>
            {children}
        </button>
    );
    MockButton.displayName = "Button";
    return MockButton;
});

describe('<ProductCard />', () => {
    const mockProduct: Product = {
        id: 1,
        name: "Produto Teste",
        description: "Descrição do produto teste com mais detalhes",
        price: 99.99,
        image: "/fake-image.png",
        category: "Eletrônicos",
        stock: 10,
        rating: 4.5,
    };

    beforeEach(() => {
        render(<ProductCard {...mockProduct} />);
    });

    it('should render the card link with correct aria-label', () => {
        const link = screen.getByRole('link', { name: /ver detalhes do produto produto teste/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/product/1');
    });

    it('should render product image with correct alt and src', () => {
        const image = screen.getByAltText(/imagem do produto produto teste/i);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', expect.stringContaining('fake-image.png'));
    });

    it('should render product details', () => {
        expect(screen.getByText(mockProduct.category as string)).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: mockProduct.name })).toBeInTheDocument();
        expect(screen.getByText(mockProduct.description.slice(0, 58) + "...")).toBeInTheDocument();
        expect(screen.getByText(`R$ ${mockProduct.price.toFixed(2).replace('.', ',')}`)).toBeInTheDocument();
        const stock = screen.getByText(/10 em estoque/i);
        expect(stock).toBeInTheDocument();
        expect(stock).toHaveAttribute('aria-label', '10 unidades em estoque');
    });

    it('should render the rating with svg star icon', () => {
        const rate = screen.getByText(mockProduct.rating.toString());
        expect(rate).toBeInTheDocument();

        const svgIcon = screen.getByTestId('star-icon');
        expect(svgIcon).toBeInTheDocument();
    });

    it('should render the add to cart button and respond to click', () => {
        const button = screen.getByRole('button', { name: /adicionar produto teste ao carrinho/i });
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();

        fireEvent.click(button);
    });

    it('should match snapshot', () => {
        const { container } = render(<ProductCard {...mockProduct} />);
        expect(container).toMatchSnapshot();
    });
});
