import React from 'react';

import * as S from './styles';
import CartList from '../CartList';
import SumaryOrder from '../SumaryOrder';
import { useCartStore } from '../../providers/cartStoreProvider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CartFeedback from '../CartFeedback';

const MainCart: React.FC = () => {
    const { cart, feedback, showFeedback } = useCartStore((state) => state);
    const router = useRouter();

    const handleBack = () => {
        showFeedback(false);
        router.back();
    }

    return (
        <S.Container
            role="main"
        >
            <S.Back data-testid="back-button" onClick={handleBack} aria-label="Voltar para a página anterior">
                <Image src="/back.png" alt="Ícone voltar" width={24} height={24} />
                Voltar
            </S.Back>
            {cart.content.length > 0 ? (
                <>
                    <CartList products={cart.content} aria-label="Lista de produtos no carrinho" />
                    <SumaryOrder subtotal={cart.total} aria-label="Resumo do pedido" />
                </>
            ) : (
                <div style={{ margin: '0 auto' }} role="status" aria-labelledby="empty-cart-title">
                    <S.Title id="empty-cart-title">Seu carrinho esta vazio</S.Title>
                </div>
            )}
            {feedback && <CartFeedback color='#DE3838' background='#fee2e2' type='error'>
                Produto removido do carrinho
            </CartFeedback>}
        </S.Container>
    );
}

export default MainCart;