import React, { useState } from 'react';

import * as S from './styles';
import Selector from '../Selector';

const optionsCategory = [
    { value: 'eletronics', label: 'Eletrônicos' },
    { value: 'clothing', label: 'Roupas e Calçados' },
    { value: 'decoration', label: 'Casa e Decoração' },
    { value: 'books', label: 'Livros' },
    { value: 'sport', label: 'Esporte e Lazer' },
]

const optionsSort = [
    { value: 'newers', label: 'Novidades' },
    { value: 'higher', label: 'Preço: Maior - menor' },
    { value: 'lower', label: 'Preço: Menor - maior' },
]

const Filters: React.FC = () => {
    const [valueCategory, setValueCategory] = useState('Selecione a categoria');
    const [valueSort, setValueSort] = useState('Organizar por');

    return (
        <S.Container data-testid="filters-section">
            <Selector type="category" options={optionsCategory} setValue={setValueCategory} value={valueCategory} label="Selecione a categoria" id="category" />
            <Selector type="sort" options={optionsSort} setValue={setValueSort} value={valueSort} label="Selecione a organização dos produtos" id="sort" />
        </S.Container>
    );
}

export default Filters;