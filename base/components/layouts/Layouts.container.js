import MenuBar from "../../../features/MenuBar";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100vw",
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
