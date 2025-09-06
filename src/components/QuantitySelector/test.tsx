import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QuantitySelector from "./";
import { Options } from "@/types/SelectorOptions";

describe("<QuantitySelector />", () => {
    const mockOptions: Options[] = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
    ];

    it("should render with initial value", () => {
        const setValue = jest.fn();
        render(
            <QuantitySelector
                options={mockOptions}
                value="Option 1"
                setValue={setValue}
                label="Selecione a quantidade"
                id="quantity"
            />
        );

        expect(
            screen.getByRole("combobox", { name: /selecione a quantidade/i })
        ).toBeInTheDocument();

        expect(screen.getAllByText("Option 1")).toHaveLength(2);

        expect(screen.getByRole("combobox").querySelector("svg")).toBeInTheDocument();
    });

    it("should open and close the listbox", () => {
        const setValue = jest.fn();
        render(
            <QuantitySelector
                options={mockOptions}
                value=""
                setValue={setValue}
                label="Selecione a quantidade"
                id="quantity"
            />
        );

        const button = screen.getByRole("combobox");

        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.getByRole("listbox")).toBeVisible();

        fireEvent.click(button);
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("should select an option with click", () => {
        const setValue = jest.fn();
        render(
            <QuantitySelector
                options={mockOptions}
                value=""
                setValue={setValue}
                label="Selecione a quantidade"
                id="quantity"
            />
        );

        const button = screen.getByRole("combobox");
        fireEvent.click(button);

        const option = screen.getByRole("option", { name: "Option 2" });
        fireEvent.click(option);

        expect(setValue).toHaveBeenCalledWith("Option 2");
    });

    it("should select option with Enter key", () => {
        const setValue = jest.fn();
        render(
            <QuantitySelector
                options={mockOptions}
                value=""
                setValue={setValue}
                label="Selecione a quantidade"
                id="quantity"
            />
        );

        const button = screen.getByRole("combobox");
        fireEvent.click(button);

        const option = screen.getByRole("option", { name: "Option 3" });
        fireEvent.keyDown(option, { key: "Enter", code: "Enter" });

        expect(setValue).toHaveBeenCalledWith("Option 3");
    });

    it("should select option with Space key", () => {
        const setValue = jest.fn();
        render(
            <QuantitySelector
                options={mockOptions}
                value=""
                setValue={setValue}
                label="Selecione a quantidade"
                id="quantity"
            />
        );

        const button = screen.getByRole("combobox");
        fireEvent.click(button);

        const option = screen.getByRole("option", { name: "Option 1" });
        fireEvent.keyDown(option, { key: " ", code: "Space" });

        expect(setValue).toHaveBeenCalledWith("Option 1");
    });

    it("should apply aria-selected correctly", () => {
        const setValue = jest.fn();
        render(
            <QuantitySelector
                options={mockOptions}
                value="Option 1"
                setValue={setValue}
                label="Selecione a quantidade"
                id="quantity"
            />
        );

        const button = screen.getByRole("combobox");
        fireEvent.click(button);

        const option1 = screen.getByRole("option", { name: "Option 1" });
        const option2 = screen.getByRole("option", { name: "Option 2" });

        expect(option1).toHaveAttribute("aria-selected", "true");
        expect(option2).toHaveAttribute("aria-selected", "false");
    });

    it("should match snapshot", () => {
        const { container } = render(
            <QuantitySelector
                options={mockOptions}
                value="Option 1"
                setValue={jest.fn()}
                label="Selecione a quantidade"
                id="quantity"
            />
        );
        expect(container).toMatchSnapshot();
    });
});
