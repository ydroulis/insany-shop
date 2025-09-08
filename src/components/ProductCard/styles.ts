'use client'

import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'

export const CardArticle = styled.article`
    display: flex;
    overflow: hidden;
    box-shadow: -6px 8px 20.4px 0px #0000000A;
    transition: transform 0.3s ease-in-out;
    color: inherit;

    height: 430px;

    background-color: #fff;
    border-radius: 19px;
    
    position: relative;

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

    @media (min-width: 768px) {
        width: 340px;
        height: 520px;
    }

    @media (min-width: 1024px) {
        width: 300px;
        height: 480px;
    }

    @media (min-width: 1440px) {
        width: 356px;
        height: 520px;
        
    }
`

export const CardLink = styled(Link)`
    width: 100%;
    height: 198px;

    text-decoration: none;
`

export const CardImage = styled(Image)`
    width: 100%;
    object-fit: cover;

    @media (min-width: 768px) {
        height: 270px;
    }

    @media (min-width: 1024px) {
        height: 230px;
    }

    @media (min-width: 1440px) {
        height: 270px;
    }
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
    bottom: 50px;
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

export const Action = styled.div`
    width: 305px;

    position: absolute;

    left: 21px;
    bottom: 28px;
    
    @media (min-width: 768px) {
        width: 300px;
        left: 21px;
        bottom: 28px;
    }

    @media (min-width: 1024px) {
        width: 260px;
        left: 21px;
        bottom: 18px;
    }

    @media (min-width: 1440px) {
        width: 314px;

        left: 21px;
        bottom: 28px;
    }
`