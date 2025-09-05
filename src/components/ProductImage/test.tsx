import React from "react";
import { render, screen } from "@testing-library/react";
import ProductImage from "./";

describe("<ProductImage />", () => {
    const defaultProps = {
        image: "/fake-product.jpg",
        name: "Tênis Esportivo",
    };

    it("should render image with required attributes", () => {
        render(<ProductImage image="/fake-product.jpg" name="Tênis Esportivo" />);

        const img = screen.getByAltText('Imagem do produto');

        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src");
        expect(img).toHaveAttribute("alt");
    });

    it("should include aria-label with the product name", () => {
        render(<ProductImage {...defaultProps} />);
        const img = screen.getByRole("img");

        expect(img).toHaveAttribute(
            "aria-label",
            `Imagem ilustrativa do produto ${defaultProps.name}`
        );
    });

    it("should apply width and height", () => {
        render(<ProductImage {...defaultProps} />);
        const img = screen.getByRole("img");

        expect(img).toHaveAttribute("width", "640");
        expect(img).toHaveAttribute("height", "580");
    });

    it("should match snapshot", () => {
        const { container } = render(<ProductImage {...defaultProps} />);
        expect(container).toMatchSnapshot();
    });
});
