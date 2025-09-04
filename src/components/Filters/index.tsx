"use client"
import React, { useState } from 'react';

import * as S from './styles';
import Selector from '../Selector';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface FiltersProps {
    pageId: string
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

const categories = [
    {
        id: "eletronicos",
        name: "Eletrônicos",
        description: "Smartphones, laptops, consoles e mais",
        icon: "📱",
        productCount: 4
    },
    {
        id: "roupas",
        name: "Roupas e Calçados",
        description: "Moda masculina, feminina e acessórios",
        icon: "👕",
        productCount: 4
    },
    {
        id: "casa",
        name: "Casa e Decoração",
        description: "Móveis, decoração e utilidades domésticas",
        icon: "🏠",
        productCount: 3
    },
    {
        id: "livros",
        name: "Livros",
        description: "Literatura, técnicos, educacionais e mais",
        icon: "📚",
        productCount: 3
    },
    {
        id: "esportes",
        name: "Esportes e Lazer",
        description: "Equipamentos esportivos e atividades ao ar livre",
        icon: "⚽",
        productCount: 3
    }
]

const Filters: React.FC<FiltersProps> = ({ pageId }) => {
    const [valueCategory, setValueCategory] = useState('Selecione a categoria');
    const [valueSort, setValueSort] = useState('Organizar por');

    const pathname = usePathname()
    const isActive = pathname === `/category/${pageId}`
    const linkClassname = isActive ? 'active' : 'not-active'

    const category = categories.find(category => category.id === pageId)

    return (
        <S.Container data-testid="filters-section">
            {pageId ? (
                <nav aria-label="breadcrumb">
                    <ul>
                        <li>
                            <Link href="/">Produtos</Link>
                        </li>
                        <span aria-hidden="true"> / </span>
                        <li>
                            <Link
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
    );
}

export default Filters;