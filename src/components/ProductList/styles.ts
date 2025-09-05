"use client"

import styled from 'styled-components'

export const Container = styled.section`
    max-width: 1120px;

    margin: 48px auto 51px auto;

    color: #000000;

    position: relative;

    p {
        text-align: center;
        margin: 0 auto;
    }
`

export const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;

    margin-bottom: 47px;
`

export const Description = styled.p`
    font-size: 1.25rem;

    position: absolute;
    top: 10px;
    right: 0;
`

export const List = styled.ul`
    display: flex;
    column-gap: 26px;
    row-gap: 34px;
    flex-wrap: wrap;

    list-style: none;
`