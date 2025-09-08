"use client"

import Image from 'next/image'
import styled from 'styled-components'

export const Container = styled(Image)`
    border-radius: 4px;

    width: 100%;
    height: 100%;
    @media (min-width: 1440px) {
        width: 640px;
        min-width: 640px;
        height: 580px;
    }
`