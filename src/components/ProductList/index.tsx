import React from 'react';

import * as S from './styles';
import { Products } from '@/types/Products';
import ProductCard from '../ProductCard';

interface ProductListProps {
    products: Products
    pageId?: string
}

const categories = [
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

const ProductList: React.FC<ProductListProps> = ({ products, pageId }) => {
    const hasProducts = products && products.length > 0;
    const category = categories.find(category => category.id === pageId)

    const sectionTitleId = 'product-list-title';
    const descriptionId = pageId ? 'product-list-description' : undefined;

    return (
        <S.Container
            aria-labelledby={sectionTitleId}
            aria-describedby={descriptionId}
            role="region"
        >
            <S.Title id={sectionTitleId}>{pageId ? category?.name : "Todos os Produtos"}</S.Title>
            {pageId && (
                <S.Description id={descriptionId}>{category?.description}</S.Description>
            )}

            {hasProducts ? (
                <S.List role="list">
                    {products.map((product) => (
                        <li key={product.id} role="listitem">
                            <ProductCard {...product} />
                        </li>
                    ))}
                </S.List>
            ) : (
                <p role="status" aria-live="polite">
                    Nenhum produto disponível no momento.
                </p>
            )}
        </S.Container>
    );
}

export default ProductList;