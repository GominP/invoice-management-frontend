import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { filter } from "lodash";
import { useEffect, useState } from "react";
import * as invoiceService from "../services/invoiceService";
import * as payerService from "../services/payerService";
import * as billerService from "../services/billerServices";

import {
  TextField,
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  Chip,
  MenuItem,
  Button,
  Select,
  Stack,
  Divider,
  Menu,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import SearchNotFound from "../component/SearchNotFound";
import {
  setRole,
  setId,
  setNotiCount,
  getRole,
  getUserID,
  getNotiCount,
} from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  th: {
    backgroundColor: "#ba68c8",
    color: "white",
    
  },
  form: {
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: 250,
    },
  },
}));

function createData(billId, customerName, expiredDate, total, status) {
  return {
    billId,
    // date,
    customerName,
    expiredDate,
    total,
    status,
  };
}

const time = new Date(1646892000).toLocaleString("th-TH").split(" ")[0];
const time2 = new Date("2019-2-11").toLocaleString("th-TH").split(" ")[0];
const time3 = new Date("2019/1/12").toLocaleString("th-TH").split(" ")[0];
const time4 = new Date("2019-11-12").toLocaleString("th-TH").split(" ")[0];
const time5 = new Date("2019-11-12").toLocaleString("th-TH").split(" ")[0];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Invoice id",
  },

  {
    id: "customerName",
    numeric: false,
    disablePadding: false,
    label: "Customer",
  },
  {
    id: "dueDate",
    numeric: false,
    disablePadding: false,
    label: "Expired Date",
  },
  {
    id: "totalAmountAddedTax",
    numeric: true,
    disablePadding: false,
    label: "Total",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

function EnhancedTableHead(props) {
  const classes = useStyles();
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.th}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function AllInvoices() {
  let navigate = useNavigate();
  const role = useSelector(getRole);
  const userId = useSelector(getUserID);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState("");
  const [token] = useState(localStorage.getItem("token"));
  const [rows, setRows] = useState([]);
  const [anchorFilter, setAnchorFilter] = useState(null);
  const open = Boolean(anchorFilter);
  const [statusFilter, setStatusFilter] = useState("");
  const [nameTemp, setNameTemp] = useState();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const filters = [
    "All",
    "Paid",
    "Overdue",
    "Processing",
    "Cancelled",
    "Correctionrequested",
  ];

  // const rowb = [
  //   {
  //     billId: "test",
  //     // date: new Date("2019-2-2").toLocaleString("th-TH").split(" ")[0],
  //     customerName: "สินชัย",
  //     expiredDate: new Date("2019-2-2").toLocaleString("th-TH").split(" ")[0],
  //     total: 17,
  //   },
  //   createData("1235", "โชคชัย คงมั่น", time, 4.3, "overdue"),
  //   createData("b61104562", "โชคชัย ดีเด่น", time2, 4.9),
  //   createData("b61104561", "โชคชัย ดีเด่น", time2, 4.9),
  //   createData("q3467", "โชคชัย", time3, 6.0),
  //   createData("2345260", "โชคชัย", time4, 4.0),
  //   createData("1", "โชคชัย", time5, 3.9),
  //   createData("Gingerbread", "โชคชัย", time5, 3.9),
  // ];

  useEffect(() => {
    async function fetchInvoice() {
      let data = {};
      role === "biller"
        ? (data = { billerId: userId })
        : (data = { payerId: userId });

      await invoiceService.invoice_inquiry(data).then(function (response) {
        console.log(response["invoices"]);
        setRows(response["invoices"]);
      });
    }
    fetchInvoice();
    // callApi();
  }, []);

  // const callApi = async () => {
  //   let tempRow = [];
  //   let tempDataRow = {};

  //   let data = {};
  //   role === "biller"
  //     ? (data = { billerId: userId })
  //     : (data = { payerId: userId });

  //   await invoiceService.invoice_inquiry(data).then(function (response) {
  //     // console.log(response["invoices"]);
  //     setRows(response["invoices"]);
  //   });

  //   // await billerService.biller_detail_inquiry(data).then(function (response) {
  //   //   console.log(response);
  //   //   // return response["name"];
  //   // });

  //   // await payerService.payer_detail_inquiry(data).then(function (response) {
  //   //   console.log(response);
  //   //   // return response["name"];
  //   // });
  // };

  const findNamebyId = (temp) => {
    let data = { id: temp };

    let name = "sad";

    // if (role === "biller") {
    //   payerService.payer_detail_inquiry(data).then(function (response) {
    //     return response["name"];
    //   });
    // } else if (role === "payer") {
    //   billerService.biller_detail_inquiry(data).then(function (response) {
    //     return response["name"];
    //   });
    // }
  };

  function formatDate(date) {
    return new Date(date).toLocaleDateString("fr");
  }

  function currencyFormat(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleClickFilter = (event) => {
    setAnchorFilter(event.currentTarget);
  };
  const handleChangeFilter = async (string) => {
    console.log(string.toLowerCase());
    setStatusFilter(string);
    let data = {};
    let data2 = {};
    role === "biller"
      ? (data = { billerId: userId, status: string.toLowerCase() })
      : (data = { payerId: userId, status: string.toLowerCase() });

    if (string === "All") {
      role === "biller"
        ? (data2 = { billerId: userId })
        : (data2 = { payerId: userId });

      await invoiceService.invoice_inquiry(data2).then(function (response) {
        setRows(response["invoices"]);
      });
    } else {
      await invoiceService.invoice_inquiry(data).then(function (response) {
        setRows(response["invoices"]);
      });
    }

    setAnchorFilter(null);
  };

  const handleClose = () => {
    setAnchorFilter(null);
  };

  const filteredInvoice = applySortFilter(
    rows,
    getComparator(order, orderBy),
    filterName
  );

  function applySortFilter(array, comparator, query) {
    // console.log(array)

    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (bill) =>
          bill.id.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const handleClick = (event, billId) => {
    navigate("/allbill/billinfo/" + billId);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const isInvoiceNotFound = filteredInvoice.length === 0;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "85%", margin: "auto", p: 3 }}>
      <Paper sx={{ width: "100%", mb: 2, boxShadow: 3 }}>
        <Toolbar>
          <Box sx={{ flex: "1 100%" }}>
            <Stack direction={"row"} spacing={2}>
              <Typography variant="h6" id="tableTitle">
                All Invoice
              </Typography>
              {statusFilter === "" || statusFilter === "All" ? null : (
                <Chip label={statusFilter} variant="outlined" />
              )}
            </Stack>
          </Box>

          <Stack direction={{ xs: "row", sm: "row" }}>
            <TextField
              value={filterName}
              onChange={handleFilterByName}
              placeholder="Search Invoice"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickFilter}>
              <FilterListIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorFilter}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              {filters.map((filterItem) => (
                <MenuItem onClick={() => handleChangeFilter(filterItem)}>
                  {filterItem}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Toolbar>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size="medium"
            sx={{ minWidth: 750 }}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {filteredInvoice
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  // console.log(row["id"])
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      // selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal">
                        {row.id}
                      </TableCell>
                      {role === "payer" ? (
                        <TableCell align="left">{row.billerName}</TableCell>
                      ) : (
                        <TableCell align="left">{row.payerName}</TableCell>
                      )}

                      <TableCell align="left">
                        {formatDate(row.dueDate)}
                      </TableCell>
                      <TableCell align="right">
                        {currencyFormat(row.totalAmountAddedTax)}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color={
                            row.status === "cancelled"
                              ? "error"
                              : row.status === "overdue"
                              ? "warning"
                              : row.status === "paid"
                              ? "success"
                              : "primary"
                          }>
                          {row.status}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isInvoiceNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
