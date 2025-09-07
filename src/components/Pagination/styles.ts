"use client"
import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 21px;

    margin-top: 3.188rem;

    .current {
        border: 1px solid #A212DF !important;
        color: #A212DF !important;
    }
`

export const Buttons = styled.button`
    width: 32px;
    height: 32px;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border: none;
    background-color: #E9E9F0;

    color: #737380;
    font-size: 1rem;

    &:hover {
        opacity: 0.6;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`