import React from "react";
import { render, screen, within } from "@testing-library/react";
import Main from "./";
import { Product } from "@/types/Products";

jest.mock("../Filters", () => {
    const mockFilters = () => <div data-testid="filters-mock">Filtros</div>;
    return mockFilters;
});

jest.mock("../ProductList", () => {
    const ProductList = ({ products }: { products: Product[] }) => (
        <ul data-testid="product-list-mock">
            {products.map((product) => (
                <li key={product.id}>
                    <img
                        src={product.image}
                        alt={`Imagem do produto ${product.name}`}
                    />
                    <span>{product.name}</span>
                    <span>{product.category}</span>
                    <span>R$ {product.price.toFixed(2)}</span>
                    <span>{product.stock} em estoque</span>
                    <span aria-label={`Avaliação ${product.rating}`}>
                        ⭐ {product.rating}
                    </span>
                    <span>{product.brand}</span>
                </li>
            ))}
        </ul>
    );

    return ProductList;
});

describe("<Main />", () => {
    beforeEach(() => {
        render(<Main />);
    });

    it("should render the main landmark with correct accessibility attributes", () => {
        const main = screen.getByRole("main", { name: /catálogo de produtos/i });
        expect(main).toBeInTheDocument();
        expect(main.tagName.toLowerCase()).toBe("main");
    });

    it("should render the Filters section", () => {
        expect(screen.getByTestId("filters-mock")).toBeInTheDocument();
        expect(screen.getByText("Filtros")).toBeVisible();
    });

    it("should render the ProductList with products", () => {
        const list = screen.getByTestId("product-list-mock");
        expect(list).toBeInTheDocument();

        const items = within(list).getAllByRole("listitem");
        expect(items.length).toBeGreaterThan(0);

        const firstItem = items[0];
        expect(within(firstItem).getByRole("img")).toHaveAttribute(
            "alt",
            expect.stringMatching(/imagem do produto/i)
        );
        expect(within(firstItem).getByText(/iPhone/i)).toBeInTheDocument();
        expect(within(firstItem).getByText(/Apple/i)).toBeInTheDocument();
    });

    it("should display price, stock and rating correctly", () => {
        const list = screen.getByTestId("product-list-mock");
        const items = within(list).getAllByRole("listitem");

        items.forEach((item) => {
            const price = within(item).getByText(/R\$/i);
            expect(price).toBeInTheDocument();

            const stock = within(item).getByText(/em estoque/i);
            expect(stock).toBeInTheDocument();

            const rating = within(item).getByLabelText(/avaliação/i);
            expect(rating).toBeInTheDocument();
        });
    });

    it("should ensure all product images have accessible alt text", () => {
        const images = screen.getAllByRole("img");
        images.forEach((img) => {
            expect(img).toHaveAttribute("alt");
            expect(img.getAttribute("alt")).toMatch(/imagem do produto/i);
        });
    });
});
