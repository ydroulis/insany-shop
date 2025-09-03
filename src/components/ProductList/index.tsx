import React from 'react';

import * as S from './styles';
import { Products } from '@/types/Products';
import ProductCard from '../ProductCard';

interface ProductListProps {
    products: Products
}
const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const hasProducts = products && products.length > 0;

    return (
        <S.Container
            aria-labelledby="product-list-title"
            role="region"
        >
            <S.Title id="product-list-title">Todos os Produtos</S.Title>

            {hasProducts ? (
                <S.List>
                    {products.map((product) => (
                        <li key={product.id}>
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