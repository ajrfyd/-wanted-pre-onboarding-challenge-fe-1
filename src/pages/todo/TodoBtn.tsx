import styledl, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md'

type TodoBtnProps = {
  onClick: () => void;
  open: boolean;
}

type Props = {
  open: boolean;
}

const TodoBtn = ({ onClick, open }: TodoBtnProps) => {

  return (
    <Container onClick={onClick} open={open}>
      <MdAdd />
    </Container>
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

  &:hover {
    background-color: #81ffd9;
  }

  &:active {
    background-color: #20c997;
  }

`