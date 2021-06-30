import PropTypes from "prop-types";

const TabPanel = ({ children, index, value, ...rest }) => {
  return (
    <div
      role="tabpanel"
      hidden={index !== value}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...rest}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export { TabPanel };
