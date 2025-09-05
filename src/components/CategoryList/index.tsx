import React from 'react';

import * as S from './styles';
import CategoryCard from '../CategoryCard';
import { Categories } from '@/types/Categories';

interface CategoriesListProps {
    categories: Categories
}

const CategoriesList: React.FC<CategoriesListProps> = ({ categories }) => {
    const sectionTitleId = 'categories-title';
    const hasCategories = categories && categories.length > 0;

    return (
        <S.Container
            aria-labelledby={sectionTitleId}
            role="region"
        >
            {hasCategories && (
                <>
                    <S.Title id={sectionTitleId}>Principais categorias</S.Title>
                    <S.List role="list">
                        {categories.map((category) => (
                            <li key={category.id} role="listitem">
                                <CategoryCard {...category} />
                            </li>
                        ))}
                    </S.List>
                </>
            )}

        </S.Container>
    );
}

export default CategoriesList;