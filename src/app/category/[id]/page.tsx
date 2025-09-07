"use client"
import MainCategory from '@/components/MainCategory';
import { useProductsStore } from '../../../providers/productsStoreProvider';
import React, { useEffect } from 'react';
import { useCategoriesStore } from '../../../providers/categoriesStoreProvider';

const products = [
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
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        description: "Smartphone premium com S Pen integrada, câmera de 200MP e tela Dynamic AMOLED 2X de 6.8 polegadas. Ideal para produtividade e criatividade.",
        price: 7499.99,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
        category: "eletronicos",
        stock: 18,
        rating: 4.7,
        brand: "Samsung"
    },
    {
        id: 3,
        name: "MacBook Air M3",
        description: "Notebook ultrafino com chip M3, tela Liquid Retina de 13.6 polegadas e até 18 horas de bateria. Perfeito para trabalho e estudos.",
        price: 12999.99,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
        category: "eletronicos",
        stock: 12,
        rating: 4.9,
        brand: "Apple"
    },
    {
        id: 4,
        name: "PlayStation 5",
        description: "Console de nova geração com SSD ultra-rápido, ray tracing e controle DualSense com feedback tátil. A revolução dos games chegou.",
        price: 4199.99,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
        category: "eletronicos",
        stock: 8,
        rating: 4.6,
        brand: "Sony"
    }
]

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
    const { setProducts } = useProductsStore((state) => state);
    const { setCategories, categories } = useCategoriesStore((state) => state);

    const { id: pageId } = React.use(params);

    useEffect(() => {
        setProducts(products);

        if (categories.length === 0) {
            setCategories(categoriesMock);
        }
    }, [categories.length, setCategories, setProducts]);

    return <MainCategory pageId={pageId} />;
}
