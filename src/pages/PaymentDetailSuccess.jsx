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
  Avatar,
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
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import {
  setRole,
  setId,
  setNotiCount,
  getRole,
  getUserID,
  getNotiCount,
  setInfoSlip,
  get_info_slip_verification,
} from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
  },
  header: { textAlign: "center", color: "green" },
  subHeader: { textAlign: "center", color: "grey" },
}));

export default function PaymentDetailSuccess() {
  const classes = useStyles();
  const billInfo = useSelector(get_info_slip_verification);

  const [name, setname] = useState("testname");
  const [amount, setamount] = useState(2000);

  useEffect(() => {
    console.log(billInfo);
  }, [billInfo]);

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Grid container className={classes.center}>
          <Card variant="outlined">
            <Grid>
              <Box>
                <Box className={classes.center}>
                  <CheckCircleOutlinedIcon
                    sx={{ fontSize: 50, color: "green" }}
                  />
                </Box>

                <CardHeader
                  title="Successful Payment"
                  className={classes.header}></CardHeader>
                <Box className={classes.subHeader}>
                  <Typography>{billInfo.transTime}</Typography>
                  <Typography>Ref ID: {billInfo.transRef}</Typography>
                </Box>
                <Divider />
                <CardContent>
                  {/* <CardHeader title={"ข้อมูลผู้จ่ายบิล"}/> */}
                  <Box className={classes.center}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Stack direction={"row"}>
                          <Grid item xs={6}>
                            FROM
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>{billInfo.sender.name}</Typography>
                          </Grid>
                        </Stack>
                        <Divider />
                      </Grid>

                      <Grid item xs={12}>
                        <Stack direction={"row"}>
                          <Grid item xs={6}>
                            TO
                          </Grid>
                          <Grid item xs={6}>
                            <Typography> {billInfo.receiver.name}</Typography>
                          </Grid>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction={"row"}>
                          <Grid item xs={6}></Grid>
                          <Grid item xs={6}>
                            {billInfo.receiver.proxy.type} :{" "}
                            {billInfo.receiver.proxy.value}
                          </Grid>
                        </Stack>
                        <Divider />
                      </Grid>

                      <Grid item xs={12}>
                        <Stack direction={"row"}>
                          <Grid item xs={6}>
                            AMOUNT
                          </Grid>
                          <Grid item xs={6}>
                            <Typography> {billInfo.amount}</Typography>
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
