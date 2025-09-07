"use client"

import styled from 'styled-components'

export const Container = styled.main`
    display: flex;
    gap: 32px;
    font-family: Inter;
    padding: 5rem 10rem 7.188rem 10rem;

    position: relative;
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
    left: 10rem;

    &:hover {
        opacity: 0.8;
    }
`

export const Title = styled.p`
    color: #000000;
    margin: 10rem auto;
`