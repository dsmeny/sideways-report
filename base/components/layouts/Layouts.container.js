import MenuBar from "../../../features/MenuBar";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const styles = {
  display: "flex",
  height: "calc(100vh - var(--nav-height))",
  background: "var(--background-color)",
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
