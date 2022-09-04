import MenuBar from "../../../features/MenuBar";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
};

const styles = {
  display: "flex",
  minHeight: "calc(100vh - var(--nav-height))",
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
