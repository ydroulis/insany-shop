"use client"

import styled from 'styled-components'

export const Container = styled.div<{ $color: string; $background: string }>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 300px;
    height: 60px;

    border-radius: 8px;

    background-color: ${({ $background }) => $background};

    color: ${({ $color }) => $color};

    position: fixed;
    bottom: 10px;
    right: 10px;

    z-index: 999;

    @media (min-width: 768px) {
        bottom: 50px;
        right: 50px;
    }
`