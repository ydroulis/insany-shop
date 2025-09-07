import React from 'react';
import CartItem from '../CartItem';

import * as S from './styles';
import { CartProduct } from '@/types/Cart';

interface CartItemProps {
    products: CartProduct[];
}

const CartList: React.FC<CartItemProps> = ({ products }) => {

    const total = products.reduce((acc, product) => acc + product.price, 0);

    const formattedTotal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(total);

    return (
        <S.Container>
            <S.Title id="order-summary-title">Resumo do pedido</S.Title>
            <S.Amount
                aria-live="polite"
                aria-labelledby="order-summary-title"
            >
                {`Total (${products.length} ${products.length > 1 ? 'produtos' : 'produto'}) `}
                <span>{formattedTotal}</span>
            </S.Amount>

            <S.List aria-label="Lista de produtos do carrinho">
                {products.map((product, i) => (
                    <li key={i}>
                        <CartItem name={product.name} description={product.description} price={product.price} image={product.image} id={product.id} stock={product.stock} />
                    </li>
                ))}
            </S.List>
        </S.Container>
    );
}

export default CartList;