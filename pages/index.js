import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import data from "@/utils/data";
// import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <Layout title="Home">
      <div className="grid mt-20 grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          data.products.map((product) => (
            <ProductItem product={product} key={product.slug} />
          ))
        }
      </div>

      {/* <Grid container spacing={3}>
        {
          data.products.map((product) => (
            <Grid item md={4} key={product.slug}>
              <Card>
                <CardActionArea>
                  <CardMedia component="img" image={product.image} title={product.image}>
                  </CardMedia>
                  <CardContent>
                    <Typography>
                      {product.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="small" color="primary">Add to cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid> */}
    </Layout>
  )
}
