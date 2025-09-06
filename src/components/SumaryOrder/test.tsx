import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SumaryOrder from "./";

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

describe("<SumaryOrder />", () => {
    const subtotal = 100;

    it("should render the title and be accessible via aria-labelledby", () => {
        render(<SumaryOrder subtotal={subtotal} />);
        const region = screen.getByRole("region", { name: /resumo do pedido/i });
        expect(region).toBeInTheDocument();

        const title = screen.getByRole("heading", { name: /resumo do pedido/i });
        expect(title).toBeInTheDocument();
    });

    it("should render subtotal, delivery and total with correct currency formatting", () => {
        render(<SumaryOrder subtotal={subtotal} />);

        expect(screen.getByText("Subtotal")).toBeInTheDocument();
        expect(screen.getByText("R$ 100,00")).toBeInTheDocument();

        expect(screen.getByText("Entrega")).toBeInTheDocument();
        expect(screen.getByText("R$ 40,00")).toBeInTheDocument();

        expect(screen.getByText("Total")).toBeInTheDocument();
        expect(screen.getByText("R$ 140,00")).toBeInTheDocument();
    });

    it("should render the checkout button with correct aria-label", () => {
        render(<SumaryOrder subtotal={subtotal} />);

        const button = screen.getByRole("button", {
            name: /finalizar a compra e ir para o checkout/i,
        });

        expect(button).toBeInTheDocument();
        fireEvent.click(button);
    });

    it("should render support links inside a navigation landmark", () => {
        render(<SumaryOrder subtotal={subtotal} />);
        const nav = screen.getByRole("navigation", { name: /links de suporte/i });
        expect(nav).toBeInTheDocument();

        const links = screen.getAllByRole("link");
        const expectedLinks = ["Ajuda", "Reembolso", "Entregas e Frete", "Trocas e Devolução"];

        expectedLinks.forEach((text) => {
            expect(
                screen.getByRole("link", { name: new RegExp(text, "i") })
            ).toBeInTheDocument();
        });

        expect(links).toHaveLength(expectedLinks.length);
    });

    it("should match snapshot", () => {
        const { container } = render(<SumaryOrder subtotal={subtotal} />);
        expect(container).toMatchSnapshot();
    });
});
