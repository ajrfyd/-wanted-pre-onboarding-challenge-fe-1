import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import Input from '../../components/Input';

type TodoBtnProps = {
  onClick: () => void;
  open: boolean;
}

type Props = {
  open: boolean;
}

const TodoBtn = ({ onClick, open }: TodoBtnProps) => {

  const test = async () => {
    const storage = await localStorage.getItem('userState');
    if(storage) {
      const { token } = JSON.parse(storage);
      const data = await axios.post('http://localhost:8080/todos', { title: 'Practice', content: 'React Practice' }, { headers: { Authorization: `Bearer${token}`}});
      console.log(data);
      return data;
    }

    // return data;
  }


  return (
    <>
      <Container onClick={onClick} open={open}>
        <MdAdd />
      </Container>
      {
        open && (
          <InsertTodoArea>
            <InsertForm>
              <Input type='text' placeholder='할일을 입력 후, Enter key를 누르세요.'/>
              <textarea name="" id="" ></textarea>
            </InsertForm>
          </InsertTodoArea>
        )
      }
    </>
  )
}

export default TodoBtn;


const Container = styled.button<Props>`
  background-color: #6fffd4;
  z-index: 100;
  cursor: pointer;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  font-size: 3rem;
  color: #fff;
  border-radius: 50%;
  border: none;
  outline: none;
  position: absolute;
  transition: .2s ease-in;

  &:hover {
    background-color: #81ffd9;
  }

  &:active {
    background-color: #20c997;
  }

  ${({ open }) => open && css`
    background-color: red;

    &:hover {
      background-color: #ff3939;
    }

    &:active {
      background-color: #cf0101;
    }
    transform: translate(-50%, 50%) rotate(45deg);

  `}

`

const InsertTodoArea = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`

const InsertForm = styled.form`
  background-color: #eee;
  padding: 3rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-top: 1px solid #eee;

  input {
    width: 100%;
  }

  textarea {
    border: none;
    outline: none;
    width: 100%;
  }
`