'use client'
import MainHome from "@/components/MainHome";
import { useCategoriesStore } from "../providers/categoriesStoreProvider";
import { useProductsStore } from "../providers/productsStoreProvider";
import { useEffect } from "react";
import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";

export default function Home() {
  const { setProducts } = useProductsStore(state => state);
  const { setCategories } = useCategoriesStore(state => state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        const categoriesData = await getCategories();

        setProducts(productsData.products);

        setCategories(categoriesData.categories);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, [setProducts, setCategories]);



  return <MainHome />
}
