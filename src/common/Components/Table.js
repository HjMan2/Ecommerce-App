import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  theadCell: {
    fontSize: "1rem",
    fontWeight: "600",
  },
});

const formatDate = (date) => {
  return new Date(+date).toLocaleDateString("fa-IR");
};

const createKey = (item, column) => {
  return item.id + (column.path || column.key);
};
const renderCell = (item, column) => {
  if (column.key) return column.details(item);
  if (column.path === "timeStamp") return formatDate(item[column.path]);
  return item[column.path];
};

function TableData({ columns, data, maxHeight }) {
  const classes = useStyles(maxHeight);

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: maxHeight ? "250px" : "initial" }}
    >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((item) => {
              return (
                <TableCell
                  className={classes.theadCell}
                  key={item.label}
                  align="right"
                >
                  {item.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column) => {
                return (
                  <TableCell align="right" key={createKey(item, column)}>
                    {renderCell(item, column)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { TableData };
