import React from "react";
import { render, screen, within } from "@testing-library/react";
import CategoriesList from "./";
import { Categories } from "@/types/Categories";


describe("<CategoryList />", () => {
    const categories: Categories = [
        {
            id: "1", name: "Eletrônicos", productCount: 5,
            description: "",
            icon: ""
        },
        {
            id: "2", name: "Livros", productCount: 1,
            description: "",
            icon: ""
        },
    ];

    it("should render section title with proper id", () => {
        render(<CategoriesList categories={categories} />);
        const title = screen.getByRole("heading", { name: /principais categorias/i });
        expect(title).toBeInTheDocument();
        expect(title).toHaveAttribute("id", "categories-title");
    });

    it("should associate aria-labelledby to the container of the section", () => {
        render(<CategoriesList categories={categories} />);
        const region = screen.getByRole("region");
        expect(region).toHaveAttribute("aria-labelledby", "categories-title");
    });

    it("should render a list with category list", () => {
        render(<CategoriesList categories={categories} />);
        const list = screen.getByRole("list");
        expect(list).toBeInTheDocument();

        const items = within(list).getAllByRole("listitem");
        expect(items).toHaveLength(categories.length);
    });

    it("should render CategoryCards properly", () => {
        render(<CategoriesList categories={categories} />);
        const cards = screen.getAllByRole("link");
        expect(cards).toHaveLength(categories.length);

        expect(screen.getByText("Eletrônicos")).toBeInTheDocument();
        expect(screen.getByText("5 produtos")).toBeInTheDocument();
        expect(screen.getByText("Livros")).toBeInTheDocument();
        expect(screen.getByText("1 produto")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        const { container } = render(<CategoriesList categories={categories} />);
        expect(container).toMatchSnapshot();
    });
});
