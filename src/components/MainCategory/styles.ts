'use client'

import styled from 'styled-components'

export const Container = styled.main`
    font-family: Inter, sans-serif;
    
    padding: 5rem 1rem 10.5rem 1rem;

    @media (min-width: 768px) {
        padding: 5rem 2rem 10.5rem 2rem;
    }

    @media (min-width: 1024px) {
        padding: 5rem 3rem 10.5rem 3rem;
    }

    @media (min-width: 1440px) {
        padding: 5rem 10rem 10.5rem 10rem;
    }

`