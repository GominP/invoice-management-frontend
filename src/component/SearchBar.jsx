import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Container,
  TextField,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  IconButton,
  Chip,
  Select,
  Table,
  Stack,
  Switch,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  TablePagination,
  TableSortLabel,
  Toolbar,
  Tooltip,
} from "@mui/material";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

const useStyles = makeStyles((theme) => ({
  form: {
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: 250,
    },
  },
  search: {
    maxWidth: 200,
    [theme.breakpoints.down("md")]: {
      maxWidth: 150,
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

const names = [
  "จ่ายแล้ว",
  "เลยกำหนดชำระ",
  "คำร้องแก้ไขบิล",
  "บิลที่กำลังรอดำเนินการ",
  "บิลที่ถูกยกเลิก",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SearchBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [value, setValue] = React.useState("");

  return (
    <div>
      <Box
        sx={{ flexGrow: 1, p: 8 }}
        display="flex"
        direction="row"
        alignItems="center"
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <Typography variant="h5" marginTop={1}>
              ใบแจ้งหนี้ทั้งหมด
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              className={classes.search}
              label="ค้นหา"
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl className={classes.form}>
              <InputLabel id="demo-multiple-chip-label">
                ตัวกรองใบแจ้งหนี้
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                multiple
                label="ตัวกรองใบแจ้งหนี้"
                value={personName}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="ตัวกรองใบแจ้งหนี้"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={6} sm={8}>
            <Item>xs=6 md=8</Item>
          </Grid> */}
        </Grid>
      </Box>
      
    </div>
  );
};

export default SearchBar;
