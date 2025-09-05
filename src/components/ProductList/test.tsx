import React, { useRef } from 'react';
import { render, screen, within } from '../../../.jest/test-utils';
import ProductList from '.';
import { ProductsStoreProvider } from '../../providers/productsStoreProvider';
import { CategoriesStoreContext, CategoriesStoreApi } from '../../providers/categoriesStoreProvider';
import { createCategoriesStore } from '../../stores/categoriesStore';
import { Product } from '@/types/Products';

jest.mock('../ProductCard', () => {
    const ProductCard = ({ id, name, price, image, category, stock, rating }: Product) => (
        <div data-testid={`product-card-${id}`}>
            <img src={image} alt={`Imagem do produto ${name}`} />
            <span>{name}</span>
            <span>{category}</span>
            <span>R$ {price.toFixed(2)}</span>
            <span>{stock} em estoque</span>
            <span aria-label={`Avaliação ${rating}`}>⭐ {rating}</span>
        </div>
    );
    return ProductCard;
});

const TestCategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storeRef = useRef<CategoriesStoreApi | null>(null);

    if (!storeRef.current) {
        storeRef.current = createCategoriesStore();
        storeRef.current.setState({
            categories: [
                { id: 'eletronics', name: 'Eletrônicos', productCount: 5, description: 'Categoria de eletrônicos', icon: '' },
                { id: 'clothing', name: 'Roupas e Calçados', productCount: 3, description: 'Categoria de roupas e calçados', icon: '' },
            ],
        });
    }

    return (
        <CategoriesStoreContext.Provider value={storeRef.current}>
            {children}
        </CategoriesStoreContext.Provider>
    );
};

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <ProductsStoreProvider>
            <TestCategoriesProvider>{ui}</TestCategoriesProvider>
        </ProductsStoreProvider>
    );
};

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'iPhone 14',
        description: 'Smartphone Apple',
        price: 9999.99,
        image: '/iphone.png',
        category: 'Eletrônicos',
        stock: 5,
        rating: 4.8,
    },
    {
        id: 2,
        name: 'Tênis Nike',
        description: 'Calçado esportivo',
        price: 499.99,
        image: '/tenis.png',
        category: 'Roupas e Calçados',
        stock: 10,
        rating: 4.2,
    },
];

describe('<ProductList />', () => {
    it('should render section with title and description when pageId is provided', () => {
        renderWithProviders(<ProductList products={mockProducts} pageId="eletronics" />);
        const container = screen.getByRole('region');
        expect(container).toBeInTheDocument();

        const title = screen.getByRole('heading', { name: 'Eletrônicos' });
        expect(title).toBeInTheDocument();

        const description = screen.getByText('Categoria de eletrônicos');
        expect(description).toBeInTheDocument();
    });

    it('should render default title when no pageId is provided', () => {
        renderWithProviders(<ProductList products={mockProducts} />);
        expect(screen.getByText('Todos os Produtos')).toBeInTheDocument();
        expect(screen.queryByText(/Categoria de/i)).not.toBeInTheDocument();
    });

    it('should render all products as listitems', () => {
        renderWithProviders(<ProductList products={mockProducts} />);
        const list = screen.getByRole('list');
        expect(list).toBeInTheDocument();

        const items = within(list).getAllByRole('listitem');
        expect(items.length).toBe(mockProducts.length);

        mockProducts.forEach((product) => {
            const productCard = screen.getByTestId(`product-card-${product.id}`);
            expect(productCard).toBeInTheDocument();
            expect(within(productCard).getByText(product.name)).toBeInTheDocument();
            expect(within(productCard).getByText(product.category as string)).toBeInTheDocument();
            expect(within(productCard).getByText(`R$ ${product.price.toFixed(2)}`)).toBeInTheDocument();
            expect(within(productCard).getByText(`${product.stock} em estoque`)).toBeInTheDocument();

            const rating = within(productCard).getByLabelText(`Avaliação ${product.rating}`);
            expect(rating).toBeInTheDocument();
        });
    });

    it('should render fallback message when no products are available', () => {
        renderWithProviders(<ProductList products={[]} />);
        const status = screen.getByRole('status');
        expect(status).toBeInTheDocument();
        expect(status).toHaveTextContent('Nenhum produto disponível no momento.');
    });

    it('should match snapshot', () => {
        const { container } = renderWithProviders(<ProductList products={mockProducts} />);
        expect(container).toMatchSnapshot();
    });
});
