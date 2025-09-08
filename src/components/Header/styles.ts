'use client'

import styled from 'styled-components'

export const Wrapper = styled.header`
  background-color: #FFFFFF;
  color: #5D5D6D;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0rem 1rem;
  
  font-family: 'Inter', sans-serif;

  position: fixed;
  top: 0;

  z-index: 1;

  @media (min-width: 768px) {
    padding: 0rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 0rem 3rem;
  }

  @media (min-width: 1440px) {
    padding: 0rem 10rem;
  }
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 704px;
  }

  @media (min-width: 1024px) {
    max-width: 928px;
  }

  @media (min-width: 1440px) {
    max-width: 1120px;
  }
`

export const Logo = styled.h1`
  font-size: 1rem;
  font-weight: 700;

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`

export const Actions = styled.nav`
    display: flex;
    gap: 24px;

    @media (max-width: 767px) {
      width: 245px;
      gap: 12px;
    }
`

export const Notifications = styled.button`
  position: relative;

  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

export const NotificationIndicator = styled.div`
 font-family: 'Saira', sans-serif; 

 width: 17px;
 height: 17px;
 border-radius: 50%;

 background-color: #DE3838;
 color: #FFFFFF;
 display: flex;
 align-items: center;
 justify-content: center;

 position: absolute;
 bottom: 0px;
 right: -5px;
`

export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`