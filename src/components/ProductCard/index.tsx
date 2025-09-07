"use client"
import React, { useState } from 'react';
import Button from '../Button';
import { GoStarFill } from "react-icons/go";

import * as S from './styles';
import { Product } from '@/types/Products';
import { useCartStore } from '../../providers/cartStoreProvider';
import CartFeedback from '../CartFeedback';


const ProductCard: React.FC<Product> = ({
    id,
    name,
    description,
    price,
    image,
    category,
    stock,
    rating
}) => {
    const { addProductToCart, showFeedback, feedback } = useCartStore((state) => state);
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price);


    const handleAddProductToCart = () => {
        addProductToCart({ id, name, description, price, image, stock, items: 1 });

        showFeedback(true);
        setTimeout(() => {
            showFeedback(false);
        }, 3000);
    }

    return (
        <>
            <S.CardArticle
                aria-label={`Ver detalhes do produto ${name}`}
            >
                <S.CardLink
                    href={`/product/${id}`}
                >
                    <S.CardImage
                        src={image}
                        width={200}
                        height={200}
                        placeholder='blur'
                        blurDataURL="..."
                        loading="lazy"
                        alt={`Imagem do produto ${name}`}
                    />
                    <S.Details>
                        <S.Rate>
                            <span>
                                <GoStarFill size={12} color='#FFE100' aria-hidden="true" focusable="false" data-testid="star-icon" />
                            </span>
                            <span>{rating}</span>
                        </S.Rate>
                        <S.Category>{category}</S.Category>
                        <S.Title>{name}</S.Title>
                        <S.Description>{description.slice(0, 58) + "..."}</S.Description>
                        <S.Price>{formattedPrice}</S.Price>
                        <S.Stock className='stock' aria-label={`${stock} unidades em estoque`}>{stock} em estoque</S.Stock>
                    </S.Details>
                </S.CardLink>
                <S.Action>
                    <Button
                        action={() => handleAddProductToCart()}
                        ariaLabel={`Adicionar ${name} ao carrinho`}
                        type="default"
                    >
                        Adicionar ao carrinho
                    </Button>
                </S.Action>
            </S.CardArticle>
            {feedback && <CartFeedback color="#15803d" background="#bbf7d0" type="success">Produto adicionado ao carrinho!</CartFeedback>}
        </>
    );
}

export default ProductCard;