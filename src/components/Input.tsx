import styled from "styled-components";

type InputProps = {
  type: string;
  placeholder?: string;
}

const Input = ({ type, placeholder }: InputProps) => {
  return <InputBox type={type} placeholder={placeholder}/> 
}

export default Input;

const InputBox = styled.input`
  font-size: 1rem;
  border: none;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
  border-radius: 3px;
  outline: none;
  padding: .3rem .5rem;
`