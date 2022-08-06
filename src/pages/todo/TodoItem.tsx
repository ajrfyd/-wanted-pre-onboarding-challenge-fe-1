import styled, { css } from "styled-components";
import { MdDone, MdDelete } from 'react-icons/md';

type TodoItemProps = {
  done: boolean;
  text: string;
}

type Props = {
  done: boolean;
}

const TodoItem = ({ done, text }: TodoItemProps) => {

  return (
    <Container>
      <CheckBtn done={done}>
        { 
          done && <MdDone/>
        }
      </CheckBtn>
      <Text done={done}>
        { text }
      </Text>
      <DeleteBtn>
        <MdDelete />
      </DeleteBtn>
    </Container>
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

  &:hover {
    color: red;
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
  font-size: 1rem;
  color: #888;
  ${({ done }) => done && css`
    color: #ced4da;
  `}
`
