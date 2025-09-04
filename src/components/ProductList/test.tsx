import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "./";
import { Products } from "@/types/Products";

jest.mock("../ProductCard", () => {
    return function MockProductCard({ name }: { name: string }) {
        return <div data-testid="mock-product-card">{name}</div>;
    };
});

describe("<ProductList />", () => {
    const mockProducts: Products = [
        {
            id: 1,
            name: "Produto A",
            description: "Descrição do Produto A",
            price: 100,
            image: "/produto-a.png",
            category: "Categoria A",
            stock: 5,
            rating: 4.5,
        },
        {
            id: 2,
            name: "Produto B",
            description: "Descrição do Produto B",
            price: 200,
            image: "/produto-b.png",
            category: "Categoria B",
            stock: 2,
            rating: 3.8,
        },
    ];

    it("should render section with role='region' and associated title", () => {
        render(<ProductList products={mockProducts} />);

        const region = screen.getByRole("region", {
            name: /todos os produtos/i,
        });
        expect(region).toBeInTheDocument();

        const heading = screen.getByText(/todos os produtos/i);
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveAttribute("id", "product-list-title");
    });

    it("should render list of products when not empty", () => {
        render(<ProductList products={mockProducts} />);

        const list = screen.getByRole("list");
        expect(list).toBeInTheDocument();

        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(mockProducts.length);

        expect(screen.getByText("Produto A")).toBeInTheDocument();
        expect(screen.getByText("Produto B")).toBeInTheDocument();
    });

    it("should not render fallback message when products are present", () => {
        render(<ProductList products={mockProducts} />);
        expect(
            screen.queryByText(/nenhum produto disponível/i)
        ).not.toBeInTheDocument();
    });

    it("should render acessible fallback message when products are empty", () => {
        render(<ProductList products={[]} />);

        const fallback = screen.getByRole("status");
        expect(fallback).toBeInTheDocument();
        expect(fallback).toHaveAttribute("aria-live", "polite");
        expect(fallback).toHaveTextContent(/nenhum produto disponível/i);
    });

    it("should match snapshot", () => {
        const { container } = render(<ProductList products={mockProducts} />);
        expect(container).toMatchSnapshot();
    });
});
