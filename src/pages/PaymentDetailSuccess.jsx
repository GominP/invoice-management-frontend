import React from "react";
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
  CardActionArea,
  Button,
  CardActions,
  Divider,
  Stack,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import img2 from "../asset/images/Cat03.jpg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@mui/styles";
import ResponsiveHeader from "../component/ResponsiveHeader";
import { useEffect, useState } from "react";
import ResponsiveDialog from "../component/ResponsiveDialog";
const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function PaymentDetailSuccess() {
  const classes = useStyles();
  const [name, setname] = useState("testname");
  const [amount, setamount] = useState(2000);

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Grid container className={classes.center}>
          <Card variant="outlined">
            <Grid>
              <Box>
                <CardHeader title="ข้อมูลการจ่ายเงิน"></CardHeader>
                <Divider />
                <CardContent>
                  {/* <CardHeader title={"ข้อมูลผู้จ่ายบิล"}/> */}
                  <Box className={classes.center}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h5" component="h4"> จ่ายเงินให้ {name}</Typography>
                        <Typography variant="h5" component="h4"> {amount} บาท</Typography>
                        <Divider />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Stack direction={"row"}>
                          <Grid item xs={6}>
                            ช่องทางการชำระเงิน
                          </Grid>
                          <Grid item xs={6}>
                            SCB
                          </Grid>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction={"row"}>
                          <Grid item xs={6}>
                            วันที่ทำรายการ
                          </Grid>
                          <Grid item xs={6}>
                            22/10/2022
                          </Grid>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction={"row"}>
                          <Grid item xs={6}>
                            หมายเลขการสั่งซื้อ
                          </Grid>
                          <Grid item xs={6}>
                            202221231425867623
                          </Grid>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <CardActions></CardActions>
              </Box>
            </Grid>

            {/* <CardMedia
          component="img"
          //   sx={{ width: 151 }}
          image={img2}
          alt="Live from space album cover"
        /> */}
          </Card>
        </Grid>
      </Box>
    </div>
  );
}
