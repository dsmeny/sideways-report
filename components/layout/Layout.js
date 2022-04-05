import MenuBar from "./menu/MenuBar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const styles = {
  display: "flex",
  justifyContent: "space-between",
  height: "calc(100vh - var(--nav-height))",
};

const Layout = (props) => {
  return (
    <Container>
      <MenuBar />
      <main style={styles}>{props.children}</main>
    </Container>
  );
};

export default Layout;
