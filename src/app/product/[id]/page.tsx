"use client"
import React, { useEffect } from 'react';
import MainProduct from '../../../components/MainProduct';
import { useCategoriesStore } from '../../../providers/categoriesStoreProvider';

const product =
{
    id: 1,
    name: "iPhone 15 Pro",
    description: "O mais avançado iPhone com chip A17 Pro, câmera de 48MP e design em titânio. Perfeito para quem busca performance e qualidade fotográfica excepcional.",
    price: 8999.99,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    category: "eletronicos",
    stock: 25,
    rating: 4.8,
    brand: "Apple"
}

const categoriesMock = [
    {
        id: "eletronicos",
        name: "Eletrônicos",
        description: "Smartphones, laptops, consoles e mais",
        icon: "📱",
        productCount: 4
    },
    {
        id: "roupas",
        name: "Roupas e Calçados",
        description: "Moda masculina, feminina e acessórios",
        icon: "👕",
        productCount: 4
    },
    {
        id: "casa",
        name: "Casa e Decoração",
        description: "Móveis, decoração e utilidades domésticas",
        icon: "🏠",
        productCount: 3
    },
    {
        id: "livros",
        name: "Livros",
        description: "Literatura, técnicos, educacionais e mais",
        icon: "📚",
        productCount: 3
    },
    {
        id: "esportes",
        name: "Esportes e Lazer",
        description: "Equipamentos esportivos e atividades ao ar livre",
        icon: "⚽",
        productCount: 3
    }
]

type PageProps = {
    params: Promise<{ id: string }>;
};

export default function Page({ params }: PageProps) {
    const { setCategories } = useCategoriesStore((state) => state);
    // const { id: pageId } = React.use(params);

    useEffect(() => {
        setCategories(categoriesMock);
    }, [setCategories]);

    return <MainProduct product={product} />
}
