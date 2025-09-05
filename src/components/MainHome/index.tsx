import React from 'react';

import * as S from './styles';
import ProductList from '../ProductList';
import { Products } from '@/types/Products';
import Filters from '../Filters';
import CategoriesList from '../CategoryList';
import { useProductsStore } from '../../providers/productsStoreProvider';
import { useCategoriesStore } from '../../providers/categoriesStoreProvider';

const MainHome: React.FC = () => {
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
            aria-label="Catálogo de produtos"
        >
            <Filters />
            <ProductList products={productList} />
            <CategoriesList categories={categories} />
        </S.Container>
    );
}

export default MainHome;