import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const a11yProps = (index) => {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
};

function TabManager({ value, onTabChange }) {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem value="all-products" {...a11yProps("all-products")} onClick={(e) => onTabChange(e,"all-products")}>
        <div>کالا‌ها</div>
      </MenuItem>
      <MenuItem value="number-in-stock" {...a11yProps("number-in-stock")} onClick={(e) => onTabChange(e,"number-in-stock")}>
        <div>موجودی و قیمت‌ها</div>
      </MenuItem>
      <MenuItem value="orders" {...a11yProps("orders")} onClick={(e) => onTabChange(e,"orders")}>
        <div>سفارش‌ها</div>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <div>
        <div className={classes.sectionDesktop}>
          <Paper elevation={3}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={onTabChange}
              aria-label="wrapped label tabs example"
            >
              <Tab
                label="کالا‌ها"
                value="all-products"
                {...a11yProps("all-products")}
              />
              <Tab
                label="موجودی و قیمت‌ها"
                value="number-in-stock"
                {...a11yProps("number-in-stock")}
              />
              <Tab label="سفارش‌ها" value="orders" {...a11yProps("orders")} />
            </Tabs>
          </Paper>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
      </div>
      {renderMobileMenu}
    </>
  );
}

export { TabManager };
