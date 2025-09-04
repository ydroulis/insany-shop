import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./";

describe("<Button />", () => {
    it("should render with children text", () => {
        render(<Button action={jest.fn()}>Comprar</Button>);

        const button = screen.getByRole("button", { name: /comprar/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Comprar");
    });

    it("should call action on click", () => {
        const action = jest.fn();
        render(<Button action={action}>Adicionar</Button>);

        const button = screen.getByRole("button", { name: /adicionar/i });
        fireEvent.click(button);

        expect(action).toHaveBeenCalledTimes(1);
    });

    it("should use aria-label when provided", () => {
        render(<Button action={jest.fn()} ariaLabel="Adicionar ao carrinho">+</Button>);

        const button = screen.getByRole("button", { name: /adicionar ao carrinho/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("aria-label", "Adicionar ao carrinho");
    });

    it("should render shopping cart icon when type is default", () => {
        render(<Button action={jest.fn()}>Cart</Button>);

        const icon = screen.getByTestId("icon-svg"); // vamos configurar isso abaixo
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("should not render shopping cart icon when type is checkout", () => {
        render(<Button type="checkout" action={jest.fn()}>Finalizar</Button>);

        const button = screen.getByRole("button", { name: /finalizar/i });
        expect(button).toBeInTheDocument();

        expect(button.querySelector("svg")).toBeNull();
    });
    it("should match snapshot", () => {
        const { container } = render(<Button action={jest.fn()}>Comprar</Button>);
        expect(container).toMatchSnapshot();
    });
});
