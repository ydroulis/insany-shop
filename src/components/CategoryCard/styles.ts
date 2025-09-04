"use client"

import Link from 'next/link'
import styled from 'styled-components'

export const CardLink = styled(Link)`
    display: flex;
    width: 208px;
    height: 100%;
    min-height: 116px;
    text-decoration: none;
    color: inherit;

    border: 1px solid #E0E0E0;

    border-radius: 12px;
    background-color: #fff;
    transition: transform 0.3s ease-in-out;

    color: #000000;
    font-size: 1rem;

    &:hover {
        transform: scale(1.02);
    }

    &:focus-visible {
        outline: 3px solid #2563eb;
        outline-offset: 4px;
        border-radius: 12px;
        transform: scale(1.02);
    }
`

export const CardArticle = styled.article`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
`

export const Title = styled.h3`
    font-weight: 700;
`

export const ProductCount = styled.p`
`

