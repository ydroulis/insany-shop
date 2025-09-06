import React from 'react';

import * as S from './styles';
import Button from '../Button';
import Link from 'next/link';

interface SumaryOrderProps {
    subtotal: number,
}

const SumaryOrder: React.FC<SumaryOrderProps> = ({ subtotal }) => {
    const delivery = 40;
    const total = subtotal + delivery;
    const deliveryFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(delivery);
    const totlaFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(total);
    const subtotalFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(subtotal);

    return (
        <S.Container aria-labelledby="summary-title" role="region">
            <S.Title id="summary-title">Resumo do pedido</S.Title>

            <dl>
                <S.Subtotal>
                    <dt>Subtotal</dt>
                    <dd>{subtotalFormatted}</dd>
                </S.Subtotal>

                <S.Delivery>
                    <dt>Entrega</dt>
                    <dd>{deliveryFormatted}</dd>
                </S.Delivery>

                <S.Divider />

                <S.Total>
                    <dt>Total</dt>
                    <dd>
                        <strong aria-live="polite">{totlaFormatted}</strong>
                    </dd>
                </S.Total>
            </dl>

            <Button
                action={() => { }}
                type="checkout"
                ariaLabel="Finalizar a compra e ir para o checkout"
            >
                Finalizar compra
            </Button>

            <nav aria-label="Links de suporte">
                <S.Links>
                    <li>
                        <Link href="#">Ajuda</Link>
                    </li>
                    <li>
                        <Link href="#">Reembolso</Link>
                    </li>
                    <li>
                        <Link href="#">Entregas e Frete</Link>
                    </li>
                    <li>
                        <Link href="#">Trocas e Devolução</Link>
                    </li>
                </S.Links>
            </nav>
        </S.Container>
    );
}

export default SumaryOrder;