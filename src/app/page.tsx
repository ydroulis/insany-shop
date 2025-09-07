'use client'
import MainHome from "@/components/MainHome";
import { useCategoriesStore } from "../providers/categoriesStoreProvider";
import { useProductsStore } from "../providers/productsStoreProvider";
import { useEffect } from "react";
import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";
import { useCartStore } from "@/providers/cartStoreProvider";

export default function Home() {
  const { setProducts, setPagination } = useProductsStore(state => state);
  const { setCategories } = useCategoriesStore(state => state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts(1, 6);
        const categoriesData = await getCategories();

        setProducts(productsData.products);
        setPagination(productsData.pagination);
        setCategories(categoriesData.categories);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, [setProducts, setCategories, setPagination]);



  return <MainHome />
}
