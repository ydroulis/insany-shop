"use client"
import React from 'react';

import * as S from './styles';
import SearchComponent from '../SearchComponent';
import { FiShoppingBag } from "react-icons/fi"
import Link from 'next/link';
import { useCartStore } from '../../providers/cartStoreProvider';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
    const { cart, showFeedback } = useCartStore((state) => state);
    const router = useRouter();

    const handleRedirect = () => {
        showFeedback(false);
        router.push('/cart');
    };

    return (
        <S.Wrapper role="banner">
            <S.Container style={{ maxWidth: "1120px", width: "100%" }}>
                <S.Logo>
                    <Link href="/" aria-label='Ir para a página inicial'>InsanyShop</Link>
                </S.Logo>

                <S.Actions role="navigation" aria-label='Acões de navegação'>
                    <SearchComponent />

                    <S.Notifications
                        aria-label='Ir para o carrinho de compras'
                        aria-haspopup="true"
                        aria-expanded="false"
                        onClick={handleRedirect}
                    >
                        <FiShoppingBag size={24} color='#5D5D6D' aria-hidden="true" />
                        {cart.content.length > 0 && <S.NotificationIndicator aria-live='polite'>
                            {cart.content.length}
                            <S.SrOnly>Itens no carrinho</S.SrOnly>
                        </S.NotificationIndicator>}
                    </S.Notifications>
                </S.Actions>
            </S.Container>
        </S.Wrapper>
    );
}

export default Header;