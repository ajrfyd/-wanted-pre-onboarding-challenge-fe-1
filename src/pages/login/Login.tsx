import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLoginState } from "../../utils/utils";
import { BiLeftArrowCircle } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const Login = () => {
  const { signUp } = useLoginState();
  const navigate = useNavigate();

  return (
    <Container>
      <BiLeftArrowCircle onClick={() => navigate(-1)}/>
      {
        signUp ? <h1>회원가입</h1> : <h1>로그인</h1>
      }
      <Form signUp={signUp}/>
    </Container>
  )

}

export default Login;

const Container = styled.div`
  width: 30%;
  height: 70vh;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
  position: relative;
  background-color: #fff;

  svg {
    font-size: 2rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
    cursor: pointer;
  }

  h1 {
    letter-spacing: 10px;
  }
`