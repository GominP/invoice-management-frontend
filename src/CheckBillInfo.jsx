import {
  Box,
  Typography,
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { experimentalStyled as styled } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",

    maxWidth: 345,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 300,
    },
    [theme.breakpoints.up("xl")]: {
        maxWidth: 400,
      },
  },
  media: {
    height: 140,
    // [theme.breakpoints.down("sm")]: {
    //     height: 70,
    //   },
  },
}));

const data = [
  {
    name: "name",
    describe:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    value: 1,
    label: "วันที่",
  },
  {
    name: "calories",
    describe:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    value: 2,
    label: "เลขที่ใบแจ้งหนี้",
  },
  {
    name: "fat",
    describe:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    value: 3,
    label: "ชื่อลูกค้า",
  },
  {
    name: "carbs",
    describe:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    value: 4,
    label: "วันครบกำหนด",
  },
  {
    name: "protein",
    describe:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    value: 5,
    label: "ยอดรวมสุทธิ",
  },
];
const CheckBillInfo = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 ,xl:20 }}>
        {data.map((info, index) => (
          <Grid item xs={2} sm={4} md={4} xl={4} key={index}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {info.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p">
                    {info.describe}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* <Box>
        <Typography>CheckBillInfo</Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 600,
              height: 600,
            },
          }}>

          <Paper elevation={2} />
        </Box>
      </Box> */}
    </div>
  );
};

export default CheckBillInfo;
