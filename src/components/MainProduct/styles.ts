"use client"

import styled from 'styled-components'

export const Container = styled.main`
    font-family: Inter, sans-serif;

    padding: 5rem 1rem 10.5rem 1rem;

    @media (min-width: 768px) {
        padding: 5rem 2rem 10.5rem 2rem;

        .wrapper {
            max-width: 704px;
            margin: 0 auto;
        }
    }

    @media (min-width: 1024px) {
        padding: 5rem 3rem 10.5rem 3rem;

        .wrapper {
            max-width: 928px;
            margin: 0 auto;
        }
    }

    @media (min-width: 1440px) {
        padding: 5rem 10rem 10.5rem 10rem;

        .wrapper {
            max-width: 1120px;
            margin: 0 auto;
        }
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

    &:hover {
        opacity: 0.8;
    }
`

export const Body = styled.section`
   width: 100%;
   display: flex;
   flex-direction: column;
   gap: 32px;

   @media (min-width: 768px) {
        flex-direction: row;
        gap: 16px;
   }

   @media (min-width: 1024px) {
        gap: 32px;
   }
`