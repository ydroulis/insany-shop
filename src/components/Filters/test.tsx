import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

jest.mock('../Selector', () => {
    const mockSelector = ({ type, options, value, setValue, label, id }: {
        type: string;
        options: { label: string; value: string; }[];
        value: string;
        setValue: React.Dispatch<React.SetStateAction<string>>;
        label: string;
        id: string;
    }) => (
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
    beforeEach(() => {
        (usePathname as jest.Mock).mockReturnValue('/');
    });

    it('should render', () => {
        render(<Filters pageId="" />);
        const section = screen.getByTestId('filters-section');
        expect(section).toBeInTheDocument();
    });

    it('should render Selectors properly when no pageId is provided', () => {
        render(<Filters pageId="" />);
        expect(
            screen.getByLabelText(/Selecione a categoria/i)
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText(/Selecione a organização dos produtos/i)
        ).toBeInTheDocument();
    });

    it('should allow selecting a category', () => {
        render(<Filters pageId="" />);
        const categorySelect = screen.getByLabelText(/Selecione a categoria/i);
        fireEvent.change(categorySelect, { target: { value: 'books' } });
        expect(categorySelect).toHaveValue('books');
    });

    it('should allow selecting a sort option', () => {
        render(<Filters pageId="" />);
        const sortSelect = screen.getByLabelText(/Selecione a organização dos produtos/i);
        fireEvent.change(sortSelect, { target: { value: 'higher' } });
        expect(sortSelect).toHaveValue('higher');
    });

    it('should render svg icons for each selector', () => {
        render(<Filters pageId="" />);
        expect(screen.getByLabelText(/category-icon/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/sort-icon/i)).toBeInTheDocument();
    });

    it('should render breadcrumb when pageId is provided', () => {
        render(<Filters pageId="livros" />);
        expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
        expect(screen.getByText(/Produtos/)).toBeInTheDocument();
        expect(screen.getByText(/Livros/)).toBeInTheDocument();
    });

    it('should include separator "/" in breadcrumb', () => {
        render(<Filters pageId="livros" />);
        expect(screen.getByText('/')).toBeInTheDocument();
    });

    it('should mark current category link with aria-current="page"', () => {
        (usePathname as jest.Mock).mockReturnValue('/category/livros');
        render(<Filters pageId="livros" />);
        const link = screen.getByRole('link', { name: /Livros/i });
        expect(link).toHaveAttribute('aria-current', 'page');
    });

    it('should NOT mark category link with aria-current when route is different', () => {
        (usePathname as jest.Mock).mockReturnValue('/');
        render(<Filters pageId="livros" />);
        const link = screen.getByRole('link', { name: /Livros/i });
        expect(link).not.toHaveAttribute('aria-current');
    });

    it('should not break when an invalid pageId is provided', () => {
        render(<Filters pageId="invalid-category" />);
        expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
        expect(screen.queryByText(/invalid-category/i)).not.toBeInTheDocument();
    });

    it('should match snapshot (with selectors)', () => {
        const { container } = render(<Filters pageId="" />);
        expect(container).toMatchSnapshot();
    });

    it('should match snapshot (with breadcrumb)', () => {
        const { container } = render(<Filters pageId="livros" />);
        expect(container).toMatchSnapshot();
    });
});
