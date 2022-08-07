import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { LocalTodoType } from './todoTypes';

type TodoListProps = {
  todoList: LocalTodoType[];
  status: "loading" | "error" | "idle" | "success"
}

const TodoList = ({ todoList, status }: TodoListProps) => {
  
  const deleteTodo = (id: string) => {
    console.log(id)
  };

  // const deleteMutation = useMutation((id: string) => {

  // }, {

  // })

  if(status === 'loading') return <div style={{ flex: 1 }}>Loading....</div>
  if(status === 'error') return <div>Error!!!</div>

  return (
    <Container>
      {
        todoList.map(todo => <TodoItem key={todo.id} title={todo.title} done={todo.done} content={todo.content} onClick={() => deleteTodo(todo.id)} />)
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