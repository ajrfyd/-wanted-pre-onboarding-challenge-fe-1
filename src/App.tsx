import { Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Login from "./pages/login/Login";
import Todo from "./pages/todo/Todo";
import Main from "./pages/main/Main";
import NotFound from "./pages/error/NotFound";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e9ecef;
  }
`

const App = () => {

  return (
    <Container>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/todo' element={<Todo />} />
        <Route path='/auth' element={<Login />} />
        <Route path='/*' element={<NotFound />}/>
      </Routes>
    </Container>
  )
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`