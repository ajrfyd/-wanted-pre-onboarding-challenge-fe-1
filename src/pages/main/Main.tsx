import { useEffect } from 'react';
import styled from "styled-components";
import Btn from "../../components/Btn";
import { useNavigate } from "react-router-dom";
import { needLogin, needSignup, reqLogin } from '../../store/login';
import { useDispatch } from 'react-redux';
import { useLoginState } from '../../utils/utils';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginState } = useLoginState();

  const loginHandler = (num: number) => {
    num === 1 ? dispatch(needLogin()) : dispatch(needSignup());
    navigate('/auth');
  }

  useEffect(() => {
    const userState = localStorage.getItem('userState');

    if(userState) {
      const { email, token } = JSON.parse(userState);
      dispatch(reqLogin(email))
      navigate('/todo');
    }
  }, []);
  
  return (
    <Container>
      <h1>Welcome!</h1>
      <Pgroup>
        <p>이 서비스는 회원 가입을 필요로 합니다.</p>
        <p>e-mail주소만 가지고 계시다면 간편하게 가입할 수 있습니다.</p>
      </Pgroup>

      <BtnGroup>
        <Btn onClick={() => loginHandler(0)}>회원가입</Btn>
        <Btn onClick={() => loginHandler(1)}>로그인</Btn>
      </BtnGroup>
    </Container>
  )
}

export default Main;

const Container = styled.div`
  width: 30%;
  height: 70vh;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
  background-color: #fff;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
`

const Pgroup = styled.div`
  text-align: center;

  p + p {
    margin-top: 2rem;
  }
`

const BtnGroup = styled.div`

`