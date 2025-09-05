import React, { useRef } from "react";
import { render, screen } from "../../../.jest/test-utils";
import MainHome from ".";
import { Product } from "@/types/Products";
import { CategoriesStoreContext, CategoriesStoreApi } from "../../providers/categoriesStoreProvider";
import { ProductsStoreProvider } from "../../providers/productsStoreProvider";
import { createCategoriesStore } from "../../stores/categoriesStore";

jest.mock("../Filters", () => {
    const mockFilters = () => <div data-testid="filters-mock">Filtros</div>;
    return mockFilters;
});

jest.mock("../ProductList", () => {
    const ProductList = ({ products }: { products: Product[] }) => (
        <ul data-testid="product-list-mock">
            {products.map((product) => (
                <li key={product.id}>
                    <img
                        src={product.image}
                        alt={`Imagem do produto ${product.name}`}
                    />
                    <span>{product.name}</span>
                    <span>{product.category}</span>
                    <span>R$ {product.price.toFixed(2)}</span>
                    <span>{product.stock} em estoque</span>
                    <span aria-label={`Avaliação ${product.rating}`}>⭐ {product.rating}</span>
                    <span>{product.brand}</span>
                </li>
            ))}
        </ul>
    );

    return ProductList;
});

const TestCategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storeRef = useRef<CategoriesStoreApi | null>(null);

    if (!storeRef.current) {
        storeRef.current = createCategoriesStore();
        storeRef.current.setState({
            categories: [
                { id: 'livros', name: 'Livros', productCount: 1, description: '', icon: '' },
                { id: 'eletronics', name: 'Eletrônicos', productCount: 5, description: '', icon: '' },
            ],
        });
    }

    return (
        <CategoriesStoreContext.Provider value={storeRef.current}>
            {children}
        </CategoriesStoreContext.Provider>
    );
};

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <ProductsStoreProvider>
            <TestCategoriesProvider>{ui}</TestCategoriesProvider>
        </ProductsStoreProvider>
    );
};

describe("<MainHome />", () => {
    beforeEach(() => {
        renderWithProviders(<MainHome />);
    });

    it("should render the main landmark with correct accessibility attributes", () => {
        const main = screen.getByRole("main", { name: /catálogo de produtos/i });
        expect(main).toBeInTheDocument();
        expect(main.tagName.toLowerCase()).toBe("main");
    });

    it("should render the Filters section", () => {
        expect(screen.getByTestId("filters-mock")).toBeInTheDocument();
        expect(screen.getByText("Filtros")).toBeVisible();
    });

    it("should render the ProductList", () => {
        const list = screen.getByTestId("product-list-mock");
        expect(list).toBeInTheDocument();
    });


    it("should match snapshot", () => {
        const { container } = renderWithProviders(<MainHome />);
        expect(container).toMatchSnapshot();
    });
});
