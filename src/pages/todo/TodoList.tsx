import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoList = () => {

  return (
    <Container>
      <TodoItem text='React' done={false} />
      <TodoItem text='Angular' done />
      <TodoItem text='Vue' done />
      <TodoItem text='JavaScript' done />
      <TodoItem text='Svelt' done />
      <TodoItem text='TypeScript' done />
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