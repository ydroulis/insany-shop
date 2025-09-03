import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Selector from "./";
import { Options } from "../../types/SelectorOptions";

describe("<Selector />", () => {
    const mockOptions: Options[] = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
    ];

    it("should render with initial value", () => {
        const setValue = jest.fn();
        render(
            <Selector
                options={mockOptions}
                value="Option 1"
                setValue={setValue}
                label="Selecione uma opção"
                type="category"
                id="category"
            />
        );

        expect(screen.getByRole("button", { name: /Selecione uma opção/i })).toBeInTheDocument();
        expect(screen.getAllByText("Option 1")).toHaveLength(2);
    });

    it("should open and close", () => {
        const setValue = jest.fn();
        render(
            <Selector
                options={mockOptions}
                value=""
                setValue={setValue}
                label="Selecione uma opção"
                type="category"
                id="category"
            />
        );

        const button = screen.getByRole("button", { name: /Selecione uma opção/i });

        expect(screen.queryByRole("listbox")).toBeNull();

        fireEvent.click(button);
        expect(screen.getByRole("listbox")).toBeVisible();

        fireEvent.click(button);
        expect(screen.queryByRole("listbox")).toBeNull();
    });

    it("should call setValue", () => {
        const setValue = jest.fn();
        render(
            <Selector
                options={mockOptions}
                value=""
                setValue={setValue}
                label="Selecione uma opção"
                type="category"
                id="category"
            />
        );

        const button = screen.getByRole("button", { name: /Selecione uma opção/i });
        fireEvent.click(button);

        const option = screen.getByRole("option", { name: "Option 2" });
        fireEvent.click(option);

        expect(setValue).toHaveBeenCalledWith("Option 2");
    });

    it("should select value with Space key", () => {
        const setValue = jest.fn();
        render(
            <Selector
                options={mockOptions}
                value=""
                setValue={setValue}
                label="Selecione uma opção"
                type="sort"
                id="sort"
            />
        );

        const button = screen.getByRole("button", { name: /Selecione uma opção/i });
        fireEvent.click(button);

        const option = screen.getByRole("option", { name: "Option 2" });
        fireEvent.keyDown(option, { key: " ", code: "Space" });

        expect(setValue).toHaveBeenCalledWith("Option 2");
    });

    it("should mark the selected option with aria-selected", () => {
        const setValue = jest.fn();
        render(
            <Selector
                options={mockOptions}
                value="Option 1"
                setValue={setValue}
                label="Selecione uma opção"
                type="category"
                id="category"
            />
        );

        const button = screen.getByRole("button", { name: /Selecione uma opção/i });
        fireEvent.click(button);

        const option1 = screen.getByRole("option", { name: "Option 1" });
        const option2 = screen.getByRole("option", { name: "Option 2" });

        expect(option1).toHaveAttribute("aria-selected", "true");
        expect(option2).toHaveAttribute("aria-selected", "false");
    });

    it("sohuld select value with enter", () => {
        const setValue = jest.fn();
        render(
            <Selector
                options={mockOptions}
                value=""
                setValue={setValue}
                label="Selecione uma opção"
                type="sort"
                id="sort"
            />
        );

        const button = screen.getByRole("button", { name: /Selecione uma opção/i });
        fireEvent.click(button);

        const option = screen.getByRole("option", { name: "Option 1" });
        fireEvent.keyDown(option, { key: "Enter", code: "Enter" });

        expect(setValue).toHaveBeenCalledWith("Option 1");
    });
});
