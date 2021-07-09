import { Fragment } from "react";
import { ProductCard } from "../../../../common/Components/ProductCard";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

function AdminSpecialProducts(props) {
  const { categories, products } = props;
  return (
    <>
      {categories.map((cat) => {
        return cat.subCats.map((subCat, index) => {
          const filteredList = products.filter((item) => {
            return item.pathName.split(",")[0] === subCat.subName;
          });
          return (
            <Fragment key={cat.id + subCat.subName + index}>
              <Grid item xs={12}>
                <Link to={`/search/${subCat.subName}`}>{subCat.subName}</Link>
              </Grid>
              {filteredList.map((item, index) => {
                return index < 6 ? (
                  <Grid item lg={4} xs={12} key={item.id}>
                    <ProductCard item={item} />
                  </Grid>
                ) : null;
              })}
            </Fragment>
          );
        });
      })}
    </>
  );
}

export { AdminSpecialProducts };
