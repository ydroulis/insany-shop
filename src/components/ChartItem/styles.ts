"use client"
import styled from 'styled-components'
import Image from 'next/image'

export const Container = styled.article`
    display: flex;
    gap: 31px;

    width: 736px;
    height: 211px;

    background-color: #fff;
    border-radius: 8px;

    box-sizing: border-box;
`

export const ProductImage = styled(Image)`
    min-width: 256px;
`

export const ProductInfo = styled.div`
    width: 100%;
    position: relative;

    padding: 1rem 0 1.5rem 0;

    color: #41414D;
`

export const Remove = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;

    position: absolute;
    top: 16px;
    right: 16px;

    &:hover {
        opacity: 0.8;
    }
`

export const ProductName = styled.h2`
    font-size: 1.25rem;
    font-weight: 300;

    margin-bottom: 0.75rem;
`

export const Description = styled.p`
    font-size: 0.75rem;

    margin-bottom: 0.75rem;
`

export const Values = styled.div`
    width: 100%;
    max-width: 433px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: absolute;
    bottom: 24px;
`

export const Price = styled.p`
    color: #09090A;
    font-size: 1rem;
    font-weight: 600;
`