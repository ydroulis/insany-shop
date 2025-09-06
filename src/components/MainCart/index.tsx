import React from 'react';

import * as S from './styles';
import CartList from '../CartList';
import SumaryOrder from '../SumaryOrder';
import { useCartStore } from '../../providers/cartStoreProvider';

const MainCart: React.FC = () => {
    const { cart } = useCartStore((state) => state);

    return (
        <>
            {cart.content.length > 0 ? (
                <S.Container
                    role="main"
                >
                    <CartList products={cart.content} aria-label="Lista de produtos no carrinho" />
                    <SumaryOrder subtotal={cart.total} aria-label="Resumo do pedido" />
                </S.Container>
            ) : (
                <S.ContainerEmpty
                    role="status"
                    aria-live="polite"
                    aria-labelledby="empty-cart-title"
                >
                    <S.Title id="empty-cart-title">Seu carrinho esta vazio</S.Title>
                </S.ContainerEmpty>
            )}
        </>
    );
}

export default MainCart;