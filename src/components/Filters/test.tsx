import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../Filters';
import { useCategoriesStore } from '../../providers/categoriesStoreProvider';
import { useProductsStore } from '../../providers/productsStoreProvider';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('../../providers/categoriesStoreProvider');
jest.mock('../../providers/productsStoreProvider');
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

describe('Filters Component', () => {
    const mockCategories = [
        { id: 'eletronics', name: 'Eletrônicos' },
        { id: 'clothing', name: 'Roupas e Calçados' },
    ];

    const mockProducts = [
        { id: '1', name: 'Produto 1' },
        { id: '2', name: 'Produto 2' },
    ];

    beforeEach(() => {
        (useCategoriesStore as jest.Mock).mockReturnValue({ categories: mockCategories });
        (useProductsStore as jest.Mock).mockReturnValue({ products: mockProducts });
        (usePathname as jest.Mock).mockReturnValue('/');
    });

    it('should render selectors when no pageId is passed', () => {
        render(<Filters />);

        const filtersSection = screen.getByTestId('filters-section');
        expect(filtersSection).toBeInTheDocument();

        expect(screen.getByLabelText('Selecione a categoria')).toBeInTheDocument();
        expect(screen.getByLabelText('Selecione a organização dos produtos')).toBeInTheDocument();
    });

    it('should render breadcrumbs when pageId is passed', () => {
        (usePathname as jest.Mock).mockReturnValue('/category/eletronics');

        render(<Filters pageId="eletronics" />);

        const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
        expect(nav).toBeInTheDocument();

        expect(screen.getByText('Produtos')).toBeInTheDocument();
        const categoryLink = screen.getByText('Eletrônicos');
        expect(categoryLink).toBeInTheDocument();

        expect(categoryLink).toHaveClass('active');
        expect(categoryLink).toHaveAttribute('aria-current', 'page');
    });

    it('should apply not-active class when breadcrumb link is not active', () => {
        (usePathname as jest.Mock).mockReturnValue('/');

        render(<Filters pageId="eletronics" />);
        const categoryLink = screen.getByText('Eletrônicos');
        expect(categoryLink).toHaveClass('not-active');
        expect(categoryLink).not.toHaveAttribute('aria-current');
    });

    it('should handle category not found in breadcrumbs', () => {
        render(<Filters pageId="unknown" />);
        const categoryLink = screen.queryByText('unknown');
        expect(categoryLink).toBeEmptyDOMElement || expect(categoryLink).not.toBeInTheDocument();
    });

    it('should update category selector value on change', () => {
        render(<Filters />);

        const categorySelector = screen.getByLabelText('Selecione a categoria') as HTMLSelectElement;
        fireEvent.change(categorySelector, { target: { value: 'clothing' } });

        expect(categorySelector.value).toBe('clothing');
    });

    it('should update sort selector value on change', () => {
        render(<Filters />);

        const sortSelector = screen.getByLabelText('Selecione a organização dos produtos') as HTMLSelectElement;
        fireEvent.change(sortSelector, { target: { value: 'higher' } });

        expect(sortSelector.value).toBe('higher');
    });

    it('should not render filters section if there are no products', () => {
        (useProductsStore as jest.Mock).mockReturnValue({ products: [] });

        render(<Filters />);

        expect(screen.queryByTestId('filters-section')).not.toBeInTheDocument();
    });
});
