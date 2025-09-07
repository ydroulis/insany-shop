import React from "react";
import { render, screen } from "@testing-library/react";
import MainProduct from "./";
import { Product } from "../../types/Products";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        back: jest.fn(),
    }),
}));

jest.mock("../../providers/categoriesStoreProvider", () => ({
    useCategoriesStore: jest.fn(() => ({
        categories: [
            { id: "1", name: "Casa e Decoração" },
            { id: "2", name: "Eletrônicos" },
        ],
    })),
}));

jest.mock("next/image", () => {
    return function NextImageMock({
        src,
        alt,
        width,
        height,
    }: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
    }) {
        return <img src={src} alt={alt} width={width} height={height} />;
    };
});

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
        <img data-testid="product-image" src={image} alt={`Imagem ilustrativa do produto ${name}`} />
    ),
}));

describe("<MainProduct />", () => {
    const product: Product = {
        id: 1,
        name: "Sofá 3 Lugares Retrátil",
        description:
            "Sofá confortável com assento retrátil e reclinável, revestimento em tecido suede e estrutura de madeira maciça.",
        price: 1899.99,
        image: "/fake-product.jpg",
        category: "1",
        stock: 10,
        rating: 4.5,
    };

    it("should render all main elements", () => {
        render(<MainProduct product={product} />);

        expect(screen.getByTestId("body-product")).toBeInTheDocument();

        const backButton = screen.getByTestId("back-button");
        expect(backButton).toBeInTheDocument();

        const image = screen.getByTestId("product-image");
        expect(image).toHaveAttribute("src", "/fake-product.jpg");

        const productInfo = screen.getByTestId("product-info");
        expect(productInfo).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        const { container } = render(<MainProduct product={product} />);
        expect(container).toMatchSnapshot();
    });
});
