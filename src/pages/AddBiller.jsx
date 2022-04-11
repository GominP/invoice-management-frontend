import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Grid,
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
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addItem, addItem2, getRole, getUserID } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import * as relationService from "../services/relationService";
import * as billerServices from "../services/billerServices";

import Controls from "../component/controls/Controls";
import { useForm, Form } from "../utils/useForm";
import ResponsiveSnackbar from "../component/ResponsiveSnackbar";
import AddBillerForm from "../component/controls/AddBillerForm";
// import {userId} from "../store/constant";

const useStyles = makeStyles((theme) => ({}));

const initValues = {
  code: "",
};

export default function AddBiller() {
  const axios = require("axios");
  const userid_dispatch = useSelector(getUserID);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let params = useParams();
  const [openError, setOpenError] = React.useState(false);
  const [checkNull, setCheckNull] = useState("กรุณาใส่รหัสผู้ออกใบแจ้งหนี้");
  const [textError, setTextError] = useState("Somthing Wrong !");

  const [textSnackbar, setTextSnackbar] = useState("Add creditor Successful");
  const [severity, setServerity] = useState("success");
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {}, []);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        p={4}
        sx={{ display: "flex", justifyContent: "center" }}>
        Add New Creditor
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid>
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia />
              <CardContent>
                <Grid>
                  <Grid
                    item
                    sx={{
                      "& .MuiTextField-root": { m: 0, width: "100%" },
                    }}>
                    <Typography variant="h6" p={0}>
                      Add creditor from code
                    </Typography>

                    <Typography variant="h7">
                      {/* สอบถามรหัสจากผู้สร้างใบแจ้งหนี้ที่คุณได้ทำการติดต่อแล้ว */}
                    </Typography>

                    <Grid pt={2}>
                      <AddBillerForm
                        payerId={userid_dispatch}
                        textSnackbar={setTextSnackbar}
                        serverity={setServerity}
                        openSuccess={setOpenSuccess}></AddBillerForm>
                      {/* <Controls.Input
                        name="code"
                        label="Biller code"
                        value={values.code}
                        onChange={handleInputChage}
                        error={errors.code}></Controls.Input> */}
                    </Grid>
                  </Grid>
                </Grid>

                <ResponsiveSnackbar
                  text={textSnackbar}
                  severity={severity}
                  openSuccess={openSuccess}
                  handleClose={handleCloseSnackBar}></ResponsiveSnackbar>
              </CardContent>
              <CardActions>
                {/* <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}>
                  + New Biller
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        {/* </Form> */}
      </Box>
    </div>
  );
}
