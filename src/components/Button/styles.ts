'use client'
import styled from 'styled-components'

export const Container = styled.button<{ $buttonType: string }>`
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;

    border: none;
    border-radius: 4px;

    background-color: ${({ $buttonType }) => ($buttonType === 'default' ? '#000000' : '#1B9847')};
    cursor: pointer;
    width: 100%;
    height: ${({ $buttonType }) => ($buttonType === 'default' ? '40px' : '44px')};

    color: ${({ $buttonType }) => ($buttonType === 'default' ? '#fff' : '#f5f5fa')};
    font-size: 1rem;
    font-weight: 500;
    text-transform: ${({ $buttonType }) => ($buttonType === 'default' ? 'none' : 'uppercase')};

    p{
        margin: 0;
    }

    &:hover {
        opacity: 0.8;
    }

    &:focus-visible {
        outline: 3px solid #2563eb;
        outline-offset: 4px;
        border-radius: 4px;
        opacity: 0.8;
    }
`