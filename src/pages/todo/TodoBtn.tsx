import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';
import Input from '../../components/Input';
import { useState, useRef } from 'react';
import { useTodo } from '../../utils/utils';

type TodoBtnProps = {
  onClick: () => void;
  open: boolean;
}

type Props = {
  open: boolean;
}

const TodoBtn = ({ onClick, open }: TodoBtnProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const { modify, modifyId } = useTodo();

  const createTodo = async () => {
    const storage = await localStorage.getItem('userState');
    if(!storage || !titleRef.current || !contentRef.current) return null;

    const { token } = JSON.parse(storage);
    const data = await axios.post('http://localhost:8080/todos', { 
      title: titleRef.current.value, content: contentRef.current.value }, { headers: { Authorization: `Bearer${token}`
    }});
    // return data;
  }

  const modifyTodo = async () => {
    const storage = await localStorage.getItem('userState');
    if(!storage || !titleRef.current || !contentRef.current) return null;

    const { token } = JSON.parse(storage);
    const data = await axios.put(`http://localhost:8080/todos/${modifyId}`, { 
      title: titleRef.current.value, content: contentRef.current.value }, { headers: { Authorization: `Bearer${token}`
    }});
  };

  const createMutation = useMutation(createTodo, {
    onSuccess: () => queryClient.invalidateQueries('getTodoList')
  });

  const modifyMutation = useMutation(modifyTodo, {
    onSuccess: () => queryClient.invalidateQueries('getTodoList')
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!titleRef.current || !contentRef.current) return;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if((title === '' && content === '') || title === '') {
      alert('할일은 필수 입력 사항 입니다.')
    };

    if(modify) {
      modifyMutation.mutate();
      return;
    }
    
    createMutation.mutate();
  };

  const contentSubmit = () => {
    if(!titleRef.current || !contentRef.current) return;
    if(titleRef.current.value === '') {
      alert('할일은 필수 입력사항 입니다.')
    }

    if(modify) {
      modifyMutation.mutate();
      return;
    }

    createMutation.mutate();
  }

  return (
    <>
      <Container onClick={onClick} open={open}>
        <MdAdd />
      </Container>
      {
        (open || modify) && (
          <InsertTodoArea>
            <InsertForm onSubmit={onSubmit}>
              <input 
                ref={titleRef} 
                type='text' 
                placeholder='할일을 입력 해 주세요.' 
                autoFocus
                // value={modify}
              />
              <textarea 
                ref={contentRef}
                rows={3}
                placeholder='세부 내용을 입력하신 후 Tab key를 누르세요.'
                onBlur={contentSubmit}
              >
              </textarea>
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
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    font-size: 1rem;
    border: none;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
    border-radius: 3px;
    outline: none;
    padding: .3rem .5rem;
    width: 100%;
  }

  textarea {
    box-sizing: border-box;
    border: none;
    outline: none;
    width: 100%;
    border-radius: 3px;
    resize: none;
    padding: .5rem 1rem;
    font-size: 1rem;
  }
`