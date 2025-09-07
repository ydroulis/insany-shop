import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './';
import { useCartStore } from '../../providers/cartStoreProvider';
import { useRouter } from 'next/navigation';

interface CartState {
    cart: {
        content: { id: string }[];
    };
    showFeedback: (value: boolean) => void;
}

jest.mock('../../providers/cartStoreProvider', () => ({
    useCartStore: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('../SearchComponent', () => {
    const SearchComponentMock = () => <input data-testid="search-component" />;
    SearchComponentMock.displayName = 'SearchComponentMock';
    return SearchComponentMock;
});

describe('<Header />', () => {
    const pushMock = jest.fn();
    const showFeedbackMock = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
        (useCartStore as jest.Mock).mockImplementation(
            (selector: (state: CartState) => unknown) =>
                selector({
                    cart: { content: [{ id: '1' }, { id: '2' }] },
                    showFeedback: showFeedbackMock,
                })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render logo and link to home', () => {
        render(<Header />);

        const logoLink = screen.getByRole('link', { name: /ir para a página inicial/i });
        expect(logoLink).toBeInTheDocument();
        expect(logoLink).toHaveTextContent('InsanyShop');
    });

    it('should render search component', () => {
        render(<Header />);
        expect(screen.getByTestId('search-component')).toBeInTheDocument();
    });

    it('should render cart button with correct quantity and SVG icon', () => {
        render(<Header />);

        const cartButton = screen.getByLabelText(/ir para o carrinho de compras/i);
        expect(cartButton).toBeInTheDocument();

        expect(screen.getByText('2')).toBeInTheDocument();

        const svg = cartButton.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('should redirect to /cart when cart button is clicked', () => {
        render(<Header />);

        fireEvent.click(screen.getByLabelText(/ir para o carrinho de compras/i));

        expect(showFeedbackMock).toHaveBeenCalledWith(false);
        expect(pushMock).toHaveBeenCalledTimes(1);
        expect(pushMock).toHaveBeenCalledWith('/cart');
    });

    it('should contain roles and ARIA attributes', () => {
        render(<Header />);

        const nav = screen.getByRole('navigation', { name: /acões de navegação/i });
        expect(nav).toBeInTheDocument();

        const cartButton = screen.getByLabelText(/ir para o carrinho de compras/i);
        expect(cartButton).toHaveAttribute('aria-haspopup', 'true');
        expect(cartButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should match snapshot', () => {
        const { container } = render(<Header />);
        expect(container).toMatchSnapshot();
    });
});
