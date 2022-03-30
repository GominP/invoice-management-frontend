import React, { useEffect, useState } from "react";
import ResponsiveHeader from "../component/ResponsiveHeader";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Grid,
  Divider,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material/";

import { gridSpacing } from "../store/constant";
import MainCard from "../component/MainCard";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ResponsiveDialog from "../component/ResponsiveDialog";
import {
  setRole,
  setId,
  setNotiCount,
  getRole,
  getUserID,
  getNotiCount,
} from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import * as invoiceService from "../services/invoiceService";
import { useNavigate, useParams } from "react-router-dom";
import * as payerService from "../services/payerService";
import * as billerService from "../services/billerServices";
import * as paymentService from "../services/paymentService";
import * as notificationService from "../services/notificationService";

export default function BillInfo() {
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector(getRole);
  const userId = useSelector(getUserID);
  const [isPayerBill, setIsPayerBill] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [total, setTotal] = useState();
  const [invoiceInfo, setInvoiceInfo] = useState({});
  const [billerInfo, setBillerInfo] = useState({});
  const [payerInfo, setpayerInfo] = useState({});
  const [allProduct, setAllProduct] = useState([]);

  const [infoQrcode, setInfoQrcode] = useState({});

  const TAX_RATE = 0.07;

  const invoiceSubtotal = subtotal(rowData);
  const invoiceTaxes = TAX_RATE * total;
  const invoiceTotal = invoiceTaxes + total;

  function subtotal(items) {
    return items.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
  }

  function currencyFormat(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function formatDate(date) {
    return new Date(date).toLocaleDateString("fr");
  }

  useEffect(() => {
    if (role === "payer") {
      setIsPayerBill(true);
    }
    callApi();
  }, []);

  const callApi = async () => {
    await invoiceService
      .invoice_detail_inquiry({ id: params.id })
      .then(async function (response) {
        console.log(response);
        setInvoiceInfo(response);
        setAllProduct(response["lists"]);
        setTotal(response["totalAmount"]);

        await payerService
          .payer_detail_inquiry({ id: response["payerId"] })
          .then(function (response) {
            setpayerInfo(response);
          });

        await billerService
          .biller_detail_inquiry({ id: response["billerId"] })
          .then(function (response) {
            setBillerInfo(response);
          });

        if (role === "payer") {
          console.log("true Payer");
          await paymentService
            .payment_qrcode_create({ invoiceId: response["id"] })
            .then(function (response) {
              setInfoQrcode(response);
            });
        }
      });
  };

  const handleEdit = () => {
    navigate("/allbill/editBill/" + invoiceInfo.id + "/" + invoiceInfo.payerId);
  };

  const handleCancelInvoice = async () => {
    let data = {
      id: invoiceInfo.id,
      status: "cancelled",
    };
    console.log(data);
    invoiceService.invoice_status_update(data);
    const noti = await notificationService.notification_unread_count_inquiry({
      payerId: userId,
    });
    dispatch(setNotiCount(noti["unreadCount"]));
    navigate("/allbill");
  };
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <MainCard>
              <Stack direction={{ xs: "column", sm: "row" }} margin={"auto"}>
                <ResponsiveHeader text="Invoice Check" />
                <Button
                  variant="outlined"
                  color={
                    invoiceInfo.status === "cancelled"
                      ? "error"
                      : invoiceInfo.status === "overdue"
                      ? "warning"
                      : invoiceInfo.status === "paid"
                      ? "success"
                      : "primary"
                  }>
                  {invoiceInfo.status}
                </Button>
              </Stack>

              <Box padding={5} margin={"auto"}>
                <Stack direction={{ xs: "column", sm: "row" }}>
                  <Grid spacing={gridSpacing}>
                    <Grid item xs={12}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                          <Grid pt={3}>
                            <Typography variant="h5" sx={{ color: "purple" }}>
                              Customer
                            </Typography>
                            <Box>
                              {payerInfo.name} {payerInfo.lastname}
                            </Box>
                            <Box>
                              {payerInfo.addressDetail} {payerInfo.road}
                              {payerInfo.subDistrict} {payerInfo.district}
                              {payerInfo.province} {payerInfo.zipCode}
                            </Box>
                            Tax ID {payerInfo.taxId}
                          </Grid>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                          <Grid pt={3}>
                            <Typography sx={{ color: "purple" }} variant="h5">
                              Original Invoice
                            </Typography>
                            <Divider />
                            <Box>
                              <Grid container>
                                <Grid item xs={4} md={3}>
                                  <Typography>Bill ID</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>{invoiceInfo.id}</Typography>
                                </Grid>
                                <Grid item xs={4} md={3}>
                                  <Typography>Date</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>
                                    {formatDate(invoiceInfo.createdAt)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4} md={3}>
                                  <Typography>Expired Date</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>
                                    {formatDate(invoiceInfo.dueDate)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4} md={3}>
                                  <Typography>Biller</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>
                                    {billerInfo.name} {billerInfo.lastname}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4} md={3}>
                                  <Typography>Phone</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>{billerInfo.phone}</Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={12} lg={12}>
                          <TableContainer>
                            <Table aria-label="spanning table">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Product</TableCell>
                                  <TableCell align="right">quantity</TableCell>
                                  <TableCell align="right">
                                    price unit
                                  </TableCell>
                                  <TableCell align="right">total</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {allProduct.map((row) => (
                                  <TableRow key={row.description}>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell align="right">
                                      {row.quantity}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.unitPrice}
                                    </TableCell>
                                    <TableCell align="right">
                                      {currencyFormat(
                                        row.unitPrice * row.quantity
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}

                                <TableRow>
                                  <TableCell rowSpan={3} />
                                  <TableCell colSpan={2}>Subtotal</TableCell>
                                  <TableCell align="right">
                                    {currencyFormat(invoiceSubtotal)}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Tax </TableCell>
                                  <TableCell align="right">{`${(
                                    TAX_RATE * 100
                                  ).toFixed(0)} %`}</TableCell>
                                  <TableCell align="right">
                                    {currencyFormat(invoiceTaxes)}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell colSpan={2}>Total</TableCell>
                                  <TableCell align="right">
                                    {currencyFormat(invoiceTotal)}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Stack>
              </Box>
              {isPayerBill &&
              invoiceInfo.status !== "paid" &&
              invoiceInfo.status !== "correctionRequested" &&
              invoiceInfo.status !== "cancelled" ? (
                <Grid>
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                      md: "column",
                    }}
                    spacing={1}>
                    <ResponsiveDialog
                      invoiceInfo={invoiceInfo}
                      billerInfo={billerInfo}
                      qrcode={infoQrcode}
                      textButton="Paid"
                      requestEdit={false}></ResponsiveDialog>
                    <ResponsiveDialog
                      invoiceInfo={invoiceInfo}
                      // onClick={handleRequest}
                      textButton="Request Edit "
                      requestEdit={true}></ResponsiveDialog>
                  </Stack>
                </Grid>
              ) : isPayerBill === false &&
                invoiceInfo.status === "correctionRequested" ? (
                <Box>
                  <Grid>
                    <Stack
                      direction={{
                        xs: "column",
                        sm: "row",
                        md: "column",
                      }}
                      spacing={1}>
                      <Button variant="outlined" onClick={handleEdit}>
                        {" "}
                        Edit
                      </Button>
                    </Stack>
                  </Grid>
                </Box>
              ) : isPayerBill === false &&
                invoiceInfo.status === "processing" ? (
                <Box>
                  <Grid>
                    <Stack
                      direction={{
                        xs: "column",
                        sm: "row",
                        md: "column",
                      }}
                      spacing={1}>
                      <ResponsiveDialog
                        color="error"
                        invoiceInfo={invoiceInfo}
                        // onClick={handleRequest}
                        onClick={handleCancelInvoice}
                        cancelInvoice={true}
                        textButton="Abandoned Invoice"
                        requestEdit={true}></ResponsiveDialog>
                    </Stack>
                  </Grid>
                </Box>
              ) : null}
            </MainCard>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
