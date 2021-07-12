import { Link, useHistory } from "react-router-dom";
import { TableData } from "../../../common/Components/Table";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  parent: {
    margin: `${theme.spacing(2)}px 0`,
    display: "flex",
    flexDirection: "column"
  },
  btn: {
    backgroundColor: "#198754",
    color: "white",
    alignSelf: "flex-end",
    "&:hover": {
      backgroundColor: "#197054",
    },
  },
}));

function Cart() {
  const classes = useStyles();
  const history = useHistory()

  const handleClick = () => {
      history.push('/shipping')
  }

  const columns = [
    {
      details: (item) => <Link to={`/product/${item.id}`}>{item.name}</Link>,
      key: "name",
      label: "کالا",
    },
    {
      path: "price",
      label: "قیمت",
    },
    {
      path: "numberOfDemand",
      label: "تعداد",
    },
    {
      details: (item) => (
        <>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "5px" }}
          >
            افزودن
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
    <div className={classes.parent}>
      <h4>سبد خرید</h4>
      {/* <TableData /> */}
      <Button className={classes.btn} variant="contained" onClick={handleClick}>
        نهایی کردن سبد خرید
      </Button>
    </div>
  );
}

export { Cart };
