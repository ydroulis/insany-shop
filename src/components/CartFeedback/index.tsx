import React from 'react';
import * as S from './styles';

interface CartFeedbackProps {
    children: React.ReactNode;
    color: string;
    background: string;
    type?: 'success' | 'error' | 'info';
}

const CartFeedback: React.FC<CartFeedbackProps> = ({
    children,
    color,
    background,
    type = 'info'
}) => {
    const ariaLabelMap = {
        success: 'Aviso de sucesso',
        error: 'Aviso de erro',
        info: 'Aviso de informação'
    };

    return (
        <S.Container
            $color={color}
            $background={background}
            role="alert"
            aria-live="assertive"
            aria-label={ariaLabelMap[type]}
        >
            <p>{children}</p>
        </S.Container>
    );
};

export default CartFeedback;
