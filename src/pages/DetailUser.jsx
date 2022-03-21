import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  CardHeader,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import img2 from "../asset/images/Cat03.jpg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@mui/styles";
import ResponsiveHeader from "../component/ResponsiveHeader";
import { useEffect, useState } from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: 800,
    [theme.breakpoints.down("md")]: {
      maxWidth: 600,
    },
  },
  media: {
    height: 300,
  },
}));

export default function DetailUser() {
  const axios = require('axios');
  const theme = useTheme();
  const classes = useStyles();
  const data = {
    id: 1   
  }

  useEffect(() => {
    console.log(localStorage.getItem('token'))
  
    axios.post('http://localhost:8080/biller-detail-inquiry', data ,{
        headers: {Authorization: localStorage.getItem('token')}
      })
    .then(function (response) {
      console.log(response);
    })
    
  }, []);


  

  return (
    <div>
      <Box sx={{ p: 3 ,  }}>
        <Grid container  sx={{ display: "flex", justifyContent: "center" }}>
          <Card className={classes.root} variant="outlined"  sx={{ display: "flex", justifyContent: "center" }}>
            <Grid>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  {/* <CardHeader title={"ข้อมูลผู้จ่ายบิล"}/> */}
                  <ResponsiveHeader text="ข้อมูลผู้จ่ายบิล"></ResponsiveHeader>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Typography>ผู้ติดต่อ :</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>สิ่นชัย มั่นคง</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography>อีเมลล์ :</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>test@gmail.com</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography>เบอร์โทร :</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>0958654531</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Box>
            </Grid>

            <CardMedia
              component="img"
              //   sx={{ width: 151 }}
              image={img2}
              alt="Live from space album cover"
            />
          </Card>
        </Grid>
      </Box>
    </div>
  );
}
