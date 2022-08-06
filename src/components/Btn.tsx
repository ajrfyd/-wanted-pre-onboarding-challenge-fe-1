import styled, { css } from "styled-components";

type BtnProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  valid?: boolean;
  position?: string;
  top?: number;
  left?: number;
  right?: number;
}

type EtcProps = {
  position?: string;
  top?: number;
  left?: number;
  right?: number;
}

const Btn = ({ children, onClick, type = 'button', valid, position, top, left, right }: BtnProps ) => {
  return (
    <CustomBtn 
      onClick={onClick} 
      type={type} 
      disabled={valid}
      position={position}
      top={top}
      left={left}
      right={right}
    >
      { children }
    </CustomBtn>
  )
}

export default Btn;

const CustomBtn = styled.button<EtcProps>`
  cursor: pointer;
  border: none;
  outline: none;
  padding: .5rem 1rem;
  border-radius: 6px;
  color: #fff;
  background-color: #6200ee;
  font-weight: bold;
  font-size: .9rem;
  transition: .1s;

  & + & {
    margin-left: 2rem;
  }

  &:hover {
    color: #6200ee;
    background-color: #fff;
  }

  &:active {
    transform: scale(1.1);
  }

  ${({ position, top, right }) => position && top && right && css`
    position: ${position};
    top: ${top}rem;
    right: ${right}rem;
  `}
`