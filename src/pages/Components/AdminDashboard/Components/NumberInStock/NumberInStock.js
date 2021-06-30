import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { getNumberInStock } from "../../../../../services/ordersService";
import { TableData } from "../../../../../common/Components/Table";
import { Paginate } from "../../../../../common/Components/Paginate";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  direction: {
    direction: "ltr",
    "& input": {
      textAlign: "center",
    },
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: "1rem",
    justifyContent: "center",
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.875rem",
    },
  },
  saveBtn: {
    width: "100%",
    color: "white",
    backgroundColor: "#198754",
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#229060",
    },
    [theme.breakpoints.up("lg")]: {
      width: "auto",
      marginBottom: "0",
    },
  },
}));

function NumberInStock() {
  const classes = useStyles();
  const [result, setResult] = useState([]);
  const [responseLength, setResponseLength] = useState(5);
  const search = useLocation().search;
  const pageNumber = new URLSearchParams(search).get("page");

  useEffect(() => {
    getNumberInStock(pageNumber).then((response) => {
      setResult(response.data);
      setResponseLength(+response.headers["x-total-count"]);
    });
  }, [pageNumber]);

  const handleClick = (e) => {};

  const columns = [
    {
      path: "name",
      label: "نام",
    },
    {
      details: (item) => (
        <TextField className={classes.direction} value={item["price"]} />
      ),
      key: "price",
      label: "قیمت",
    },
    {
      details: (item) => (
        <TextField
          className={classes.direction}
          onClick={handleClick}
          value={item["numberInStock"]}
        />
      ),
      key: "numberInStock",
      label: "موجودی",
    },
  ];
  return (
    <>
      <div className={classes.header}>
        <h2 className={classes.title}>مدیریت موجودی و قیمت‌ها</h2>
        <Button className={classes.saveBtn} variant="contained" size="medium">
          ذخیره
        </Button>
      </div>
      <TableData columns={columns} data={result} />
      <Paginate count={Math.ceil(responseLength / 5)} />
    </>
  );
}

export { NumberInStock };
