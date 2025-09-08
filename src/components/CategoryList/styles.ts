'use client'

import styled from 'styled-components'

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    gap: 34px;
    margin: 0 auto;

    @media (min-width: 768px) {
        max-width: 704px;
    }

    @media (min-width: 1024px) {
        max-width: 928px;
    }

    @media (min-width: 1440px) {
        max-width: 1120px;
    }
`

export const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: #000000;

    @media (min-width: 768px) {
        font-size: 2.5rem;
    }
`

export const List = styled.ul`
    width: 100%;
    
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    
    list-style: none;
    
    @media (min-width: 768px) {
        height: 116px;
        gap: 20px;
    }

    @media (min-width: 1024px) {
        gap: 10px;
    }

    @media (min-width: 1440px) {
        gap: 20px;
    }
`