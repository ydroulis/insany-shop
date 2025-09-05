import React from 'react';

import * as S from './styles';
import Button from '../Button';

interface ProductInfoProps {
    category: string | undefined
    name: string
    price: number
    description: string
}

const ProductInfo: React.FC<ProductInfoProps> = ({
    category,
    name,
    price,
    description
}) => {
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price);

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
            <Button action={() => { }}>Adicionar</Button>
        </S.Container>
    );
}

export default ProductInfo;