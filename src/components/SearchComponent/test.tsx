import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchComponent from './';

describe('<SearchComponent />', () => {

    it('should render the search input and icon', () => {
        render(<SearchComponent />);

        const container = screen.getByRole('search', { name: /pesquisar no site/i });
        expect(container).toBeInTheDocument();

        const input = screen.getByRole('searchbox', { name: /campo de busca/i });
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'Procurando algo específico');

        const icon = screen.getByTestId('search-icon');
        expect(icon).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<SearchComponent />);
        expect(container).toMatchSnapshot();
    });
});
