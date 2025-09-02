import React from 'react';

import * as S from './styles';

const SearchComponent: React.FC = () => {
    return (
        <S.Container role="search" aria-label="Pesquisar no site">
            <label htmlFor="site-search" className='sr-only'>
                <S.SrOnly>Procurar produtos</S.SrOnly>
            </label>

            <S.SearchInput id='site-search' type="search" placeholder="Procurando algo específico" aria-label='Campo de busca' />
            <S.SearchIcon data-testid='search-icon' size={24} aria-hidden={true} focusable="false" />
        </S.Container>
    )
}

export default SearchComponent;