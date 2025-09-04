"use client"

import styled from 'styled-components'

export const Container = styled.section`
    margin: 0 auto; 
    max-width: 1120px; 
    display: flex; 
    alignItems: center; 
    justify-content: space-between; 
    margin-top: 2rem;

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
`