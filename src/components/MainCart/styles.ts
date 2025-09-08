"use client"

import styled from 'styled-components'

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    gap: 32px;
    font-family: Inter;
    padding: 5rem 1rem 10.5rem 1rem;


    position: relative;

    @media (min-width: 768px) {
        flex-direction: row;
        gap: 16px;
        padding: 5rem 2rem 10.5rem 2rem;
        justify-content: center;

        margin: 0 auto;

        max-width: 704px;
    }

    @media (min-width: 1024px) {
        padding: 5rem 3rem 10.5rem 3rem;

        max-width: 928px;
    }

    @media (min-width: 1440px) {
        gap: 32px;
        padding: 5rem 10rem 10.5rem 10rem;
    }
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

    position: absolute;
    left: 16px;

    &:hover {
        opacity: 0.8;
    }

    @media (min-width: 768px) {
        top: 80px;
        left: 0px;
    }

    @media (min-width: 1024px) {
        left: 0px;
    }

    @media (min-width: 1440px) {
        left: -100px;
    }
`

export const Title = styled.p`
    color: #000000;
    margin: 10rem auto;
`