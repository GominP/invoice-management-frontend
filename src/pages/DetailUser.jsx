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
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import img2 from "../asset/images/Cat03.jpg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@mui/styles";

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
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Grid container>
          <Card className={classes.root}>
            <Grid>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
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
