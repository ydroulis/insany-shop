'use client'

import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'

export const CardArticle = styled(Link)`
    display: flex;
    width: 356px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: -6px 8px 20.4px 0px #0000000A;
    transition: transform 0.3s ease-in-out;
    text-decoration: none;
    color: inherit;

    p{
        margin: 0;
    }

    &:hover {
        transform: scale(1.02);
    }

    &:focus-visible {
        outline: 3px solid #2563eb;
        outline-offset: 4px;
        border-radius: 4px;
        transform: scale(1.02);
    }
`

export const CardLink = styled.article`
    width: 100%;
    height: 100%;
`

export const CardImage = styled(Image)`
    width: 100%;
    height: 270px;
    object-fit: cover;
`

export const Details = styled.div`
    display: flex;
    flex-direction: column;

    font-size: 0.875rem;

    padding: 0.75rem 1.313rem 1.75rem 1.313rem;

    position: relative;

    color: #000000;
`

export const Category = styled.span`
`

export const Title = styled.h2`
    font-weight: 700;
    font-size: 0.875rem;

    margin-top: 0.938rem;
`

export const Description = styled.p`
    margin-top: 0.313rem !important;
    text-align: left !important;
`

export const Price = styled.span`
    margin: 0.938rem 0rem;
    font-weight: 700;
    font-size: 1.5rem;
    color: #1B9847;
`

export const Stock = styled.span`
    position: absolute;
    right: 21px;
    bottom: 90px;
`

export const Rate = styled.div`
    display: flex;
    gap: 5px;
    align-items: baseline;
    position: absolute;

    top: 12px;
    right: 21px;

    font-weight: 700;
`