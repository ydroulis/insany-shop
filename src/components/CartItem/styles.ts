"use client"
import styled from 'styled-components'
import Image from 'next/image'

export const Container = styled.article`
    display: flex;
    gap: 10px;

    width: 100%;
    height: 200px;

    background-color: #fff;
    border-radius: 8px;

    box-sizing: border-box;

    padding-right: 1rem;

    @media (min-width: 768px) {
        width: 406px;
        gap: 16px;
        padding-right: 1rem;
    }

    @media (min-width: 1024px) {
        width: 636px;
        gap: 31px;

        height: 211px;
    }

    @media (min-width: 1440px) {
        width: 736px;
        gap: 31px;

        height: 211px;
    }
`

export const ProductImage = styled(Image)`
    width: 100px;
    min-width: 100px;
    height: 100px;
    border-radius: 8px 0px 0px 8px;

    @media (min-width: 768px) {
        min-width: 100px;
        height: 100px;
    }

    @media (min-width: 1024px) {
        min-width: 256px;
        height: 211px;
    }

    @media (min-width: 1440px) {
        min-width: 256px;
        height: 211px;
    }
`

export const ProductInfo = styled.div`
    width: 100%;
    position: relative;

    padding: .5rem 0 .5rem 0;

    color: #41414D;

    @media (min-width: 768px) {
        padding: 1rem 0 1.5rem 0;
    }
`

export const Remove = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;

    position: absolute;
    

    &:hover {
        opacity: 0.8;
    }

    @media (max-width: 767px) {
        bottom: 30px;
        right: 0px;
    }

    @media (min-width: 768px) {
        top: 16px;
        right: 16px;
    }
`

export const ProductName = styled.h2`
    font-size: 1.25rem;
    font-weight: 300;

    margin-bottom: 0rem;

    @media (min-width: 768px) {
        margin-bottom: 0.75rem;
    }
`

export const Description = styled.p`
    font-size: 0.75rem;

    margin-bottom: 0.75rem;
`

export const Values = styled.div`
    max-width: 433px;

    display: flex;
    align-items: center;

    position: absolute;
    justify-content: space-evenly;

    bottom: 24px;

    @media (max-width: 767px) {
        right: 28px;
        flex-direction: row;
        gap: 20px;
        right: 60px;
    }

    @media (min-width: 768px) {
        width: 100%;
        justify-content: space-between;
    }

    @media (min-width: 1024) {
        width: 100%;
        justify-content: space-between;
    }

    @media (min-width: 1440px) {
        width: 100%;
        justify-content: space-between;
    }
`

export const Price = styled.p`
    color: #09090A;
    font-size: 1rem;
    font-weight: 600;
`