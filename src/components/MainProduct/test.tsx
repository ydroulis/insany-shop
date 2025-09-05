import React from "react";
import { render, screen } from "@testing-library/react";
import MainProduct from "./";
import { Product } from "@/types/Products";

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

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: { src: string; alt: string }) => <img {...props} />,
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

        const body = screen.getByTestId("body-product");
        expect(body).toBeInTheDocument();
        expect(body).toHaveAttribute("aria-labelledby", "product-title");

        const backButton = screen.getByRole("button", { name: /voltar para a página anterior/i });
        expect(backButton).toBeInTheDocument();

        const title = screen.getByRole("heading", { name: /Sofá 3 Lugares Retrátil/i });
        expect(title).toBeInTheDocument();

        const image = screen.getByRole("img", { name: /imagem ilustrativa do produto sofá 3 lugares retrátil/i });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "/fake-product.jpg");

        expect(screen.getByText(/Sofá confortável com assento retrátil/i)).toBeInTheDocument();

        expect(screen.getByText(/Casa e Decoração/i)).toBeInTheDocument();

        const price = screen.getByLabelText(/Preço do produto/i);
        expect(price).toBeInTheDocument();
        expect(price.textContent?.replace(/\u00A0/g, " ")).toBe("R$ 1.899,99");

    });

    it("should match snapshot", () => {
        const { container } = render(<MainProduct product={product} />);
        expect(container).toMatchSnapshot();
    });
});
