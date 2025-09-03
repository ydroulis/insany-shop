import React from 'react';

import * as S from './styles';
import SearchComponent from '../SearchComponent';
import { FiShoppingBag } from "react-icons/fi"
import Link from 'next/link';

const Header: React.FC = () => {
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
                    >
                        <FiShoppingBag size={24} color='#5D5D6D' aria-hidden="true" />
                        <S.NotificationIndicator aria-live='polite'>
                            2
                            <S.SrOnly>Itens no carrinho</S.SrOnly>
                        </S.NotificationIndicator>
                    </S.Notifications>
                </S.Actions>
            </S.Container>
        </S.Wrapper>
    );
}

export default Header;