import React from 'react';

import * as S from './styles';
import { Product } from '@/types/Products';
import ProductImage from '../ProductImage';
import ProductInfo from '../ProductInfo';

import Image from 'next/image';
import { useCategoriesStore } from '../../providers/categoriesStoreProvider';
import { useRouter } from 'next/navigation';
import CartFeedback from '../CartFeedback';
import { useCartStore } from '../../providers/cartStoreProvider';

interface MainProductProps {
    product: Product
}

const MainProduct: React.FC<MainProductProps> = ({ product }) => {
    const { categories } = useCategoriesStore((state) => state);
    const { feedback, showFeedback } = useCartStore((state) => state);
    const router = useRouter();

    const category = categories.find(category => {
        return category.id === product.category;
    })

    const handleBack = () => {
        showFeedback(false);
        router.back();
    }

    return (
        <S.Container>
            <S.Back data-testid="back-button" onClick={handleBack} aria-label="Voltar para a página anterior">
                <Image src="/back.png" alt="Ícone voltar" width={24} height={24} />
                Voltar
            </S.Back>
            <S.Body aria-labelledby="product-title" data-testid="body-product">
                {product.image && <ProductImage image={product.image} name={product.name} />}
                {product.price !== 0 && <ProductInfo
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    category={category?.name}
                    image={product.image}
                />}
            </S.Body>
            {feedback && <CartFeedback color="#15803d" background="#bbf7d0" type="success">Produto adicionado ao carrinho!</CartFeedback>}

        </S.Container>
    );
}

export default MainProduct;