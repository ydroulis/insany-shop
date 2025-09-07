import React from "react";
import { render, screen, fireEvent } from "../../../.jest/test-utils";
import ProductCard from "./";
import type { Product } from "@/types/Products";

const mockCartStore = {
    addProductToCart: jest.fn(),
    showFeedback: jest.fn(),
    feedback: true,
};

jest.mock("../../providers/cartStoreProvider", () => ({
    useCartStore: <T,>(selector: (state: typeof mockCartStore) => T): T =>
        selector(mockCartStore),
}));

jest.mock("../Button", () => {
    const MockButton = ({
        action,
        ariaLabel,
        children,
    }: {
        action: () => void;
        ariaLabel?: string;
        children: React.ReactNode;
    }) => (
        <button onClick={action} aria-label={ariaLabel}>
            {children}
        </button>
    );
    MockButton.displayName = "Button";
    return MockButton;
});

jest.mock("../CartFeedback", () => {
    const MockCartFeedback = ({
        children,
    }: {
        children: React.ReactNode;
        color?: string;
        background?: string;
        type?: "success" | "error" | "info";
    }) => <div data-testid="cart-feedback">{children}</div>;
    MockCartFeedback.displayName = "CartFeedback";
    return MockCartFeedback;
});

describe("<ProductCard />", () => {
    const mockProduct: Product = {
        id: 1,
        name: "Produto Teste",
        description: "Descrição do produto teste com mais detalhes",
        price: 99.99,
        image: "/fake-image.png",
        category: "Eletrônicos",
        stock: 10,
        rating: 4.5,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        render(<ProductCard {...mockProduct} />);
    });

    it("should render the card link with correct aria-label", () => {
        const article = screen.getByRole("article", {
            name: /ver detalhes do produto produto teste/i,
        });
        expect(article).toBeInTheDocument();
    });

    it("should render product image with correct alt and src", () => {
        const image = screen.getByAltText(/imagem do produto produto teste/i);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", expect.stringContaining("fake-image.png"));
    });

    it("should render product details correctly", () => {
        expect(screen.getByText(mockProduct.category as string)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: mockProduct.name })).toBeInTheDocument();
        expect(screen.getByText(mockProduct.description.slice(0, 58) + "...")).toBeInTheDocument();
        expect(
            screen.getByText(`R$ ${mockProduct.price.toFixed(2).replace(".", ",")}`)
        ).toBeInTheDocument();

        const stock = screen.getByText(/10 em estoque/i);
        expect(stock).toBeInTheDocument();
        expect(stock).toHaveAttribute("aria-label", "10 unidades em estoque");
    });

    it("should render the rating with number and svg star icon", () => {
        expect(screen.getByText(mockProduct.rating.toString())).toBeInTheDocument();
        const svgIcon = screen.getByTestId("star-icon");
        expect(svgIcon).toBeInTheDocument();
    });

    it("should render add to cart button and handle click with feedback", () => {
        const button = screen.getByRole("button", {
            name: /adicionar produto teste ao carrinho/i,
        });

        fireEvent.click(button);

        expect(mockCartStore.addProductToCart).toHaveBeenCalledWith({
            id: mockProduct.id,
            name: mockProduct.name,
            description: mockProduct.description,
            price: mockProduct.price,
            image: mockProduct.image,
            stock: mockProduct.stock,
            items: 1,
        });

        expect(screen.getByTestId("cart-feedback")).toBeInTheDocument();
    });

    it("should not break accessibility by nesting interactive elements", () => {
        const button = screen.getByRole("button", {
            name: /adicionar produto teste ao carrinho/i,
        });
        const article = screen.getByRole("article", {
            name: /ver detalhes do produto produto teste/i,
        });

        expect(article).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        const { container } = render(<ProductCard {...mockProduct} />);
        expect(container).toMatchSnapshot();
    });
});
