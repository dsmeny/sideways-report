import MenuBar from "./menu/MenuBar";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  overflowX: "hidden",
};

const styles = {
  display: "flex",
  height: "calc(100vh - var(--nav-height))",
};

const Layout = (props) => {
  return (
    <div style={containerStyle}>
      <MenuBar />
      <main style={styles}>{props.children}</main>
    </div>
  );
};

export default Layout;
