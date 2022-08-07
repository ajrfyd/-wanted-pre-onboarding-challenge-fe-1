import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useMutation, useQueryClient } from "react-query";
import axios, { Axios, AxiosError } from "axios";
import { LocalTodoType } from './todoTypes';
import { Dispatch, SetStateAction } from 'react';

type TodoListProps = {
  todoList: LocalTodoType[];
  setTodoList: Dispatch<SetStateAction<LocalTodoType[]>>
}

type DeletResponseType = {
  config: unknown;
  data: {
    data: null;
  }
  headers: unknown;
  request: unknown;
  status: number;
  statusText: string;
}

const TodoList = ({ todoList, setTodoList }: TodoListProps) => {
  const queryClient = useQueryClient();

  const deleteTodo = async (id: string) => {
    const localData = await localStorage.getItem('userState');
    if(!localData) return;

    const { token } = JSON.parse(localData);
    const data = await axios.delete(`http://localhost:8080/todos/${id}`, {
      headers: {
        Authorization: `Bearer: ${token}`
      }
    })
    return data;
  };

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('getTodoList')
    }
  })

  const doneTodoHandler = (id: string) => {
    // const todo = todoList.find(todo => todo.id === id);
    setTodoList(prev => {
      return prev.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo);
    })
  };

  return (
    <Container>
      {
        todoList.map(todo => <TodoItem key={todo.id} id={todo.id} title={todo.title} done={todo.done} content={todo.content} onClick={() => deleteMutation.mutate(todo.id)} doneTodoHandler={() => doneTodoHandler(todo.id)}/>)
      }
    </Container>
  )
}

export default TodoList;

const Container = styled.div`
  flex: 1;
  padding: 1.5rem 2rem;
  overflow-y: auto;

  /* position: relative; */
`