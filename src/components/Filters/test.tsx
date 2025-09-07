import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Filters from '../Filters';
import { useCategoriesStore } from '../../providers/categoriesStoreProvider';
import { useProductsStore } from '../../providers/productsStoreProvider';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';
import { getProducts } from '../../services/products';

jest.mock('../../providers/categoriesStoreProvider');
jest.mock('../../providers/productsStoreProvider');
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));
jest.mock('../../services/products');

describe('Filters Component', () => {
    const mockCategories = [
        { id: 'eletronicos', name: 'Eletrônicos' },
        { id: 'clothing', name: 'Roupas e Calçados' },
    ];

    const mockProducts = [
        { id: 1, name: 'Produto 1', price: 100 },
        { id: 2, name: 'Produto 2', price: 50 },
    ];

    const mockSetProducts = jest.fn();

    beforeEach(() => {
        (useCategoriesStore as jest.Mock).mockReturnValue({ categories: mockCategories });
        (useProductsStore as jest.Mock).mockReturnValue({ products: mockProducts, setProducts: mockSetProducts });
        (usePathname as jest.Mock).mockReturnValue('/');
        (getProducts as jest.Mock).mockResolvedValue({ products: mockProducts });
        jest.clearAllMocks();
    });

    it('renders selectors when no pageId is passed', () => {
        render(<Filters />);

        const filtersSection = screen.getByTestId('filters-section');
        expect(filtersSection).toBeInTheDocument();

        expect(screen.getByLabelText('Selecione a categoria')).toBeInTheDocument();
        expect(screen.getByLabelText('Selecione a organização dos produtos')).toBeInTheDocument();
    });

    it('renders breadcrumbs when pageId is passed', () => {
        (usePathname as jest.Mock).mockReturnValue('/category/eletronicos');

        render(<Filters pageId="eletronicos" />);

        const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
        expect(nav).toBeInTheDocument();

        expect(screen.getByText('Produtos')).toBeInTheDocument();
        const categoryLink = screen.getByText('Eletrônicos');
        expect(categoryLink).toBeInTheDocument();

        expect(categoryLink).toHaveClass('active');
        expect(categoryLink).toHaveAttribute('aria-current', 'page');
    });

    it('applies not-active class when breadcrumb link is not active', () => {
        (usePathname as jest.Mock).mockReturnValue('/');

        render(<Filters pageId="eletronicos" />);
        const categoryLink = screen.getByText('Eletrônicos');
        expect(categoryLink).toHaveClass('not-active');
        expect(categoryLink).not.toHaveAttribute('aria-current');
    });

    it('handles category not found in breadcrumbs', () => {
        render(<Filters pageId="unknown" />);
        const categoryLink = screen.queryByText('unknown');
        expect(categoryLink).not.toBeInTheDocument();
    });

    it('updates category selector value and fetches products', async () => {
        render(<Filters />);

        const categoryButton = screen.getByLabelText('Selecione a categoria');
        fireEvent.click(categoryButton);

        const option = screen.getByRole('option', { name: 'Eletrônicos' });
        fireEvent.click(option);

        await waitFor(() => {
            expect(mockSetProducts).toHaveBeenCalledWith(mockProducts);
        });

        expect(categoryButton).toHaveTextContent('Eletrônicos');
    });

    it('updates sort selector value and sorts products', async () => {
        render(<Filters />);

        const sortButton = screen.getByLabelText('Selecione a organização dos produtos');
        fireEvent.click(sortButton);

        const option = screen.getByRole('option', { name: 'Preço: Maior - menor' });
        fireEvent.click(option);

        await waitFor(() => {
            expect(mockSetProducts).toHaveBeenCalledWith([...mockProducts].sort((a, b) => b.price - a.price));
        });

        expect(sortButton).toHaveTextContent('Preço: Maior - menor');
    });

    it('does not render filters section if there are no products', () => {
        (useProductsStore as jest.Mock).mockReturnValue({ products: [], setProducts: mockSetProducts });

        render(<Filters />);

        expect(screen.queryByTestId('filters-section')).not.toBeInTheDocument();
    });

    it('matches snapshot', () => {
        const { container } = render(<Filters />);
        expect(container).toMatchSnapshot();
    });
});
