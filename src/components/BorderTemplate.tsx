import styled, { css } from 'styled-components';

type BorderTemplateProps = {
  children: React.ReactNode;
  width: number;
  height?: number;
}

type ContainerProps = {
  width: number;
}

const BorderTemplate = ({ children, width }: BorderTemplateProps) => {

  return (
    <Container width={width}>
      { children }
    </Container>
  )
}

export default BorderTemplate;

const Container = styled.div<ContainerProps>`
  /* width: 60%; */
  height: 70vh;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
  position: relative;
  ${({ width }) => width && css`
    width: ${width}%;
  `}
`