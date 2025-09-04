import React from "react";
import { render, screen } from "@testing-library/react";
import CategoryCard from "./";
import { Category } from "@/types/Categories";
import "@testing-library/jest-dom";

// Mock do next/link (necessário em testes com Next.js)
jest.mock("next/link", () => {
    const Link = ({ children, href, ...rest }: { children: React.ReactNode; href: string; }) => (
        <a href={href} {...rest}>
            {children}
        </a>
    );
    return Link;
});

describe("<CategoryCard />", () => {
    const mockCategory: Category = {
        id: "eletronicos",
        name: "Eletrônicos",
        productCount: 5,
        description: "",
        icon: ""
    };

    it("should render category name", () => {
        render(<CategoryCard {...mockCategory} />);
        expect(
            screen.getByRole("heading", { name: /eletrônicos/i })
        ).toBeInTheDocument();
    });

    it("should render product count in plural", () => {
        render(<CategoryCard {...mockCategory} />);
        expect(screen.getByText("5 produtos")).toBeInTheDocument();
    });

    it("should render product count in singular ", () => {
        render(<CategoryCard {...mockCategory} productCount={1} />);
        expect(screen.getByText("1 produto")).toBeInTheDocument();
    });

    it("should contain an accessible link properly", () => {
        render(<CategoryCard {...mockCategory} />);
        const link = screen.getByRole("link", {
            name: "Ver categoria Eletrônicos com 5 produtos",
        });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/category/eletronicos");
    });

    it("should match snapshot", () => {
        const { container } = render(<CategoryCard {...mockCategory} />);
        expect(container).toMatchSnapshot();
    });
});
