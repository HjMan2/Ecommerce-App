import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import {
  getNumberInStock,
  updateNumberInStock,
} from "../../../../../services/ordersService";
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
  const [state, setState] = useState([]);
  const [responseLength, setResponseLength] = useState(5);
  const [changedItems, setChangedItems] = useState([]);
  const search = useLocation().search;
  const pageNumber = new URLSearchParams(search).get("page");

  useEffect(() => {
    getNumberInStock(pageNumber).then((response) => {
      setState(response.data);
      setResponseLength(+response.headers["x-total-count"]);
    });
  }, [pageNumber]);

  const mapNewStateToState = (item, id, key, newValue) => {
    const newItem = { ...item, [key]: newValue };
    const index = state.findIndex((item) => item.id === id);
    const newState = [...state];
    newState[index] = newItem;
    setState(newState);
    return newState;
  };

  const handleKeyPress = (e, key, item) => {
    if (e.key === "Escape") {
      const id = item.id;
      const index = changedItems.findIndex((item) => item.id === id);
      if (index > -1) {
        const defaultItem = changedItems.filter((item) => item.id === id);
        const newState = mapNewStateToState(item, id, key, defaultItem[0][key]);
        const newItem = newState.filter((item) => item.id === id);
        const isEqual =
          Object.entries(defaultItem[0]).toString() ===
          Object.entries(newItem[0]).toString();
        if (isEqual) {
          const newChangedItems = changedItems.filter((item) => item.id !== id);
          setChangedItems(newChangedItems);
        }
      }
      e.target.blur();
    }
  };

  const handleChange = (e, key, item) => {
    const { target : { value }} = e;
    const id = item.id;
    const oldItems = changedItems.filter((item) => item.id === id);
    if (oldItems.length === 0) {
      setChangedItems([...changedItems, item]);
    }
    mapNewStateToState(item, id, key, value);
  };

  const handleClick = () => {
    const changedItemsIds = changedItems.map((item) => item.id);
    const finalItems = changedItemsIds.map((id) => {
      return state.filter((item) => item.id === id)[0];
    });
    updateNumberInStock(finalItems);
    setChangedItems([]);
  };

  const columns = [
    {
      path: "name",
      label: "نام",
    },
    {
      details: (item) => (
        <TextField
          onChange={(e) => handleChange(e, "price", item)}
          className={classes.direction}
          value={item["price"]}
          onKeyDown={(e) => handleKeyPress(e, "price", item)}
        />
      ),
      key: "price",
      label: "قیمت",
    },
    {
      details: (item) => (
        <TextField
          className={classes.direction}
          onChange={(e) =>
            handleChange(e, "numberInStock", item)
          }
          value={item["numberInStock"]}
          onKeyDown={(e) => handleKeyPress(e, "numberInStock", item)}
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
        <Button
          disabled={Boolean(!changedItems.length)}
          onClick={handleClick}
          className={classes.saveBtn}
          variant="contained"
          size="medium"
        >
          ذخیره
        </Button>
      </div>
      <TableData columns={columns} data={state} />
      <Paginate count={Math.ceil(responseLength / 5)} path="admin-dashboard"/>
    </>
  );
}

export { NumberInStock };
