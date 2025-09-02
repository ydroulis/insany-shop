import React from 'react'
import * as S from './styles'

const Main = ({
    title = 'teste',
    description = 'Testando'
}) => (
    <S.Wrapper>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
    </S.Wrapper>
)

export default Main