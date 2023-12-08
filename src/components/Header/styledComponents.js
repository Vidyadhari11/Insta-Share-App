import styled from 'styled-components'

export const SearchButton = styled.button`
  background: #dbdbdb;
  border-radius: 0px 2px 2px 0px;
  border-style: none;
  width: 34px;
`

export const HamburgerButton = styled.button`
  border-style: none;
  background-color: transparent;
  cursor: pointer;
`

export const LogoutButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  gap: 8px;
  width: 60px;
  height: 32px;
  background: #4094ef;
  border-radius: 4px;
  flex: none;
  order: 0;
  flex-grow: 0;
  border-style: none;
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    width: 86px;
    height: 36px;
    font-size: 16px;
  }
`
