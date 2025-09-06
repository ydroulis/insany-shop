"use client"

import styled from 'styled-components'

export const QuantityContainer = styled.div`
    width: 65px;
    height: 40px;

    color: #737380;
   
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`

export const QuantitySelector = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;

    color: #737380;

    width: 100%;
    height: 100%;
    
    background-color: #F3F5F6;
    border-width: 0px, 0px, 0px, 0px;

    border-style: solid;
    border-color: #A8A8B3;
    border-radius: 8px;

    cursor: pointer;

    padding: 8px 12px 8px 12px;
`

export const QuantitySelectorMenu = styled.div<{ $isOpen: boolean }>`
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    gap: 4px;
    margin-top: .25rem;

    width: 100%;

    border-radius: 4px;
    background-color: #FFFFFF;
    position: relative;
    z-index: 99;
`

export const QuantitySelectorItem = styled.button`
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: .5rem 0rem;

    cursor: pointer;

    height: 24px;
    width: 100%;

    margin: 0rem;

    color: #737380;

    font-family: 'Inter', sans-serif;

    text-align: center;
`               