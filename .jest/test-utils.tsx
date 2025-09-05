import React, { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ProductsStoreProvider } from '../src/providers/productsStoreProvider';
import { CategoriesStoreProvider } from '../src/providers/categoriesStoreProvider';

const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ProductsStoreProvider>
      <CategoriesStoreProvider>{children}</CategoriesStoreProvider>
    </ProductsStoreProvider>
  );
};

const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { renderWithProviders as render };
