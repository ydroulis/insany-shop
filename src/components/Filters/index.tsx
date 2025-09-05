"use client"
import React, { useState } from 'react';

import * as S from './styles';
import Selector from '../Selector';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCategoriesStore } from '../../providers/categoriesStoreProvider';
import { useProductsStore } from '../../providers/productsStoreProvider';

interface FiltersProps {
    pageId?: string
}

const optionsCategory = [
    { value: 'eletronics', label: 'Eletrônicos' },
    { value: 'clothing', label: 'Roupas e Calçados' },
    { value: 'decoration', label: 'Casa e Decoração' },
    { value: 'books', label: 'Livros' },
    { value: 'sport', label: 'Esporte e Lazer' },
]

const optionsSort = [
    { value: 'newers', label: 'Novidades' },
    { value: 'higher', label: 'Preço: Maior - menor' },
    { value: 'lower', label: 'Preço: Menor - maior' },
]

const Filters: React.FC<FiltersProps> = ({ pageId }) => {
    const [valueCategory, setValueCategory] = useState('Selecione a categoria');
    const [valueSort, setValueSort] = useState('Organizar por');

    const { categories } = useCategoriesStore((state) => state);
    const { products } = useProductsStore((state) => state);

    const pathname = usePathname()
    const isActive = pathname === `/category/${pageId}`
    const linkClassname = isActive ? 'active' : 'not-active'

    const category = categories.find(category => category.id === pageId)

    return (
        <>
            {products.length > 0 && (
                <S.Container data-testid="filters-section">
                    {pageId ? (
                        <nav aria-label="breadcrumb">
                            <ul>
                                <li>
                                    <Link aria-label='Ir para a página inicial' href="/" >Produtos</Link>
                                </li>
                                <span aria-hidden="true"> / </span>
                                <li>
                                    <Link
                                        aria-label={`Ir para a categoria ${category?.name}`}
                                        className={linkClassname}
                                        href={`/category/${pageId}`}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        {category?.name}
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    ) : (

                        <Selector
                            type="category"
                            options={optionsCategory}
                            setValue={setValueCategory}
                            value={valueCategory}
                            label="Selecione a categoria" id="category"
                        />
                    )}
                    <Selector
                        type="sort"
                        options={optionsSort}
                        setValue={setValueSort}
                        value={valueSort}
                        label="Selecione a organização dos produtos" id="sort"
                    />
                </S.Container>
            )}
        </>
    );
}

export default Filters;