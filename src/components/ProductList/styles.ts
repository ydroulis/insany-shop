"use client"

import styled from 'styled-components'

export const Container = styled.section`

    margin: 3rem auto 6.5rem auto;

    color: #000000;

    position: relative;

    p {
        text-align: center;
        margin: 0 auto;
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

export const Title = styled.h2`
    font-size: 1.5rem;

    font-weight: 700;

    margin-bottom: 47px;

    @media (min-width: 768px) {
        font-size: 2.5rem;
    }
`

export const Description = styled.p`
    font-size: 1rem;
    position: absolute;
    top: 30px;
    text-align: left;
    
    @media (max-width: 767px) {
        left: 0;
    }
    
    @media (min-width: 768px) {
        right: 0;
        top: 10px;
        text-align: center;
        font-size: 1.25rem;
    }
`

export const List = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    @media (min-width: 768px) {
        row-gap: 34px;
        column-gap: 24px;
    }   

    @media (min-width: 1024px) {
        column-gap: 14px;
    }   
        
    @media (min-width: 1440px) {
        column-gap: 26px;
    }
`