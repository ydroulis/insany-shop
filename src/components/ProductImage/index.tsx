import React from 'react';

import * as S from './styles';

interface ProductImageProps {
    image: string
    name: string
}

const ProductImage: React.FC<ProductImageProps> = ({ image, name }) => {
    return (
        <S.Container
            src={image}
            alt="Imagem do produto"
            width={640}
            height={580}
            loading="lazy"
            placeholder='blur'
            blurDataURL="..."
            role="img"
            aria-label={`Imagem ilustrativa do produto ${name}`}
            sizes="(max-width: 768px) 100vw, 640px"
        />
    );
}

export default ProductImage;