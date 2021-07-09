import { ProductCard } from "./ProductCard";
import { Grid } from "@material-ui/core";
function ProductsList({ list }) {
  return (
      <>
      {list.map((item) => (
        <Grid item  lg={6}  key={item.id}>
            <ProductCard item={item}/>
        </Grid>
      ))}
    </>
  );
}

export { ProductsList };
