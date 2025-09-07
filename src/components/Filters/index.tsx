"use client"
import React, { useEffect, useState } from 'react';

import * as S from './styles';
import Selector from '../Selector';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCategoriesStore } from '../../providers/categoriesStoreProvider';
import { useProductsStore } from '../../providers/productsStoreProvider';
import { getProducts } from '../../services/products';

interface FiltersProps {
    pageId?: string
}

const optionsCategory = [
    { value: 'eletronicos', label: 'Eletrônicos' },
    { value: 'roupas', label: 'Roupas e Calçados' },
    { value: 'casa', label: 'Casa e Decoração' },
    { value: 'livros', label: 'Livros' },
    { value: 'esportes', label: 'Esporte e Lazer' },
]

const optionsSort = [
    { value: 'newers', label: 'Novidades' },
    { value: 'older', label: 'Mais Antigos' },
    { value: 'higher', label: 'Preço: Maior - menor' },
    { value: 'lower', label: 'Preço: Menor - maior' },
]

const Filters: React.FC<FiltersProps> = ({ pageId }) => {
    const [valueCategory, setValueCategory] = useState('Selecione a categoria');
    const [valueSort, setValueSort] = useState('Organizar por');

    const { categories } = useCategoriesStore((state) => state);
    const { products, setProducts, setPagination } = useProductsStore((state) => state);




    useEffect(() => {
        const categoryValueSelected = optionsCategory.find(option => option.label === valueCategory)?.value

        if (valueCategory !== 'Selecione a categoria') {
            const fetchCategoryProducts = async () => {
                const res = await getProducts(1, 100, categoryValueSelected);
                setPagination(res.pagination);
                setProducts(res.products);
            }
            fetchCategoryProducts()
        }

    }, [setPagination, setProducts, valueCategory])

    useEffect(() => {
        switch (valueSort) {
            case 'Novidades':
                setProducts(products.sort((a, b) => b.id - a.id));
                break;
            case 'Mais Antigos':
                setProducts(products.sort((a, b) => a.id - b.id));
                break;
            case 'Preço: Maior - menor':
                setProducts(products.sort((a, b) => b.price - a.price));
                break;
            case 'Preço: Menor - maior':
                setProducts(products.sort((a, b) => a.price - b.price));
                break;
            default:
                break;
        }
    }, [products, setProducts, valueSort])

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