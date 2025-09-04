import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './';

describe('<Header />', () => {
    it('should render header elements correctly', () => {
        render(<Header />);

        const banner = screen.getByRole('banner');
        expect(banner).toBeInTheDocument();

        const logoLink = screen.getByRole('link', { name: /ir para a página inicial/i });
        expect(logoLink).toBeInTheDocument();
        expect(logoLink).toHaveTextContent('InsanyShop');

        const nav = screen.getByRole('navigation', { name: /acões de navegação/i });
        expect(nav).toBeInTheDocument();

        const searchInput = screen.getByRole('searchbox', { name: /campo de busca/i });
        expect(searchInput).toBeInTheDocument();

        const cartButton = screen.getByRole('button', { name: /ir para o carrinho de compras/i });
        expect(cartButton).toBeInTheDocument();

        const notificationBadge = screen.getByText('2');
        expect(notificationBadge).toBeInTheDocument();

        const srText = screen.getByText(/itens no carrinho/i);
        expect(srText).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<Header />);
        expect(container).toMatchSnapshot();
    });
});
