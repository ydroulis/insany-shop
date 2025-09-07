import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Pagination from "./index";
import { useProductsStore } from "../../providers/productsStoreProvider";
import { getProducts } from "../../services/products";
import { ProductsResponse } from "@/types/Products";

jest.mock("../../providers/productsStoreProvider");
jest.mock("../../services/products");

const mockedUseProductsStore = useProductsStore as jest.MockedFunction<typeof useProductsStore>;
const mockedGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;

describe("Pagination", () => {
    const setProducts = jest.fn();
    const setPagination = jest.fn();

    const makePagination = (overrides?: Partial<ProductsResponse["pagination"]>): ProductsResponse["pagination"] => ({
        currentPage: 1,
        totalPages: 3,
        hasPreviousPage: false,
        hasNextPage: true,
        totalProducts: 3,
        ...overrides
    });

    const mockStore = (pagination: ProductsResponse["pagination"]) => {
        mockedUseProductsStore.mockReturnValue({
            pagination,
            setProducts,
            setPagination,
        });
    };

    const makeResponse = (pagination: ProductsResponse["pagination"]): ProductsResponse => ({
        products: [
            {
                id: 1, name: "Produto 1",
                description: "",
                price: 0,
                image: "",
                category: undefined,
                stock: 0,
                rating: 0
            },
            {
                id: 2, name: "Produto 2",
                description: "",
                price: 0,
                image: "",
                category: undefined,
                stock: 0,
                rating: 0
            },
            {
                id: 3, name: "Produto 3",
                description: "",
                price: 0,
                image: "",
                category: undefined,
                stock: 0,
                rating: 0
            },
        ],
        pagination,
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render properly page buttons", () => {
        mockStore(makePagination());
        render(<Pagination />);

        expect(screen.getAllByRole("button", { name: "" })).toHaveLength(2)
        expect(screen.getByText("1")).toHaveClass("current");
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("should call handleNextPage properly", async () => {
        const pagination = makePagination({ currentPage: 1, hasNextPage: true });
        mockStore(pagination);

        mockedGetProducts.mockResolvedValueOnce(makeResponse(makePagination({ currentPage: 2 })));

        render(<Pagination />);
        const nextButton = screen.getAllByRole("button").pop()!;
        fireEvent.click(nextButton);

        await waitFor(() => {
            expect(mockedGetProducts).toHaveBeenCalledWith(2, 6);
            expect(setPagination).toHaveBeenCalled();
            expect(setProducts).toHaveBeenCalled();
        });
    });

    it("should call handlePreviousPage properly", async () => {
        const pagination = makePagination({ currentPage: 2, hasPreviousPage: true });
        mockStore(pagination);

        mockedGetProducts.mockResolvedValueOnce(makeResponse(makePagination({ currentPage: 1 })));

        render(<Pagination />);
        const prevButton = screen.getAllByRole("button")[0];
        fireEvent.click(prevButton);

        await waitFor(() => {
            expect(mockedGetProducts).toHaveBeenCalledWith(1, 6);
            expect(setPagination).toHaveBeenCalled();
            expect(setProducts).toHaveBeenCalled();
        });
    });

    it("should call handlePageClick properly when click on number", async () => {
        const pagination = makePagination({ currentPage: 1 });
        mockStore(pagination);

        mockedGetProducts.mockResolvedValueOnce(makeResponse(makePagination({ currentPage: 3 })));

        render(<Pagination />);
        fireEvent.click(screen.getByText("3"));

        await waitFor(() => {
            expect(mockedGetProducts).toHaveBeenCalledWith(3, 6);
            expect(setPagination).toHaveBeenCalled();
            expect(setProducts).toHaveBeenCalled();
        });
    });

    it("should disable next when there is no next page", () => {
        const pagination = makePagination({ hasNextPage: false });
        mockStore(pagination);

        render(<Pagination />);
        const nextButton = screen.getAllByRole("button").pop()!;
        expect(nextButton).toBeDisabled();
    });

    it("should disable previous when there is no previous page", () => {
        const pagination = makePagination({ hasPreviousPage: false });
        mockStore(pagination);

        render(<Pagination />);
        const prevButton = screen.getAllByRole("button")[0];
        expect(prevButton).toBeDisabled();
    });

    it('shoult match snapshot', () => {
        const pagination = makePagination({ hasNextPage: true });
        mockStore(pagination);
        const { container } = render(<Pagination />);
        expect(container).toMatchSnapshot();
    });
});
