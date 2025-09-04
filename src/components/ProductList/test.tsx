import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "./";
import { Products } from "@/types/Products";

jest.mock("../ProductCard", () => {
    return function MockProductCard({
        name,
        description,
    }: {
        name: string;
        description: string;
    }) {
        return (
            <div data-testid="mock-product-card">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        );
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
            category: "eletronicos",
            stock: 5,
            rating: 4.5,
        },
        {
            id: 2,
            name: "Produto B",
            description: "Descrição do Produto B",
            price: 200,
            image: "/produto-b.png",
            category: "eletronicos",
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

        const heading = screen.getByRole("heading", { name: /todos os produtos/i });
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

    it("should render with pageId and show category name and description", () => {
        render(<ProductList products={mockProducts} pageId="eletronicos" />);

        const region = screen.getByRole("region", { name: /eletrônicos/i });
        expect(region).toBeInTheDocument();

        const heading = screen.getByRole("heading", { name: /eletrônicos/i });
        expect(heading).toHaveAttribute("id", "product-list-title");

        const description = screen.getByText(/smartphones, laptops, consoles e mais/i);
        expect(description).toBeInTheDocument();
        expect(description).toHaveAttribute("id", "product-list-description");

        expect(region).toHaveAttribute("aria-describedby", "product-list-description");
    });

    it("should render product cards with correct props passed", () => {
        render(<ProductList products={mockProducts} />);

        const cards = screen.getAllByTestId("mock-product-card");
        expect(cards).toHaveLength(mockProducts.length);

        expect(screen.getByText("Descrição do Produto A")).toBeInTheDocument();
        expect(screen.getByText("Descrição do Produto B")).toBeInTheDocument();
    });

    it("should match snapshot without pageId", () => {
        const { container } = render(<ProductList products={mockProducts} />);
        expect(container).toMatchSnapshot();
    });

    it("should match snapshot with pageId", () => {
        const { container } = render(
            <ProductList products={mockProducts} pageId="eletronicos" />
        );
        expect(container).toMatchSnapshot();
    });
});
