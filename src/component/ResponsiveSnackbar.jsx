import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Divider,
  FormGroup,
  Checkbox,
  Snackbar,
  Alert,
  Stack,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";

function ResponsiveSnackbar(props) {
  const { openSuccess, openError, text, handleClose, severity } = props;
  return (
    <div>
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}

ResponsiveSnackbar.propTypes = {
  openSuccess: PropTypes.bool,
  openError: PropTypes.bool,
  handleClose: PropTypes.func,
  severity: PropTypes.string,
  text: PropTypes.string,
};

export default ResponsiveSnackbar;
