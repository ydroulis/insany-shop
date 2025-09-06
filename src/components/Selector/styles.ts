'use client'

import styled from 'styled-components'

export const Container = styled.div`
    width: 168px;
    height: 24px;

    font-size: 0.875rem;

    color: #737380;

    position: relative;
`

export const Selector = styled.button<{ $selectType: string }>`
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: ${({ $selectType }) => ($selectType === 'category' ? 'flex-start' : 'flex-end')};
    align-items: center;
    gap: 8px;

    width: 100%;
    height: 100%;

    cursor: pointer;

    span {
        width: fit-content;
        color: #737380;
        font-family: 'Inter', sans-serif;
        text-align: right;
    }

    &:focus {
        outline: 2px solid #2684FF;
        outline-offset: 2px;
    }
`

export const SelectorMenu = styled.div<{ $isOpen: boolean }>`
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    gap: 4px;
    margin-top: .25rem;

    width: 176px;

    padding: 1rem .75rem;

    border-radius: 4px;
    background-color: #FFFFFF;
    position: relative;
    z-index: 99;
`

export const SelectorItem = styled.button`
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    margin: .5rem 0rem;

    cursor: pointer;

    height: 24px;
    width: 100%;

    margin: 0rem;

    color: #737380;
    font-family: 'Inter', sans-serif;
`