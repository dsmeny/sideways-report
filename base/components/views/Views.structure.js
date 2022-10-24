const DataViewItem = ({ children, ...delegated }) => {
  return <li {...delegated}>{children}</li>;
};

const DataViewList = ({ children, ...delegated }) => {
  return (
    <ul
      style={{
        display: "flex",
        color: "var(--primary-font-color)",
        alignItems: "center",
        padding: "1rem 0",
      }}
      {...delegated}
    >
      {children}
    </ul>
  );
};

export { DataViewItem, DataViewList };
