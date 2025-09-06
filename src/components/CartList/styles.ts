"use client"

import styled from 'styled-components'

export const Container = styled.section`
   color: #41414D;
`

export const Back = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;

    border: none;
    background-color: transparent;
    cursor: pointer;

    font-size: 0.875rem;
    color: #617480;

    margin-top: 1.563rem;
    margin-bottom: 1.375rem;

    &:hover {
        opacity: 0.8;
    }
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