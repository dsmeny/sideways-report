import MenuBar from "../../../features/MenuBar";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  maxWidth: "var(--desktop)",
  margin: "0 auto",
};

const Layout = (props) => {
  return (
    <div style={containerStyle}>
      <MenuBar />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
