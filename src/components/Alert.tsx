import styled from "styled-components";

type AlertProps = {
  message: string;
}

const Alert = ({ message }: AlertProps) => {

  return (
    <Container>
      Hello Alert??
    </Container>
  )
}

export default Alert;

const Container = styled.div`
  
`