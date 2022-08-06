import styled from "styled-components";
import { useEffect, useState } from "react";
import Btn from "../../components/Btn";
import { useDispatch } from "react-redux";
import { reqLogout } from "../../store/login";
import { useNavigate } from "react-router-dom";
import BorderTemplate from "../../components/BorderTemplate";
import TodoList from "./TodoList";
import TodoBtn from './TodoBtn';

const Todo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logOutHandler = async () => {
    await localStorage.removeItem('userState');
    dispatch(reqLogout());
    navigate('/', {
      replace: true,
    })
  }

  useEffect(() => {
    const userState = localStorage.getItem('userState');
    if(!userState) {
      navigate('/', {
        replace: true
      })
    }
  }, []);

  const onToggle = () => setOpen(prev => !prev);

  return (  
    <Container>
      <Head>
        <h1>Todo List.....</h1>
        <div>할일 2개 남음</div>
      </Head>
      <TodoList />
      <TodoBtn onClick={onToggle} open={open}/>
      <Btn onClick={logOutHandler} position='absolute' top={1} right={1}>로그아웃</Btn>
    </Container>
  )
}

export default Todo;

const Container = styled.div`
  width: 60%;
  height: 70vh;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: space-around; */
  border-radius: 20px;
  position: relative;
  background-color: #fff;
`

const Head = styled.header`
  padding: 3rem 2rem 1rem 2rem;
  border-bottom: 1px solid #eee;

  h1 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    letter-spacing: .2rem;
  }

  div {
    margin-top: 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #20c997;
    letter-spacing: 2px;
  }
`