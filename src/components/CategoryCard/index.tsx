import { Category } from '@/types/Categories';
import React from 'react';

import * as S from './styles';

const CategoryCard: React.FC<Category> = ({ id, productCount, name }) => {
    const productLabel = `${productCount} ${productCount > 1 ? 'produtos' : 'produto'}`;

    return (
        <S.CardLink
            href={`/category/${id}`}
            aria-label={`Ver categoria ${name} com ${productLabel}`}
        >
            <S.CardArticle data-testid="category-card">
                <S.Title>{name}</S.Title>
                <S.ProductCount aria-hidden="true">{productLabel}</S.ProductCount>
            </S.CardArticle>
        </S.CardLink>
    );
}

export default CategoryCard;