import React from 'react';
import Button from '../Button';
import { GoStarFill } from "react-icons/go";

import * as S from './styles';
import { Product } from '@/types/Products';


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
    return (
        <S.CardArticle>
            <S.CardLink
                href="#"
                aria-label={`Ver detalhes do produto ${name}`}
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
                            <GoStarFill size={12} color='#FFE100' aria-hidden="true" focusable="false" />
                        </span>
                        <span>{rating}</span>
                    </S.Rate>
                    <S.Category>{category}</S.Category>
                    <S.Title>{name}</S.Title>
                    <S.Description>{description}</S.Description>
                    <S.Price>R$ {price.toFixed(2).replace('.', ',')}</S.Price>
                    <S.Stock className='stock' aria-label={`${stock} unidades em estoque`}>{stock} em estoque</S.Stock>
                    <Button
                        action={() => { }}
                        ariaLabel={`Adicionar ${name} ao carrinho`}
                        type="default"
                    >
                        Adicionar ao carrinho
                    </Button>
                </S.Details>
            </S.CardLink>
        </S.CardArticle>
    );
}

export default ProductCard;