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
import ResponsiveHeader from "../component/ResponsiveHeader";
import { useNavigate } from "react-router-dom";
import img from "../asset/images/contemplative-reptile.jpg";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 10,
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
    // height: 140,
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
const Payer = () => {
  let navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
      <ResponsiveHeader text="ผู้จ่ายใบแจ้งหนีัทั้งหมด"></ResponsiveHeader>
      <Box sx={{ px: 5 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 6 }}
          columns={{ xs: 2, sm: 8, md: 12, xl: 20 }}>
          {data.map((info, index) => (
            <Grid item xs={2} sm={4} md={4} xl={4} key={index}>
              <Card className={classes.card}>
                <CardActionArea onClick={() => navigate("/detailUser")}>
                  <CardMedia
                    className={classes.media}
                    title="Contemplative Reptile"
                    component="img"
                    height="140"
                    image={img}
                    alt="green iguana"
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
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate("/detailUser/1")}>
                    รายละเอียด
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate("bill")}>
                    สร้างบิล
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
      </Box>
    </div>
  );
};

export default Payer;
