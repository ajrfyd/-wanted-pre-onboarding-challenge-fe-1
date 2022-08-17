import styled, { css } from "styled-components";
import { MdDone, MdDelete } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { modifyToggle } from '../../store/todo/actions';

type TodoItemProps = {
  done: boolean;
  title: string;
  content?: string;
  id: string;
  onClick: () => void;
  doneTodoHandler: () => void;
}

type Props = {
  done: boolean;
}

const TodoItem = ({ id, done, title, content, onClick, doneTodoHandler }: TodoItemProps) => {
  const [detail, setDetail] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
    
    <Container>
      <CheckBtn done={done} onClick={doneTodoHandler}>
        { 
          done && <MdDone/>
        }
      </CheckBtn>
      <Text done={done} onClick={() => setDetail(prev => !prev)}>
        { title }
      </Text>
      <ModifyBtn onClick={() => dispatch(modifyToggle(id))}>
        <BsPencilSquare />
      </ModifyBtn>
      <DeleteBtn onClick={onClick}>
        <MdDelete />
      </DeleteBtn>
    </Container>
      {
        detail && <Detail>{content}</Detail>
      }
    </>
  )
}

export default TodoItem;

const DeleteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eee;
  font-size: 1.5rem;
  cursor: pointer;
  transition: .2s;
  opacity: 0;
  margin-left: 1rem;

  &:hover {
    color: red;
  }
`

const ModifyBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eee;
  font-size: 1.5rem;
  cursor: pointer;
  transition: .2s;
  opacity: 0;

  &:hover {
    color: #6fb56f;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: .8rem 0;

  &:hover {
    ${DeleteBtn} {
      opacity: 1;
    }
    ${ModifyBtn} {
      opacity: 1;
    }
  }

`


const CheckBtn = styled.div<Props>`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  border: 1px solid #ced4da;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.2rem;
  cursor: pointer;

  ${({ done }) => done && css`
    border: 1px solid #38d9a9;
    color: #38d9a9;
  `}
`

const Text = styled.div<Props>`
  flex: 1;
  font-size: 1.5rem;
  color: #888;
  ${({ done }) => done && css`
    color: #ced4da;
    text-decoration: line-through;
  `}

  cursor: pointer;
`

const Detail = styled.p`
  font-size: 1rem;
  padding-left: 4rem;
`
