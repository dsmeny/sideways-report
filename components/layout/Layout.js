import MenuBar from "./menu/MenuBar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 2rem;
`;

const Main = styled.main`
  height: 92rem;
`;

const Layout = (props) => {
  return (
    <Container>
      <MenuBar />
      <Main>{props.children}</Main>
    </Container>
  );
};

export default Layout;
