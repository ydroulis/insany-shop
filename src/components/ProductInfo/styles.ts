"use client"

import styled from 'styled-components'

export const Container = styled.section`
color: #41414d;
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;

@media (min-width: 768px) {
    width: 704px;
    width: 448px;
}
`

export const Details = styled.div`
    width: 100%;
`

export const Category = styled.p`
    font-size: 1rem;
    margin-bottom: 0.75rem;
`

export const Title = styled.h1`
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
`

export const Price = styled.p`
    font-size: 1.25rem;
    font-weight: 600;
    color: #46ab80;
    margin-bottom: 1rem;
    
    @media (min-width: 1440px) {
        margin-bottom: 6.25rem;
    }
`

export const Description = styled.div`
    margin-bottom: 1.25rem;

    p{
        font-size: 1rem;
        font-weight: 500;
        color: #737380;
        margin-bottom: 1.25rem;
        text-transform: uppercase;
    }

    span{
        font-size: 0.875rem;
    }

    @media (min-width: 1440px) {
        margin-bottom: 0rem;
    }
`
