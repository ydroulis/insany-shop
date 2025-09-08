"use client"

import styled from 'styled-components'

export const Container = styled.section`
    margin: 0 auto; 
    display: flex; 
    align-Items: center; 
    justify-content: space-between; 
    margin-top: 2rem;

       max-width: 704px;


    ul {
        display: flex;
        gap: 4px;
        list-style: none;
        font-size: 0.875rem;
        color: #737380;
    }

    a, .not-active {
        text-decoration: none;
        color: #737380;

        &:hover {
            text-decoration: underline;
        }
    }

    .active {
        text-decoration: none;
        color: #000000;

        &:hover {
            text-decoration: underline;
        }
    }

    @media (min-width: 768px) {
       max-width: 704px;
    }

    @media (min-width: 1024px) {
        max-width: 928px;
    }

    @media (min-width: 1440px) {
        max-width: 1120px;
    }
`