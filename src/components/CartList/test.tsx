import React from 'react';
import { render, screen } from '@testing-library/react';
import CartList from './';

const CartItemMock = ({
    name,
    description,
    price,
    image,
}: {
    name: string;
    description: string;
    price: number;
    image: string;
}) => (
    <div data-testid="cart-item">
        <p>{name}</p>
        <p>{description}</p>
        <p>{price}</p>
        <img src={image} alt={name} />
    </div>
);

CartItemMock.displayName = 'CartItemMock';

jest.mock('../CartItem', () => CartItemMock);

describe('<CartList />', () => {
    const products = [
        {
            id: 1,
            name: 'Produto 1',
            description: 'Desc 1',
            price: 10,
            image: 'img1.png',
            category: 'Roupas',
            stock: 10,
            rating: 4.5,
        },
        {
            id: 2,
            name: 'Produto 2',
            description: 'Desc 2',
            price: 20,
            image: 'img2.png',
            category: 'Roupas',
            stock: 10,
            rating: 4.5,
        },
    ];

    it('should render all elements properly', () => {
        render(<CartList products={products} />);

        const title = screen.getByRole('heading', { name: /resumo do pedido/i });
        expect(title).toBeInTheDocument();

        const totalText = `Total (${products.length} produtos)`;
        expect(
            screen.getByText((content, element) =>
                element?.tagName.toLowerCase() === 'p' && content.includes(totalText)
            )
        ).toBeInTheDocument();
        expect(screen.getByText('R$ 30,00')).toBeInTheDocument();

        const list = screen.getByRole('list', { name: /lista de produtos do carrinho/i });
        expect(list).toBeInTheDocument();

        const items = screen.getAllByTestId('cart-item');
        expect(items.length).toBe(products.length);
        products.forEach((product, index) => {
            expect(items[index]).toHaveTextContent(product.name);
            expect(items[index]).toHaveTextContent(product.description);
            expect(items[index].querySelector('img')).toHaveAttribute('src', product.image);
        });
    });

    it('should match snapshot', () => {
        const { container } = render(<CartList products={products} />);
        expect(container).toMatchSnapshot();
    });
});