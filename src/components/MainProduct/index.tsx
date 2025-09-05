import React from 'react';

import * as S from './styles';
import { Product } from '@/types/Products';
import ProductImage from '../ProductImage';
import ProductInfo from '../ProductInfo';

import Image from 'next/image';
import { useCategoriesStore } from '../../providers/categoriesStoreProvider';
import { useRouter } from 'next/navigation';

interface MainProductProps {
    product: Product
}

const MainProduct: React.FC<MainProductProps> = ({ product }) => {
    const { categories } = useCategoriesStore((state) => state);
    const router = useRouter();

    const category = categories.find(category => {
        return category.id === product.category;
    })

    const handleBack = () => router.back();

    return (
        <S.Container>
            <S.Back data-testid="back-button" onClick={handleBack} aria-label="Voltar para a página anterior">
                <Image src="/back.png" alt="Ícone voltar" width={24} height={24} />
                Voltar
            </S.Back>
            <S.Body aria-labelledby="product-title" data-testid="body-product">
                <ProductImage image={product.image} name={product.name} />
                <ProductInfo
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    category={category?.name}
                />
            </S.Body>
        </S.Container>
    );
}

export default MainProduct;