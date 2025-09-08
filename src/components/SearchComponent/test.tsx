import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchComponent from './';
import { searchProducts } from '../../services/search';
import { getProducts } from '../../services/products';
import { useProductsStore } from '../../providers/productsStoreProvider';

jest.mock('../../services/search', () => ({
    searchProducts: jest.fn().mockResolvedValue({ suggestions: ['Produto A'], query: 'Produto' }),
}));

jest.mock('../../services/products', () => ({
    getProducts: jest.fn().mockResolvedValue({ products: [{ name: 'Produto A' }] }),
}));

jest.mock('../../providers/productsStoreProvider', () => ({
    useProductsStore: jest.fn(),
}));

describe('<SearchComponent />', () => {
    const mockSetProducts = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useProductsStore as jest.Mock).mockReturnValue({
            setProducts: mockSetProducts,
        });
    });

    it('should render the search input, icon, and clear button', () => {
        render(<SearchComponent />);

        const container = screen.getByRole('search', { name: /pesquisar no site/i });
        expect(container).toBeInTheDocument();

        const input = screen.getByRole('searchbox', { name: /campo de busca/i });
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'Procurando algo específico?');

        const icon = screen.getByTestId('search-icon');
        expect(icon).toBeInTheDocument();
    });

    it('should open suggestions when typing and allow selection by click', async () => {
        (searchProducts as jest.Mock).mockResolvedValue({
            suggestions: ['Produto A', 'Produto B'],
            query: 'Pro',
        });
        (getProducts as jest.Mock).mockResolvedValue({ products: [{ name: 'Produto A' }, { name: 'Produto B' }] });

        render(<SearchComponent />);

        const input = screen.getByRole('searchbox', { name: /campo de busca/i });
        fireEvent.change(input, { target: { value: 'Pro' } });

        await waitFor(() => expect(searchProducts).toHaveBeenCalledWith('Pro'));

        const suggestionA = await screen.findByText('Produto A');
        expect(suggestionA).toBeInTheDocument();

        fireEvent.click(suggestionA);
        expect(mockSetProducts).toHaveBeenCalledWith([{ name: 'Produto A' }]);
        expect(input).toHaveValue('Produto A');
    });

    it('should allow selection of suggestion with Enter key', async () => {
        (searchProducts as jest.Mock).mockResolvedValue({
            suggestions: ['Produto C'],
            query: 'Pro',
        });
        (getProducts as jest.Mock).mockResolvedValue({ products: [{ name: 'Produto C' }] });

        render(<SearchComponent />);
        const input = screen.getByRole('searchbox', { name: /campo de busca/i });

        fireEvent.change(input, { target: { value: 'Pro' } });

        const suggestionC = await screen.findByText('Produto C');
        suggestionC.focus();

        fireEvent.keyDown(suggestionC, { key: 'Enter', code: 'Enter' });

        expect(mockSetProducts).toHaveBeenCalledWith([{ name: 'Produto C' }]);
        expect(input).toHaveValue('Produto C');
    });

    it('should clear input when clicking the clear button', async () => {
        render(<SearchComponent />);

        const input = screen.getByRole('searchbox', { name: /campo de busca/i });
        fireEvent.change(input, { target: { value: 'Teste' } });
        expect(input).toHaveValue('Teste');

        const clearButton = screen.getByRole('button', { name: /limpar busca/i });
        fireEvent.click(clearButton);

        expect(input).toHaveValue('');
    });

    it('should match snapshot', () => {
        const { container } = render(<SearchComponent />);
        expect(container).toMatchSnapshot();
    });
});
