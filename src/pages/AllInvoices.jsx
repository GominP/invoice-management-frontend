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
import SearchBar from "../component/SearchBar";
import { useNavigate } from "react-router-dom";
import { filter } from "lodash";
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
  // search: {
  //   maxWidth: 800,
  //   [theme.breakpoints.down("md")]: {
  //     maxWidth: 450,
  //   },
  // },
}));

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

function createData(name, date, fat, carbs, protein) {
  return {
    name,
    date,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData("1235", "1/12/2561", 3.7, 67, 4.3),
  createData("67901", "2/12/2561", 25.0, 51, 4.9),
  createData("q3467", "3/12/2561", 16.0, 24, 6.0),
  createData("2345260", "4/12/2561", 6.0, 24, 4.0),
  createData("Gingerbread", "5/12/2561", 16.0, 49, 3.9),
  createData("Honeycomb", "6/12/2561", 3.2, 87, 6.5),
  createData("Ice cream sandwich", "7/12/2561", 9.0, 37, 4.3),
  createData("Jelly Bean", "8/12/2561", 0.0, 94, 0.0),
  createData("KitKat", "9/12/2561", 26.0, 65, 7.0),
  createData("Lollipop", "10/12/2561", 0.2, 98, 0.0),
  createData("Marshmallow", "30/12/2561", 0, 81, 2.0),
  createData("Nougat", "30/12/2561", 19.0, 9, 37.0),
  createData("Oreo", "30/12/2561", 18.0, 63, 4.0),
];

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
    id: "name",
    numeric: true,
    disablePadding: true,
    label: "เลขที่ใบแจ้งหนี้",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "วันที่",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "ชื่อลูกค้า",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "วันครบกำหนด",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "ยอดรวมสุทธิ",
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
            align={headCell.numeric ? "left" : "right"}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
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

const EnhancedTableToolbar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { filterName, onFilterName } = props;
  const [personName, setPersonName] = React.useState([]);
  const [anchorFilter, setAnchorFilter] = React.useState(null);
  const open = Boolean(anchorFilter);

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
    "จ่ายแล้ว",
    "เลยกำหนดชำระ",
    "คำร้องแก้ไขบิล",
    "บิลที่กำลังรอดำเนินการ",
    "บิลที่ถูกยกเลิก",
  ];

  // const handleChangeFilter = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  const handleClickFilter = (event) => {
    setAnchorFilter(event.currentTarget);
  };
  const handleChangeFilter = (string) => {
    console.log(string);
    setAnchorFilter(null);
  };

  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div">
        ใบแจ้งหนี้ทั้งหมด
      </Typography>
      <Stack
        direction={{ xs: "row", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}>
        <TextField
          value={filterName}
          onChange={onFilterName}
          // label="ค้นหา"
          placeholder="ค้นหา"
          InputProps={{
            startAdornment: (
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
          onClose={handleChangeFilter}
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
  );
};

EnhancedTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function AllInvoices() {
  let navigate = useNavigate();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterName, setFilterName] = React.useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredInvoice = applySortFilter(
    rows,
    getComparator(order, orderBy),
    filterName
  );

  function applySortFilter(array, comparator, query) {
    console.log("applySortFilter");
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const handleClick = (event, name) => {
    navigate("/allbill/billinfo");
    // const selectedIndex = selected.indexOf(name);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }
    // setSelected(newSelected);
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
    <Box sx={{ width: "85%", margin: "auto"}}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
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
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {filteredInvoice
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      // selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
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
