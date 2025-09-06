import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChartItem from './';

interface QuantitySelectorMockProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    label: string;
    id: string;
}

const QuantitySelectorMock: React.FC<QuantitySelectorMockProps> = ({ value, setValue, label, id }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <select
                data-testid="quantity-selector"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    );
};

// Definindo displayName para ESLint
QuantitySelectorMock.displayName = 'QuantitySelectorMock';

jest.mock('../QuantitySelector', () => QuantitySelectorMock);


describe('<ChartItem />', () => {
    const defaultProps = {
        name: 'Produto Teste',
        description: 'Descrição do produto teste',
        price: 123.45,
        image: 'https://via.placeholder.com/256x211.png',
    };

    it('should render properly all elements', () => {
        render(<ChartItem {...defaultProps} />);

        const container = screen.getByTestId('chart-item');
        expect(container).toBeInTheDocument();

        const image = screen.getByRole('img', { name: /imagem do produto produto teste/i });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src');

        expect(screen.getByText(defaultProps.name)).toBeInTheDocument();

        expect(screen.getByText(defaultProps.description)).toBeInTheDocument();

        expect(
            screen.getByText((content) => content.replace(/\s/g, '') === 'R$123,45')
        ).toBeInTheDocument();

        const select = screen.getByTestId('quantity-selector') as HTMLSelectElement;
        expect(select).toBeInTheDocument();
        expect(select.value).toBe('1');

        const removeButton = screen.getByRole('button', { name: /remover produto teste do carrinho/i });
        expect(removeButton).toBeInTheDocument();
        const svg = removeButton.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('should allow change quantity', () => {
        render(<ChartItem {...defaultProps} />);
        const select = screen.getByTestId('quantity-selector') as HTMLSelectElement;

        fireEvent.change(select, { target: { value: '3' } });
        expect(select.value).toBe('3');
    });

    it('should match snapshot', () => {
        const { container } = render(<ChartItem {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });
});
