import React from 'react';

import * as S from './styles';
import { Products } from '@/types/Products';
import Filters from '../Filters';
import ProductList from '../ProductList';
import { useProductsStore } from '../../providers/productsStoreProvider';
import { useCategoriesStore } from '../../providers/categoriesStoreProvider';

interface MainCategoryProps {
    pageId: string;
}

const MainCategory: React.FC<MainCategoryProps> = ({ pageId }) => {
    const { products } = useProductsStore((state => state));
    const { categories } = useCategoriesStore((state => state));

    const productList: Products = products.map(product => ({
        ...product,
        category: categories.find(category => category.id === product.category)?.name
    }))
    return (
        <S.Container
            as="main"
            role="main"
            aria-label={`Catálogo de produtos ${pageId}`}
        >
            <Filters pageId={pageId} />
            <ProductList products={productList} pageId={pageId} />
        </S.Container>
    );
}

export default MainCategory;