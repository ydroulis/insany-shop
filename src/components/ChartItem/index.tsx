import React from 'react';
import { BsTrash3 } from "react-icons/bs";
import * as S from './styles';
import QuantitySelector from '../QuantitySelector';

interface ChartItemProps {
    name: string;
    description: string;
    price: number;
    image: string;
}

const ChartItem: React.FC<ChartItemProps> = ({ name, description, price, image }) => {
    const [value, setValue] = React.useState('1');

    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price);

    return (
        <S.Container aria-label={`Produto: ${name}`}>
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
                <S.Remove type="button" aria-label={`Remover ${name} do carrinho`}>
                    <BsTrash3 color='#DE3838' size={24} aria-hidden="true" />
                </S.Remove>
                <S.ProductName>{name}</S.ProductName>
                <S.Description>{description}</S.Description>
                <S.Values>
                    <QuantitySelector
                        value={value}
                        setValue={setValue}
                        options={[
                            { value: '1', label: '1' },
                            { value: '2', label: '2' },
                            { value: '3', label: '3' },
                            { value: '4', label: '4' },
                            { value: '5', label: '5' }]}
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

export default ChartItem;