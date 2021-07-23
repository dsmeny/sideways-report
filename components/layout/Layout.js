import MenuBar from "./menu/MenuBar";
const Layout = (props) => {
  return (
    <div>
      <MenuBar />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
