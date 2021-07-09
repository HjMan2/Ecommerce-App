import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { ProductForm } from "./Components/ProductForm";
import {
  getNumberInStock,
  deleteProduct,
  getCategories,
  editProduct,
} from "../../../../../services/ordersService";
import { TableData } from "../../../../../common/Components/Table";
import { Paginate } from "../../../../../common/Components/Paginate";
import { Breadcrumbs, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { toast } from "react-toastify";

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
  const [product, setProduct] = useState("");
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState({
    image: "",
    name: "",
    category: [],
    price: 100000,
    numberInStock: 10,
    description: "",
  });
  const search = useLocation().search;
  const pageNumber = new URLSearchParams(search).get("page");
  const mapToViewModel = () => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      numberInStock: product.numberInStock,
      category: [product.category, ...product.pathName.split(",")],
      description: product.description,
    };
  };

  const initialState = () => {
    return {
      image: "",
      name: "",
      category: [],
      price: 100000,
      numberInStock: 10,
      description: "",
    };
  };

  useEffect(() => {
    getNumberInStock(pageNumber).then((response) => {
      setResult(response.data);
      setResponseLength(+response.headers["x-total-count"]);
    });
    getCategories().then((response) => setCategories(response));
    if (product) setState({ ...mapToViewModel() });
    else setState({ ...initialState() });
  }, [pageNumber, product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = editProduct(state)
    if(Boolean(result)) {
      setState(initialState());
      handleClose()
      setTimeout(() => window.location.reload(), 500)
    }
  };

  const onProductChange = (key, value) => {
    setState({ ...state, [key]: value });
  };

  const handleChange = (e) => {
    const category = e.target.value.split(",");
    setState({ ...state, category });
  };

  const onFileChange = (e) => {
    setState({ ...state, image: e.target.files[0] });
  };

  const handleOpen = (item) => {
    if (item) setProduct({ ...item });
    else setProduct("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hanldeDelete = async (item) => {
    const { id } = item;
    const oldResult = [...result];
    const newResult = oldResult.filter((item) => item.id !== id);
    setResult(newResult);
    try {
      await deleteProduct(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("این محصول قبلا حدف شده است.");
        setResult(oldResult);
      }
    }
  };

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
          <Typography color="textPrimary">{items["category"]}</Typography>
          {items["pathName"].split(",").map((item) => (
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
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "5px" }}
            onClick={() => handleOpen(item)}
          >
            ویرایش
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => hanldeDelete(item)}
          >
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
        <Button
          className={classes.saveBtn}
          variant="contained"
          size="medium"
          onClick={() => handleOpen(null)}
        >
          افزودن کالا
        </Button>
      </div>
      <TableData columns={columns} data={result} />
      <Paginate count={Math.ceil(responseLength / 5)} path="admin-dashboard"/>
      <ProductForm
        open={open}
        onClose={handleClose}
        product={state}
        onFileChange={onFileChange}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onProductChange={onProductChange}
        categories={categories}
      />
    </>
  );
}

export { AllProducts };
