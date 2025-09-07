import React from 'react';

import * as S from './styles';
import { Products } from '../../types/Products';
import ProductCard from '../ProductCard';
import { useCategoriesStore } from '../../providers/categoriesStoreProvider';
import Pagination from '../Pagination';
import { useProductsStore } from '../../providers/productsStoreProvider';

interface ProductListProps {
    products: Products
    pageId?: string
}


const ProductList: React.FC<ProductListProps> = ({ products, pageId }) => {
    const { categories } = useCategoriesStore((state => state));
    const { pagination } = useProductsStore((state => state));

    const hasProducts = products && products.length > 0;
    const category = categories.find(category => category.id === pageId)

    const sectionTitleId = 'product-list-title';
    const descriptionId = pageId ? 'product-list-description' : undefined;

    return (
        <S.Container
            aria-labelledby={sectionTitleId}
            aria-describedby={descriptionId}
        >
            {hasProducts ? (
                <>
                    <S.Title id={sectionTitleId}>{pageId ? category?.name : "Todos os Produtos"}</S.Title>
                    {pageId && (
                        <S.Description id={descriptionId}>{category?.description}</S.Description>
                    )}

                    <S.List role="list">
                        {products.map((product) => (
                            <li key={product.id} role="listitem">
                                <ProductCard {...product} />
                            </li>
                        ))}
                    </S.List>
                    {pagination && pagination.totalPages > 1 && <Pagination />}
                </>
            ) : (
                <p role="status" aria-live="polite">
                    Nenhum produto disponível no momento.
                </p>
            )}
        </S.Container>
    );
}

export default ProductList;