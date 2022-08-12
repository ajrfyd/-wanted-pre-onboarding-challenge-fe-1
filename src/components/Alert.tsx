import { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react';
import styled, { keyframes, css } from "styled-components";
import Btn from '../components/Btn';
import { GoAlert } from 'react-icons/go';

type AlertProps = {
  message: string;
  isOpen: boolean;
  setStateFunc: Dispatch<SetStateAction<boolean>>;
}

type Animate = {
  animate: boolean;
}

const Alert = ({ message, isOpen, setStateFunc }: AlertProps) => {
  const [localState, setLocalState] = useState(isOpen);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if(!isOpen && localState) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }

    setLocalState(isOpen);
  }, [isOpen, localState])


  if(!animate && !localState) return null;

  return (
    <Container animate={animate} onClick={(e) => e.currentTarget === e.target ? setStateFunc(false) : null } >
      <Modal animate={animate} >
        <Title>
          <h1>Alert</h1>
          <GoAlert size={40}/>          
        </Title>
        <Main>
          <p>
            { message }
          </p>
        </Main>
        <Btn onClick={() => setStateFunc(false)}>확인</Btn>
      </Modal>
    </Container>
  )
}

export default Alert;

const bounceIn = keyframes`
  0%, 100%, 20%, 40%, 60%, 80% {
    -webkit-transition-timing-function: cubic-bezier(0.215, .61, .355, 1);
    transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
  }
  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    -ms-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }
  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    -ms-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1)
  }
  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    -ms-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9)
  }
  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    -ms-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03)
  }
  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    -ms-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97)
  }
  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1)
  }
`

const bounceOut = keyframes`
  20% {
    -webkit-transform: scale3d(.9, .9, .9);
    -ms-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9)
  }
  50%,
  55% {
    opacity: 1;
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    -ms-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1)
  }
  100% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    -ms-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const Container = styled.div<Animate>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .3);
  animation: ${fadeIn} 1s both;

  ${({ animate }) => animate && css`
    animation: ${fadeOut} 1s both;
  `}
`

const Modal = styled.div<Animate>`
  background-color: #fff;
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, .5);

  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  padding: 2rem 5rem;

  h1 {
    font-size: 3rem;
    margin: 2rem 0;
  }

  animation-name: ${bounceIn};
  /* transition: .5s; */
  animation-duration: .5s;
  animation-fill-mode: both;

  ${({ animate }) => animate && css`
    animation-name: ${bounceOut};
  `}
`

const Title = styled.div`
  svg {
    color: red;
  }
`

const Main = styled.div`
  /* flex: 1; */
  width: 70%;
  display: flex;
  flex-direction: column;
  padding: 5rem 1rem;
  align-items: center;

  font-size: 1.3vw;
  font-weight: bold;

`