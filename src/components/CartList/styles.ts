"use client"

import styled from 'styled-components'

export const Container = styled.section`
   color: #41414D;

   margin-top: 4.438rem;
`

export const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 500;

    margin-bottom: 0.5rem;

    text-transform: uppercase;
`

export const Amount = styled.p`
    font-size: 1rem;
    font-weight: 300;

    margin-bottom: 1.438rem;

    span {
        font-weight: 500;
    }
`

export const List = styled.ul`
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: 16px;
`