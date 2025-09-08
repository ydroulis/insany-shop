"use client"

import styled from 'styled-components'

export const Container = styled.section`
    min-width: 352px;
    height: 700px;

    background-color: #fff;

    margin-top: 2.5rem;

    color: #41414D;

    padding: 1.25rem 1.5rem 1.5rem 1.5rem;

    position: relative;

    @media (min-width: 768px) {
        min-width: 282px;
    }

    @media (min-width: 1024px) {

    }

    @media (min-width: 1440px) {
        min-width: 352px;
    }
`

export const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;

    text-transform: uppercase;
    margin-bottom: 1.85rem;
`

export const Subtotal = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;

    margin-bottom: 1rem;
`

export const Delivery = styled.div`
    width: 100%;    
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;

    margin-bottom: 1.6rem;
`

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #DCE2E5;

    margin-bottom: 0.75rem;
`

export const Total = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;

    margin-bottom: 2.5rem;
`

export const Links = styled.ul`
    position: absolute;
    bottom: 24px;
    left: 24px;

    display: flex;
    flex-direction: column;
    gap: 12px;

    list-style: none;

    li a{
        color: #737380;
        text-decoration: underline;
        text-transform: uppercase;
    }
`