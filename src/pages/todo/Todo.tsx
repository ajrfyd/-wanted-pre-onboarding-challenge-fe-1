import styled from "styled-components";
import { useEffect, useState } from "react";
import Btn from "../../components/Btn";
import { useDispatch } from "react-redux";
import { reqLogout } from "../../store/login";
import { useNavigate } from "react-router-dom";
import BorderTemplate from "../../components/BorderTemplate";
import TodoList from "./TodoList";
import TodoBtn from './TodoBtn';
import { getTodoList } from "../../utils/utils";
import { LocalTodoType, TodoType, QueryReturnType } from "./todoTypes";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

const Todo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState<LocalTodoType[]>([]);
  const [open, setOpen] = useState(false);

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

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

  const { data, status } = useQuery<TodoType[], AxiosError, QueryReturnType, string>('getTodoList', getTodoList, {
    onSuccess: (res) => {
      const { data } = res;
      const localData = data.map(item => {
        return {
          ...item,
          done: false
        }
      })
      setTodoList(localData);
    }
  });

  const restTodo = (): number => {
    const rest = todoList.filter(todo => !todo.done);
    return rest.length;
  }

  return (  
    <Container>
      <Head>
        <h1>Todo List.....</h1>
        <HeadBottom>
          <h1>
            할일 {restTodo()}개 남음
          </h1>
          <h2>
            {dateString}
          </h2>
        </HeadBottom>
      </Head>
      {
        status === 'loading' && (
          <Loading>Loading....</Loading>
        )
      }
      {
        data && <TodoList todoList={todoList} setTodoList={setTodoList}/>
      }
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
  border-radius: 20px;
  position: relative;
  background-color: #fff;
`

const Head = styled.header`
  padding: 3rem 2rem 1rem 2rem;
  border-bottom: 1px solid #eee;

  div {
    margin-top: 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 2px;
  }
`

const HeadBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    letter-spacing: .2rem;
    color: #20c997;
  }

  h2 {
    color: #aaa;
  }
`

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 2px;
`