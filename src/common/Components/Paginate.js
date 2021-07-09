import { Route } from "react-router";
import { Link, useParams, useLocation } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pagination: {
    direction: "ltr",
    display: "flex",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    justifyContent: "center",
  },
}));

function Paginate({ count,path }) {
  const classes = useStyles();
  const { activeTab } = useParams();
  const { search } = useLocation();
  const status = new URLSearchParams(search).get("status");
  return (
    <div className={classes.pagination}>
      <Route>
        {({ location }) => {
          const query = new URLSearchParams(location.search);
          const page = parseInt(query.get("page") || "1", 10);
          const searchQuery = status ? `?status=${status}` : `?`;
          const formatActiveTab = activeTab ? `/${activeTab}`: null
          return (
            <Pagination
              page={page}
              count={count}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/${path}${formatActiveTab|| ""}${searchQuery}${
                    item.page === 1
                      ? ""
                      : `${status ? "&" : ""}page=${
                          item.page
                        }`
                  }`}
                  {...item}
                />
              )}
            />
          );
        }}
      </Route>
    </div>
  );
}

export { Paginate };
