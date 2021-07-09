import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Modal from "@material-ui/core/Modal";
import { Breadcrumbs, TextField } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    width: "100%",
  },
  submitBtn: {
    display: "flex",
    justifyContent: "center",
    margin: `${theme.spacing(2)}px 0`,
  },
}));

function ProductForm(props) {
  const {
    open,
    onClose,
    onFileChange,
    handleChange,
    handleSubmit,
    product,
    onProductChange,
    categories
  } = props;
  const classes = useStyles();
  const body = (
    <div className={classes.paper}>
      <h6>افزودن/ویرایش کالا</h6>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formControl} size="small">
          <label htmlFor="formFileSm" className="form-label">
            تصویر
          </label>
          <input
            className="form-control form-control-sm"
            id="formFileSm"
            type="file"
            onChange={onFileChange}
            // value={product.image}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <label style={{ margin: "5px 0" }}>نام کالا</label>
          <TextField
            variant="outlined"
            size="small"
            value={product.name}
            onChange={({ target: { value } }) => onProductChange("name", value)}
          />
        </FormControl>
        <FormControl className={classes.formControl} variant="outlined">
          <label style={{ margin: "5px 0" }}>دسته بندی</label>
          <Select
            labelId="outlined-label"
            id="demo-simple-select-outlined"
            value={product.category ? product.category.join(",") : ""}
            onChange={handleChange}
          >
            {categories.map((cat) => {
              return cat.subCats.map((subCat) => {
                return subCat.children.map((child) => {
                  return (
                    <MenuItem value={`${cat.name},${subCat.subName},${child}`}>
                      <Breadcrumbs
                        separator={<NavigateBeforeIcon fontSize="small" />}
                      >
                        <Typography color="textPrimary">{cat.name}</Typography>
                        <Typography color="textPrimary">
                          {subCat.subName}
                        </Typography>
                        <Typography color="textPrimary">{child}</Typography>
                      </Breadcrumbs>
                    </MenuItem>
                  );
                });
              });
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <label style={{ margin: "5px 0" }}>توضیحات</label>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            value={product.description}
            variant="outlined"
            onChange={({ target: { value } }) =>
              onProductChange("description", value)
            }
          />
        </FormControl>
        <div className={classes.submitBtn}>
          <Button type="submit" variant="contained" color="primary">
            ذخیره
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}

export { ProductForm };
