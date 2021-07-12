import { useRef, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import Joi from "joi-browser";
import { DatePicker } from "jalali-react-datepicker";

const useStyles = makeStyles((theme) => ({
  parent: {
    margin: `${theme.spacing(2)}px 0`,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    "& > div": {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2),
    },
    [theme.breakpoints.up("lg")]: {
      gap: theme.spacing(2),
      "& > div": {
        flexDirection: "row",
        gap: 0,
        alignItems: "center",
        "& div:first-child": {
          width: "400px",
        },
        "& > label": {
          display: "block",
          width: "100px",
          padding: "0 10px",
        },
      },
    },
  },
  btn: {
    backgroundColor: "#198754",
    color: "white",
    justifySelf: "center",
    [theme.breakpoints.up("lg")]: {
      width: "200px",
      alignSelf: "center",
    },
    "&:hover": {
      backgroundColor: "#197054",
    },
  },
}));

const MainSchema = {
  name: Joi.string().required().min(3).label("Name"),
  lName: Joi.string().required().min(3).label("Last name"),
  deliverTime: Joi.number().required().label("Deliver Time"),
  address: Joi.string().required().min(10).label("Address"),
  phone: Joi.number().required().label("Phone"),
};

function Shipping(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    name: "",
    lName: "",
    deliverTime: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false);
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(state, MainSchema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: MainSchema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleClick = () => {
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    setRedirect(true);
  };

  const handleChange = (input, key) => {
    const Errors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) Errors[input.name] = errorMessage;
    else delete Errors[input.name];

    const newState = { ...state };
    newState[input.name] = input.value;

    setState(newState);
    setErrors(Errors);
    setState({ ...state, [key]: input.value });
  };

  const renderRedirect = () => {
    if (redirect) return <Redirect to="/" />;
  };

  const handleDateClick = ({ value }) => {
    console.log(value._d)
    const time = new Date(value._d).getTime()
    if(time > Date.now()) setState({...state, deliverTime: time})
  };

  return (
    <>
      {/* {renderRedirect()} */}
      <div className={classes.parent}>
        <h4 className={classes.title}>نهایی کردن خرید</h4>
        <form className={classes.form}>
          <div>
            <label>نام</label>
            <TextField
              onChange={(e) => handleChange(e.currentTarget, "name")}
              variant="outlined"
              size="small"
              name="name"
              error={Boolean(errors["name"]) || false}
              helperText={errors["name"]}
            ></TextField>
            <div className={classes.gorw}></div>
            <label>نام خانوادگی</label>
            <TextField
              onChange={(e) => handleChange(e.currentTarget, "lName")}
              variant="outlined"
              size="small"
              name="lName"
              error={Boolean(errors["lName"]) || false}
              helperText={errors["lName"]}
            ></TextField>
          </div>
          <div>
            <label>آدرس</label>
            <TextField
              onChange={(e) => handleChange(e.currentTarget, "address")}
              variant="outlined"
              size="small"
              multiline
              rows={4}
              name="address"
              error={Boolean(errors["address"]) || false}
              helperText={errors["address"]}
            ></TextField>
            <label>تلفن همراه</label>
            <TextField
              onChange={(e) => handleChange(e.currentTarget, "phone")}
              variant="outlined"
              size="small"
              name="phone"
              error={Boolean(errors["phone"]) || false}
              helperText={errors["phone"]}
            ></TextField>
          </div>
          <div>
            <label>تاریخ تحویل</label>
            <DatePicker onClickSubmitButton={handleDateClick}/>
          </div>
          <Button
            variant="contained"
            className={classes.btn}
            onClick={handleClick}
            disabled={Boolean(validate())}
          >
            پرداخت
          </Button>
        </form>
      </div>
    </>
  );
}

export { Shipping };
