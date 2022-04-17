import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
  Stack,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardContent,
  Card,
  CardHeader,
  Tooltip,
  IconButton,
  Avatar,
} from "@mui/material";
import MainCard from "../component/MainCard";
import { gridSpacing } from "../store/constant";
import ResponsiveHeader from "../component/ResponsiveHeader";
import { useEffect, useState } from "react";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import DateAdapterDateFns from "@mui/lab/AdapterDateFns";
import DateAdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import { set } from "date-fns";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import {
  setRole,
  setId,
  setNotiCount,
  getRole,
  getUserID,
  getNotiCount,
} from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import * as billerService from "../services/billerServices";
import * as payerService from "../services/payerService";
import * as invoiceService from "../services/invoiceService";
import * as notificationService from "../services/notificationService";
import ResponsiveSnackbar from "../component/ResponsiveSnackbar";
import { LoadingButton } from "@mui/lab";
import { green } from "@mui/material/colors";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const useStyles = makeStyles((theme) => ({
  th: {
    backgroundColor: "#48A0AC",
  },
  form: {
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: 250,
    },
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  header_create: {
    display: "flex",
    justifyContent: "space-between",
    padding: 5,
  },
}));

export default function EditBill() {
  const classes = useStyles();
  let params = useParams();
  let navigate = useNavigate();

  const role = useSelector(getRole);
  const userId = useSelector(getUserID);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [total, setTotal] = useState(400);
  const today = new Date().toLocaleString().split(" ")[0];
  const [value, setValue] = useState(new Date());
  const [allProduct, setAllProduct] = useState([]);
  const [unit, setUnit] = useState();
  const [dataCustomerInfo, setDataCustomerInfo] = useState({});
  // const [isTax, setIsTax] = useState("Yes");
  const [totalAmountAddedTax, setTotalAmountAddedTax] = useState(0);
  const [invoiceInfo, setInvoiceInfo] = useState({});
  const [invoice_id, setInvoice_id] = useState();

  //-------------------SnackBar-------------------------------------->
  const [textSnackbar, setTextSnackbar] = useState("Edit Success");
  const [severity, setServerity] = useState("success");
  const [openSuccess, setOpenSuccess] = useState(false);
  //------------------ShowTotal-------------------------------------->
  const [vats, setVats] = useState(0.0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const TAX_RATE = 0.07;

  const initValues = {
    invoiceId: null,
    payerId: +params.payerId,
    billerId: userId,
    totalAmount: 0.0,
    vat: 0.0,
    dueDate: "",
    totalAmountAddedTax: 0.0,
    lists: [{}],
  };

  useEffect(() => {
    // console.log(params.id);
    // console.log(params.payerId);

    customerInfoApi();
  }, []);

  const customerInfoApi = async () => {
    let dataTemp = {};
    await invoiceService
      .invoice_detail_inquiry({
        id: params.id,
      })
      .then(function (response) {
        console.log(response);
        setInvoiceInfo(response);
        setInvoice_id(response["id"])
        setAllProduct(response["lists"]);
        setTotalAmount(response["totalAmount"]);
        setTotalPrice(response["totalAmountAddedTax"]);
        setTotalAmountAddedTax(response["totalAmountAddedTax"]);
        setVats(response["vat"]);
        setValue(response["dueDate"]);
      });
    await payerService
      .payer_detail_inquiry({ id: params.payerId })
      .then(function (response) {
        setDataCustomerInfo(response);
      });
  };

  const headProduct = [
    { id: "description", label: "Product" },
    { id: "quantity", label: "Qty." },
    { id: "unitPrice", label: "Price/Unit" },
    { id: "amount", label: "total" },
    { id: "index", label: "#" },
  ];

  function handleChangeUnit(e, row_index, key) {
    let arr = [...allProduct];

    arr.map((item) => {
      if (item.id === row_index) {
        if (key === "description") {
          item.description = e.target.value;
        }
        if (key === "quantity") {
          if (item.unitPrice === 0) {
            item.amount = 0;
          } else {
            item.amount = +e.target.value * item.unitPrice;
          }
          item.quantity = +e.target.value;
        }
        if (key === "unitPrice") {
          if (item.quantity === 0) {
            item.amount = 0;
          } else {
            item.amount = +e.target.value * item.quantity;
          }
          item.unitPrice = +e.target.value;
        }
      }
    });
    setAllProduct(arr);
    let priceAllProduct = 0;
    allProduct.map((data, index) => {
      priceAllProduct += data["amount"];
    });
    let temp = TAX_RATE * priceAllProduct;

    setTotalPrice(temp + priceAllProduct);

    setVats(temp);
    setTotalAmount(priceAllProduct);
    setTotalAmountAddedTax(temp + priceAllProduct);
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  function subtotal(items) {
    let total = 0;
    items.map((data) => {
      total += data["amount"];
    });
    return total;
  }
  const handleEditInvoice = async () => {
    let nullProduct = false;
    setLoading(true);

    allProduct.map((item) => {
      if (item.description === "") {
        nullProduct = true;
      }
    });

    if (allProduct.length === 0) {
      console.log("null");
      setServerity("error");
      setTextSnackbar("Please add Product");
      setOpenSuccess(true);
      setLoading(false);
    } else if (nullProduct === true) {
      setServerity("error");
      setTextSnackbar("Please fill Product");
      setOpenSuccess(true);
      setLoading(false);
    } else {
      initValues.invoiceId = +invoice_id;
      initValues.lists = allProduct;
      initValues.vat = vats;
      initValues.totalAmount = totalAmount;
      initValues.dueDate = value;
      initValues.totalAmountAddedTax = totalAmountAddedTax;
      console.log(initValues);
      await invoiceService
        .invoice_status_update({
          id: invoiceInfo.id,
          status: "cancelled",
        })
        .then(function (response) {
          console.log(response);
        });
      await invoiceService
        .invoice_create(initValues)
        .then(function (response) {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      const noti = await notificationService.notification_unread_count_inquiry({
        billerId: userId,
      });
      dispatch(setNotiCount(noti["unreadCount"]));
      setTimeout(() => {
        setServerity("success");
        setTextSnackbar("Edit successfully.");
        setOpenSuccess(true);
        setLoading(false);
      }, 2000);

      setTimeout(() => {
        navigate("/allbill");
      }, 4000);

      let tempData = {
        payerId: +params.payerId,
        billerId: userId,
        totalAmount: totalAmount,
        vat: vats,
        dueDate: value,
        totalAmountAddedTax: totalAmountAddedTax,
        lists: allProduct,
      };
    }
  };

  const handleChange = () => {
    console.log(allProduct);
  };
  const addProduct = () => {
    setAllProduct([
      ...allProduct,
      {
        id: allProduct.length + 1,
        description: "",
        quantity: 0,
        unitPrice: 0,
        amount: 0,
      },
    ]);
    setUnit(null);

    console.log(allProduct);
  };

  const handleInvoiceID = (e) => {
    setInvoice_id(e.target.value);
    console.log(e.target.value);
  };

  const handleDeleteProduct = (index) => {
    setAllProduct(
      allProduct.filter(function (item) {
        return item.id !== index;
      })
    );
  };

  const handleCancel = () => {
    navigate("/allbill/billinfo/" + params.id);
  };

  function currencyFormat(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fotmatDate = (date) => {
    return new Date(date).toLocaleDateString("fr");
  };

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapterMoment} locale="fr">
        <Box sx={{ p: 3 }}>
          <Grid container className={classes.center}>
            <Grid item xs={12} md={7} pb={3}>
              <Stack
                className={classes.header_create}
                direction={{ xs: "column", sm: "row" }}>
                <ResponsiveHeader text="Invoice" />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={handleCancel}>
                    Cancel
                  </Button>
                  <LoadingButton
                    onClick={handleEditInvoice}
                    loading={loading}
                    color={"success"}
                    loadingIndicator="Loading..."
                    variant="outlined">
                    Edit Invoice
                  </LoadingButton>
                </Stack>
              </Stack>
              <MainCard>
                <Box padding={3}>
                  <Grid spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                        <Grid pt={3}>
                          <TextField
                            id="outlined"
                            label="Invoice ID"
                            value={invoice_id}
                            // value={invoiceInfo.id}
                            type={"number"}
                            onChange={handleInvoiceID}
                            required
                          />
                        </Grid>
                        <Grid pt={3}>
                        <TextField
                            id="outlined"
                            label="Customer"
                            value={
                              dataCustomerInfo.name +
                              " " +
                              dataCustomerInfo.lastname
                            }
                            onChange={handleChange}
                            disabled
                          />
                        </Grid>
                 

                          <Grid pt={3}>
                            <TextField
                              id="outlined-textarea"
                              label="Address"
                              placeholder="Address"
                              disabled
                              multiline
                              value={
                                dataCustomerInfo.addressDetail +
                                " " +
                                dataCustomerInfo.road +
                                " " +
                                dataCustomerInfo.subDistrict +
                                " " +
                                dataCustomerInfo.district +
                                " " +
                                dataCustomerInfo.province +
                                " " +
                                dataCustomerInfo.zipCode
                              }
                            />
                          </Grid>
                          <Grid item xs={12} md={12} pt={3}>
                            <TextField
                              id="outlined-name"
                              label="Date"
                              disabled
                              value={fotmatDate(today)}
                            />
                          </Grid>

                          <Grid item xs={12} md={12} pt={3}>
                            <DatePicker
                              label="Due Date"
                              openTo="year"
                              views={["year", "month", "day"]}
                              value={value}
                              disablePast
                              inputFormat={"DD/MM/YYYY"}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} md={8} pt={3}>
                            <TextField
                              id="outlined-name"
                              label={invoiceInfo.billerName}
                              disabled
                            />
                          </Grid>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <Typography sx={{ color: "purple" }} variant="h3">
                            TOTAL
                          </Typography>
                          <Typography variant="h4" pt={2}>
                            {currencyFormat(totalPrice)}
                          </Typography>
                          <Box paddingTop={3}>
                            <Grid container>
                              <Grid item xs={4} md={3}>
                                <Typography variant="h5">Subtotal</Typography>
                              </Grid>
                              <Grid item xs={8} md={9}>
                                <Typography variant="h5">
                                  {currencyFormat(totalAmount)} Baht
                                </Typography>
                              </Grid>
                              <Grid item xs={4} md={3}>
                                <Typography variant="h5">Vats 7%</Typography>
                              </Grid>
                              <Grid item xs={8} md={9}>
                                <Typography variant="h5">
                                  {currencyFormat(vats)} Baht
                                </Typography>
                              </Grid>
                              <Grid item xs={4} md={3}>
                                <Typography variant="h5">Total</Typography>
                              </Grid>
                              <Grid item xs={8} md={9}>
                                <Typography variant="h5">
                                  {currencyFormat(totalPrice)} Baht
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider sx={{ p: 2 }}></Divider>
                    <Grid item xs={12} sx={{ pt: 2 }}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={12} lg={12} spacing={2}>
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}>
                            <Grid></Grid>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TableContainer>
                            <Table aria-labelledby="tableTitle" size="medium">
                              <TableHead>
                                <TableRow>
                                  {headProduct.map((headCell) => (
                                    <TableCell
                                      key={headCell.id}
                                      align="center"
                                      padding="normal">
                                      {headCell.label}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {allProduct.map((row, index) => {
                                  const labelId = `enhanced-table-checkbox-${index}`;

                                  return (
                                    <TableRow
                                      component="th"
                                      hover
                                      role="checkbox"
                                      tabIndex={-1}
                                      key={row.id}>
                                      <TableCell align="center">
                                        <Stack direction={"column"} spacing={1}>
                                          <TextField
                                            id="outlined-name"
                                            label="Product"
                                            defaultValue={row.description}
                                            onChange={(event) =>
                                              handleChangeUnit(
                                                event,
                                                row.id,
                                                "description"
                                              )
                                            }
                                          />
                                        </Stack>
                                      </TableCell>
                                      <TableCell align="center">
                                        <TextField
                                          id="outlined-qty"
                                          label="Qty."
                                          type={"number"}
                                          defaultValue={row.quantity}
                                          inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                          }}
                                          onChange={(event) =>
                                            handleChangeUnit(
                                              event,
                                              row.id,
                                              "quantity"
                                            )
                                          }
                                        />
                                      </TableCell>
                                      <TableCell align="center">
                                        <TextField
                                          id="outlined-price"
                                          label="Price"
                                          type={"number"}
                                          maxLength={6}
                                          defaultValue={row.unitPrice}
                                          inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                            maxLength: 10,
                                            step: "1",
                                          }}
                                          onChange={(event) =>
                                            handleChangeUnit(
                                              event,
                                              row.id,
                                              "unitPrice"
                                            )
                                          }></TextField>
                                      </TableCell>
                                      <TableCell align="center">
                                        {currencyFormat(row.amount)} Baht
                                      </TableCell>
                                      <TableCell
                                        id={labelId}
                                        component="th"
                                        scope="row"
                                        align="center"
                                        padding="normal">
                                        <Button
                                          color="error"
                                          onClick={() =>
                                            handleDeleteProduct(row.id)
                                          }>
                                          Delete
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <Tooltip title="Add List" placement="right">
                            <IconButton onClick={addProduct}>
                              <Avatar sx={{ bgcolor: green[500] }}>
                                <AddRoundedIcon />
                              </Avatar>
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </MainCard>
            </Grid>
            {invoiceInfo.correctionRequest === null ? null : (
              <Grid m={7}>
                <Card>
                  <CardContent>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <EditRoundedIcon />
                      </Grid>
                      <Grid item>
                        <CardHeader title="Edit detail"></CardHeader>
                      </Grid>
                    </Grid>
                    {invoiceInfo.correctionRequest}
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
        <ResponsiveSnackbar
          text={textSnackbar}
          severity={severity}
          openSuccess={openSuccess}
          handleClose={handleCloseSnackBar}></ResponsiveSnackbar>
      </LocalizationProvider>
    </>
  );
}
