import React from 'react';

import * as S from './styles';
import Button from '../Button';
import { Product } from '@/types/Products';
import { useCartStore } from '../..//providers/cartStoreProvider';

interface ProductInfoProps {
    category: string | undefined
    name: string
    price: number
    description: string
    image: string
}

const ProductInfo: React.FC<ProductInfoProps> = ({
    category,
    name,
    price,
    image,
    description
}) => {
    const { addProductToCart, showFeedback } = useCartStore((state) => state);

    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price);

    const handleAddProductToCart = async (product: Product) => {
        await addProductToCart(product, 1);

        showFeedback(true);
        setTimeout(() => {
            showFeedback(false);
        }, 200);
    };

    return (
        <S.Container
            aria-labelledby="product-title"
            aria-describedby="product-description"
        >
            <S.Details>
                <S.Category>{category}</S.Category>
                <S.Title id="product-title">{name}</S.Title>
                <S.Price aria-label="Preço do produto">{formattedPrice}</S.Price>
                <S.Description id="product-description">
                    <p>Descrição</p>
                    <span>{description}</span>
                </S.Description>
            </S.Details>
            <Button action={() => handleAddProductToCart({ id: 1, name, description, price, image: image, category, stock: 10, rating: 0 })}>Adicionar</Button>
        </S.Container>
    );
}

export default ProductInfo;
