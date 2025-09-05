import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductInfo from "./";
import Button from "../Button";

describe("<ProductInfo />", () => {
    it("should render product info with correct content", () => {
        render(<ProductInfo
            category="Casa e Decoração"
            name="Sofá 3 Lugares Retrátil"
            price={1899.99}
            description="Sofá confortável com assento retrátil e reclinável, revestimento em tecido suede e estrutura de madeira maciça."
        />);

        const title = screen.getByRole("heading", { name: /Sofá 3 Lugares Retrátil/i });
        expect(title).toBeInTheDocument();

        expect(screen.getByText(/Casa e Decoração/i)).toBeInTheDocument();

        const price = screen.getByLabelText("Preço do produto");
        expect(price).toBeInTheDocument();
        expect(price).toHaveAttribute("aria-label", "Preço do produto");

        const description = screen.getByText(/Sofá confortável com assento retrátil/i);
        expect(description).toBeInTheDocument();

        const container = screen.getByRole("region");
        expect(container).toHaveAttribute("aria-labelledby", "product-title");
        expect(container).toHaveAttribute("aria-describedby", "product-description");
    });

    it("should render button with correct text and be clickable", async () => {
        const user = userEvent.setup();
        render(<ProductInfo
            category="Casa e Decoração"
            name="Sofá 3 Lugares Retrátil"
            price={1899.99}
            description="Sofá confortável com assento retrátil e reclinável, revestimento em tecido suede e estrutura de madeira maciça."
        />);

        const button = screen.getByRole("button", { name: /Adicionar/i });
        expect(button).toBeInTheDocument();

        await user.click(button);
    });

    it("should match snapshot", () => {
        const { container } = render(<ProductInfo
            category="Casa e Decoração"
            name="Sofá 3 Lugares Retrátil"
            price={1899.99}
            description="Sofá confortável com assento retrátil e reclinável, revestimento em tecido suede e estrutura de madeira maciça."
        />);
        expect(container).toMatchSnapshot();
    });
});
