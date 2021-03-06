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
  Avatar,
  IconButton,
  Tooltip,
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
  getName,
} from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

import * as billerService from "../services/billerServices";
import * as payerService from "../services/payerService";
import * as invoiceService from "../services/invoiceService";
import * as notificationService from "../services/notificationService";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Icon } from "@material-ui/core";
import ResponsiveSnackbar from "../component/ResponsiveSnackbar";
import { LoadingButton } from "@mui/lab";
import { green } from "@mui/material/colors";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

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

export default function CreateBill() {
  const classes = useStyles();
  let params = useParams();
  let navigate = useNavigate();

  const role = useSelector(getRole);
  const userId = useSelector(getUserID);
  const name_dispatch = useSelector(getName);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [total, setTotal] = useState(400);
  const today = new Date().toLocaleString().split(" ")[0];
  const [value, setValue] = useState(new Date());
  const [allProduct, setAllProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [unit, setUnit] = useState();
  const [dataCustomerInfo, setDataCustomerInfo] = useState({});
  const [isTax, setIsTax] = useState("Yes");
  const [vats, setVats] = useState(0.0);
  const [totalAmountAddedTax, setTotalAmountAddedTax] = useState(0.0);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [invoice_id, setInvoice_id] = useState();

  //------Snackbar----------------------------------------------------------->
  const [textSnackbar, setTextSnackbar] = useState("Edit Success");
  const [severity, setServerity] = useState("success");
  const [openSuccess, setOpenSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [inputPrice, setInputPrice] = useState(0);

  const TAX_RATE = 0.07;

  const initValues = {
    invoiceId: null,
    payerId: +params.id,
    billerId: userId,
    totalAmount: 0.0,
    vat: 0.0,
    dueDate: "",
    totalAmountAddedTax: 0.0,
    lists: [{}],
  };

  useEffect(() => {
    customerInfoApi();
  }, [allProduct]);

  const customerInfoApi = async () => {
    let data = { id: params.id };
    await payerService.payer_detail_inquiry(data).then(function (response) {
      setDataCustomerInfo(response);
    });
  };

  const headProduct = [
    { id: "description", label: "Description" },
    { id: "quantity", label: "Qty." },
    { id: "unitPrice", label: "Price/Unit" },
    { id: "amount", label: "total" },
    { id: "index", label: "#" },
  ];

  function handleChangeUnit(e, row_index, key) {
    let arr = [...allProduct];
    if (key === "description") {
      arr[row_index - 1]["description"] = e.target.value;
    }

    if (key === "quantity") {
      if (arr[row_index - 1]["unitPrice"] === 0) {
        arr[row_index - 1]["amount"] = 0;
      } else {
        arr[row_index - 1]["amount"] =
          e.target.value * arr[row_index - 1]["unitPrice"];
      }
    } else if (key === "unitPrice") {
      if (arr[row_index - 1]["quantity"] === 0) {
        arr[row_index - 1]["amount"] = e.target.value * 1;
      } else {
        arr[row_index - 1]["amount"] =
          e.target.value * arr[row_index - 1]["quantity"];
      }
    }
    arr[row_index - 1][key] = e.target.value;
    setAllProduct(arr);
    let priceAllProduct = 0;
    allProduct.map((data, index) => {
      priceAllProduct += data["amount"];
    });
    let temp = TAX_RATE * priceAllProduct;

    if (isTax === "Yes") {
      console.log("true Tax");

      setTotalPrice(temp + priceAllProduct);
    } else if (isTax === "no") {
      console.log("false Tax");

      setTotalPrice(priceAllProduct);
    }

    setVats(temp);
    setTotalAmount(priceAllProduct);
    setTotalAmountAddedTax(temp + priceAllProduct);
  }

  function subtotal(items) {
    let total = 0;
    items.map((data) => {
      total += data["amount"];
    });
    return total;
  }
  const handleCreateBill = () => {
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

      invoiceService.invoice_create(initValues).then(async function (response) {
        const noti =
          await notificationService.notification_unread_count_inquiry({
            billerId: userId,
          });
        dispatch(setNotiCount(noti["unreadCount"]));
      });

      setTimeout(() => {
        setServerity("success");
        setTextSnackbar("Create successfully.");
        setOpenSuccess(true);
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        navigate("/allbill");
      }, 4000);
    }
  };

  const handleChange = () => {
    console.log(initValues);
  };
  const addProduct = () => {
    setAllProduct([
      ...allProduct,
      {
        index: allProduct.length + 1,
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
      allProduct.filter(function (el) {
        return el.index !== index;
      })
    );
  };

  function currencyFormat(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

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
                <LoadingButton
                  variant="outlined"
                  color="success"
                  loading={loading}
                  loadingIndicator="Loading..."
                  onClick={handleCreateBill}
                  startIcon={<AddOutlinedIcon />}>
                  Create Invoice
                </LoadingButton>
              </Stack>
              <MainCard>
                <Box padding={3}>
                  <Grid spacing={3}>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <Grid pt={3}>
                          <TextField
                            id="outlined"
                            label="Invoice ID"
                            value={invoice_id}
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
                        <Grid item pt={3}>
                          <TextField
                            id="outlined-name"
                            label="Date"
                            disabled
                            value={fotmatDate(today)}
                          />
                        </Grid>

                        <Grid item pt={3}>
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
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Grid>

                        <Grid item pt={3}>
                          <TextField
                            id="outlined-name"
                            label="Biller"
                            value={name_dispatch}
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
                            <Grid item xs={4} md={6}>
                              <Typography variant="h5">Subtotal</Typography>
                            </Grid>
                            <Grid item xs={8} md={6}>
                              <Typography variant="h5">
                                {currencyFormat(totalAmount)} Baht
                              </Typography>
                            </Grid>
                            <Grid item xs={4} md={6}>
                              <Typography variant="h5">Vats 7%</Typography>
                            </Grid>
                            <Grid item xs={8} md={6}>
                              <Typography variant="h5">
                                {currencyFormat(vats)} Baht
                              </Typography>
                            </Grid>
                            <Grid item xs={4} md={6}>
                              <Typography variant="h5">Total</Typography>
                            </Grid>
                            <Grid item xs={8} md={6}>
                              <Typography variant="h5">
                                {currencyFormat(totalPrice)} Baht
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider sx={{ p: 2 }}></Divider>
                    <Grid item xs={12} sx={{ pt: 2 }}>
                      <Grid container spacing={gridSpacing}>
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
                                            label="Description"
                                            required
                                            onChange={(event) =>
                                              handleChangeUnit(
                                                event,
                                                row.index,
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
                                          inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                          }}
                                          onChange={(event) =>
                                            handleChangeUnit(
                                              event,
                                              row.index,
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
                                          inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                            maxLength: 11,
                                            step: "1",
                                          }}
                                          onChange={(event) =>
                                            handleChangeUnit(
                                              event,
                                              row.index,
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
                                            handleDeleteProduct(row.index)
                                          }>
                                          Delete
                                        </Button>
                                        {/* {row.index} */}
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

                        {/* <Button onClick={() => addProduct()}>
                          + Add Lists
                        </Button> */}
                        {/* <Button onClick={() => handleChange()}>mf]vsd</Button> */}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </MainCard>
            </Grid>
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
