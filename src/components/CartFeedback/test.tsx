import React from 'react';
import { render, screen } from '@testing-library/react';
import CartFeedback from './';

// Tipagem do mock do Container
interface MockContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    $color?: string;
    $background?: string;
    'aria-live'?: 'off' | 'polite' | 'assertive';
}

// Mock do styled-component Container
jest.mock('./styles', () => ({
    Container: ({ children, $color, $background, ...props }: MockContainerProps) => (
        <div
            data-testid="container"
            data-color={$color}
            data-background={$background}
            {...props}
        >
            {children}
        </div>
    ),
}));

describe('<CartFeedback />', () => {
    it('should render children propperly', () => {
        render(
            <CartFeedback color="#000" background="#fff">
                Produto adicionado ao carrinho
            </CartFeedback>
        );

        expect(
            screen.getByText(/produto adicionado ao carrinho/i)
        ).toBeInTheDocument();
    });

    it('should have role alert and aria-live assertive', () => {
        render(
            <CartFeedback color="#000" background="#fff">
                Mensagem de teste
            </CartFeedback>
        );

        const container = screen.getByTestId('container');
        expect(container).toHaveAttribute('role', 'alert');
        expect(container).toHaveAttribute('aria-live', 'assertive');
    });

    it('should apply aria-label propperly for success', () => {
        render(
            <CartFeedback color="#000" background="#fff" type="success">
                Sucesso
            </CartFeedback>
        );

        const container = screen.getByTestId('container');
        expect(container).toHaveAttribute('aria-label', 'Aviso de sucesso');
    });

    it('should apply aria-label propperly for error', () => {
        render(
            <CartFeedback color="#000" background="#fff" type="error">
                Erro
            </CartFeedback>
        );

        const container = screen.getByTestId('container');
        expect(container).toHaveAttribute('aria-label', 'Aviso de erro');
    });

    it('should apply aria-label propperly for info (default)', () => {
        render(
            <CartFeedback color="#000" background="#fff">
                Info
            </CartFeedback>
        );

        const container = screen.getByTestId('container');
        expect(container).toHaveAttribute('aria-label', 'Aviso de informação');
    });

    it('should pass color and background to container', () => {
        render(
            <CartFeedback color="red" background="blue">
                Testando estilos
            </CartFeedback>
        );

        const container = screen.getByTestId('container');
        expect(container).toHaveAttribute('data-color', 'red');
        expect(container).toHaveAttribute('data-background', 'blue');
    });

    it('should match snapshot', () => {
        const { container } = render(
            <CartFeedback color="red" background="blue">
                Testando estilos
            </CartFeedback>
        );
        expect(container).toMatchSnapshot();
    });
});
