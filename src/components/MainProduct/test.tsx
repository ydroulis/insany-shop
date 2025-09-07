import React from "react";
import { render, screen } from "@testing-library/react";
import MainProduct from "./";

const mockShowFeedback = jest.fn();
const mockPush = jest.fn();
const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
        back: mockBack,
    }),
}));

jest.mock("../../providers/cartStoreProvider", () => ({
    useCartStore: jest.fn(() => ({
        showFeedback: mockShowFeedback,
        feedback: false,
        cart: { content: [] },
    })),
}));

jest.mock("../../providers/categoriesStoreProvider", () => ({
    useCategoriesStore: jest.fn(() => ({
        categories: [
            { id: "1", name: "Casa e Decoração" },
            { id: "2", name: "Eletrônicos" },
        ],
    })),
}));

jest.mock("../ProductInfo", () => ({
    __esModule: true,
    default: ({ name, description }: { name: string; description: string }) => (
        <div data-testid="product-info">
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    ),
}));

jest.mock("../ProductImage", () => ({
    __esModule: true,
    default: ({ image, name }: { image: string; name: string }) => (
        <img data-testid="product-image" src={image} alt={name} />
    ),
}));

describe("<MainProduct />", () => {
    const product = {
        id: 1,
        name: "Sofá 3 Lugares Retrátil",
        description: "Sofá confortável com assento retrátil",
        price: 1899.99,
        image: "/fake-product.jpg",
        category: "1",
        stock: 10,
        rating: 4.5,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render main elements", () => {
        render(<MainProduct product={product} />);

        expect(screen.getByTestId("body-product")).toBeInTheDocument();
        expect(screen.getByTestId("product-image")).toHaveAttribute("src", "/fake-product.jpg");
        expect(screen.getByTestId("product-info")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        const { container } = render(<MainProduct product={product} />);
        expect(container).toMatchSnapshot();
    });
});
