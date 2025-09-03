import React from 'react';
import { FiShoppingCart } from "react-icons/fi";

import * as S from './styles';

interface ButtonProps {
    children: React.ReactNode;
    type?: 'default' | 'checkout';
    action: () => void;
    ariaLabel?: string
}

const Button: React.FC<ButtonProps> = ({ children, type = "default", action, ariaLabel }) => {
    const accessibleLabel = ariaLabel ?? String(children);

    return (
        <S.Container $buttonType={type} onClick={() => action()} type='button' aria-label={accessibleLabel}>
            {type === "default" && <FiShoppingCart data-testid='icon-svg' size={24} color='#fff' aria-hidden="true" focusable="false" />}
            <p>{children}</p>
        </S.Container>
    );
}

export default Button;