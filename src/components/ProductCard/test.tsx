import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./";
import { Product } from "@/types/Products";

jest.mock("../Button", () => {
    const MockButton = ({ action, ariaLabel, children }: { action: () => void; ariaLabel?: string; children: React.ReactNode }) => (
        <button onClick={action} aria-label={ariaLabel}>
            {children}
        </button>
    );
    MockButton.displayName = "Button";
    return MockButton;
});

describe("<ProductCard />", () => {
    const mockProduct: Product = {
        id: 1,
        name: "Produto Teste",
        description: "Descrição do produto teste",
        price: 99.99,
        image: "/fake-image.png",
        category: "Eletrônicos",
        stock: 10,
        rating: 4.5,
    };

    it("should render all product information", () => {
        render(<ProductCard {...mockProduct} />);

        const link = screen.getByRole("link", { name: /ver detalhes do produto produto teste/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "#");

        const image = screen.getByAltText(/imagem do produto produto teste/i);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", expect.stringContaining("fake-image.png"));

        expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: mockProduct.name })).toBeInTheDocument();
        expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

        expect(screen.getByText("R$ 99,99")).toBeInTheDocument();

        const stock = screen.getByText(/10 em estoque/i);
        expect(stock).toBeInTheDocument();
        expect(stock).toHaveAttribute("aria-label", "10 unidades em estoque");

        const starIcon = screen.getByRole("img", { hidden: true });
        expect(starIcon).toBeInTheDocument();

        const ratingValue = screen.getByText(mockProduct.rating.toString());
        expect(ratingValue).toBeInTheDocument();
    });

    it("should call Button action when clicked", () => {
        const mockAction = jest.fn();
        render(
            <ProductCard
                {...mockProduct}
            />
        );

        const button = screen.getByRole("button", { name: /adicionar produto teste ao carrinho/i });
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(button).toBeEnabled();
    });
});
