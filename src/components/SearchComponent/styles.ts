'use client'

import styled from 'styled-components'
import { CiSearch } from "react-icons/ci";

export const Container = styled.div`
    position: relative;
    width: 352px;
    height: 42px;

    border-radius: 8px;
`

export const SearchInput = styled.input`
    width: 100%;
    height: 42px;
    border: none;

    border-radius: 8px;
    background-color: #F3F7FF;

    padding: 0rem .75rem;

    color: #737380;

    &::placeholder {
        color: #737380;
    }
`

export const SearchIcon = styled(CiSearch)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 9px;
    color: #5D5D6D;
`

export const SrOnly = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
`