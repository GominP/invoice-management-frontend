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
import { useNavigate, useParams } from "react-router-dom";

import * as invoiceService from "../services/invoiceService";
import * as payerService from "../services/payerService";
import * as billerService from "../services/billerServices";
import * as paymentService from "../services/paymentService";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
  },
  header: { textAlign: "center", color: "green" },
  subHeader: { textAlign: "center", color: "grey" },
}));

export default function PaymentDetail() {
  let params = useParams();
  let navigate = useNavigate();

  const classes = useStyles();
  const billInfo = useSelector(get_info_slip_verification);
  const [billerInfo, setBillerInfo] = useState({});
  const [payerInfo, setPayerInfo] = useState({});
  const [invoiceInfo, setInvoiceInfo] = useState({});

  //   const [name, setname] = useState("testname");
  //   const [amount, setamount] = useState(2000);

  useEffect(() => {
    async function fetchData() {
      const responsePayment = await paymentService.payment_detail_inquiry({
        id: params.id,
      });
      console.log(responsePayment);

      const promise1 = invoiceService.invoice_detail_inquiry({
        id: responsePayment.invoiceId,
      });
      const promise2 = billerService.biller_detail_inquiry({
        id: responsePayment.billerId,
      });
      const promise3 = payerService.payer_detail_inquiry({
        id: responsePayment.payerId,
      });

      Promise.all([promise1, promise2, promise3]).then(function (values) {
        console.log(values[0]);
        setInvoiceInfo(values[0]);
        setBillerInfo(values[1]);
        setPayerInfo(values[2]);
      });
    }
    // console.log(billInfo);
    fetchData();
  }, []);

  const handleCheckInvoice = () => {
    navigate("/allbill/billinfo/" + invoiceInfo.id);
  };

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
                            <Typography>
                              {" "}
                              {invoiceInfo.totalAmountAddedTax}
                            </Typography>
                          </Grid>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleCheckInvoice()}>
                    Check Invoice
                  </Button>
                </CardActions>
              </Box>
            </Grid>
          </Card>
        </Grid>
      </Box>
    </div>
  );
}
