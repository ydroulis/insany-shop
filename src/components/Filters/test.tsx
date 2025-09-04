import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './';

jest.mock('../Selector', () => {
    const mockSelector = ({ type, options, value, setValue, label, id }: { type: string; options: { label: string; value: string; }[]; value: string; setValue: React.Dispatch<React.SetStateAction<string>>; label: string; id: string; }) => (
        <div>
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                aria-label={label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                {options.map((opt: { label: string; value: string; }) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <svg role="img" aria-label={`${type}-icon`}>
                <circle cx="10" cy="10" r="10" />
            </svg>
        </div>
    );
    return mockSelector;
});

describe('<Filters />', () => {
    it('should render', () => {
        render(<Filters />);
        const section = screen.getByTestId('filters-section');
        expect(section).toBeInTheDocument();
    });

    it('should render Selectors properly', () => {
        render(<Filters />);
        expect(
            screen.getByLabelText(/Selecione a categoria/i)
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText(/Selecione a organização dos produtos/i)
        ).toBeInTheDocument();
    });

    it('should allow select a category', () => {
        render(<Filters />);
        const categorySelect = screen.getByLabelText(/Selecione a categoria/i);
        fireEvent.change(categorySelect, { target: { value: 'books' } });
        expect(categorySelect).toHaveValue('books');
    });

    it('should allow select a sort', () => {
        render(<Filters />);
        const sortSelect = screen.getByLabelText(/Selecione a organização dos produtos/i);
        fireEvent.change(sortSelect, { target: { value: 'higher' } });
        expect(sortSelect).toHaveValue('higher');
    });

    it('should render svg icons for each selector', () => {
        render(<Filters />);
        expect(screen.getByLabelText(/category-icon/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/sort-icon/i)).toBeInTheDocument();
    });
    it("should match snapshot", () => {
        const { container } = render(<Filters />);
        expect(container).toMatchSnapshot();
    });
});
