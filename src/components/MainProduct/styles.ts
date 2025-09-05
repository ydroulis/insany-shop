"use client"

import styled from 'styled-components'

export const Container = styled.main`
    padding: 5rem 10rem 5.563rem  10rem;
    font-family: Inter, sans-serif
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

export const Body = styled.section`
   width: 100%;
   display: flex;
   gap: 32px;
`