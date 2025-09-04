import React from "react";
import { render, screen } from "@testing-library/react";
import MainCategory from "./";


describe("<MainCategory />", () => {
    beforeEach(() => {
        render(<MainCategory pageId="1" />);
    });

    it("should render the main landmark with correct accessibility attributes", () => {
        const main = screen.getByRole("main", { name: /catálogo de produtos/i });
        expect(main).toBeInTheDocument();
        expect(main.tagName.toLowerCase()).toBe("main");
    });
    it("should match snapshot", () => {
        const { container } = render(<MainCategory pageId="1" />);
        expect(container).toMatchSnapshot();
    });
});
