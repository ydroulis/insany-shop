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
        font-family: 'Inter', sans-serif;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
        display: none;
    }

    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
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

export const Suggestions = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 4px 0;
  max-height: 220px;
  overflow-y: auto;
  z-index: 10;
`;

export const SuggestionItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #f5f5f5;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 36px; /* antes do ícone de busca */
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #000;
  }
`;