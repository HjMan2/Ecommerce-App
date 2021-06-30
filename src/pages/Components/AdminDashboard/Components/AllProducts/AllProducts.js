import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { getNumberInStock } from "../../../../../services/ordersService";
import { TableData } from "../../../../../common/Components/Table";
import { Paginate } from "../../../../../common/Components/Paginate";
import { Breadcrumbs, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles((theme) => ({
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
  img: {
    width: "3.75rem",
    height: "3.75rem",
  },
}));

function AllProducts() {
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

  const columns = [
    {
      details: (item) => (
        <img src={item["image"]} alt={item["name"]} className={classes.img} />
      ),
      key: "image",
      label: "تصویر",
    },
    {
      path: "name",
      label: "نام",
    },
    {
      details: (items) => (
        <Breadcrumbs
          separator={<NavigateBeforeIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {items["pathName"].map((item) => (
            <Typography color="textPrimary" key={item}>
              {item}
            </Typography>
          ))}
        </Breadcrumbs>
      ),
      key: "category",
      label: "دسته بندی",
    },
    {
      details: (item) => (
        <>
          <Button variant="contained" color="primary" style={{marginLeft: "5px"}}>
            ویرایش
          </Button>
          <Button variant="contained" color="secondary">
            حذف
          </Button>
        </>
      ),
      key: "edit",
      label: "تغییرات",
    },
  ];
  return (
    <>
      <div className={classes.header}>
        <h2 className={classes.title}>مدیریت کالا‌ها</h2>
        <Button className={classes.saveBtn} variant="contained" size="medium">
          افزودن کالا
        </Button>
      </div>
      <TableData columns={columns} data={result} />
      <Paginate count={Math.ceil(responseLength / 5)} />
    </>
  );
}

export { AllProducts };
