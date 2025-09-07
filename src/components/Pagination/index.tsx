import React from 'react';

import * as S from './styles';
import { useProductsStore } from '../../providers/productsStoreProvider';
import { getProducts } from '../../services/products';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagination: React.FC = () => {
    const { pagination, setProducts, setPagination } = useProductsStore((state => state));

    const handleNextPage = async () => {
        const res = await getProducts(pagination.currentPage + 1, 6);
        setPagination(res.pagination);
        setProducts(res.products);
    };

    const handlePreviousPage = async () => {
        const res = await getProducts(pagination.currentPage - 1, 6);
        setPagination(res.pagination);
        setProducts(res.products);
    };

    const handlePageClick = async (page: number) => {
        const res = await getProducts(page, 6);
        setPagination(res.pagination);
        setProducts(res.products);
    };

    const pagesArray = new Array(pagination.totalPages).fill(0).map((_, index) => index + 1);
    return (
        <S.Container>
            <S.Buttons disabled={!pagination.hasPreviousPage} onClick={() => handlePreviousPage()}>
                <IoIosArrowBack size={16} color='#737380' />
            </S.Buttons>
            {pagesArray.map(page => {
                const className = page === pagination.currentPage ? 'current' : '';
                return <S.Buttons className={className} key={page} onClick={() => handlePageClick(page)}>{page}</S.Buttons>
            })}
            <S.Buttons disabled={!pagination.hasNextPage} onClick={() => handleNextPage()}>
                <IoIosArrowForward size={16} color='#737380' />
            </S.Buttons>
        </S.Container>
    );
}

export default Pagination;