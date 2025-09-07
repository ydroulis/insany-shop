import React, { useEffect, useState } from 'react';
import { BsTrash3 } from "react-icons/bs";
import * as S from './styles';
import QuantitySelector from '../QuantitySelector';
import { useCartStore } from '../../providers/cartStoreProvider';
import CartFeedback from '../CartFeedback';

interface CartItemProps {
    name: string;
    description: string;
    price: number;
    image: string;
    id: number;
    stock: number
}

const CartItem: React.FC<CartItemProps> = ({ name, description, price, image, id, stock }) => {
    const { removeProductFromCart, changeItems, showFeedback } = useCartStore((state) => state);
    const [value, setValue] = useState('1');
    const [finalPrice, setFinalPrice] = useState(price);

    const options = Array.from({ length: Math.min(stock, 10) }, (_, i) => ({
        value: String(i + 1),
        label: String(i + 1),
    }));

    useEffect(() => {
        const amount = price * Number(value);
        setFinalPrice(amount);
        changeItems(id, Number(value));

    }, [changeItems, id, price, value]);

    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(finalPrice);

    const handleRemoveProductFromCart = () => {
        removeProductFromCart(id, price);

        showFeedback(true);
        setTimeout(() => {
            showFeedback(false);
        }, 3000);
    }

    return (
        <S.Container data-testid="cart-item" aria-label={`Produto: ${name}`}>
            <S.ProductImage
                src={image}
                alt={`Imagem do produto ${name}`}
                width={256}
                height={211}
                loading='lazy'
                placeholder='blur'
                blurDataURL='...'
            />
            <S.ProductInfo>
                <S.Remove type="button" aria-label={`Remover ${name} do carrinho`} onClick={handleRemoveProductFromCart}>
                    <BsTrash3 color='#DE3838' size={24} aria-hidden="true" />
                </S.Remove>
                <S.ProductName>{name}</S.ProductName>
                <S.Description>{description}</S.Description>
                <S.Values>
                    <QuantitySelector
                        value={value}
                        setValue={setValue}
                        options={options}
                        label={`Quantidade de ${name}`}
                        id="quantity"
                    />
                    <S.Price aria-label={`Preço do produto ${formattedPrice}`}>
                        {formattedPrice}
                    </S.Price>
                </S.Values>
            </S.ProductInfo>
        </S.Container>
    );
}

export default CartItem;