const TableRow = (props) => {
  return (
    <tr>
      {props.tableHeaders.map((header) => (
        <th>{header}</th>
      ))}
    </tr>
  );
};

export default TableRow;
