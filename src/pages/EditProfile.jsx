import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Grid,
  Divider,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResponsiveSnackbar from "../component/ResponsiveSnackbar";
import ResponsiveDialog from "../component/ResponsiveDialog";
import useMediaQuery from "@mui/material/useMediaQuery";

import { getRole, getUserID } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import * as billerService from "../services/billerServices";
import * as payerService from "../services/payerService";
import * as authService from "../services/authService";
import { useForm, Form } from "../utils/useForm";
import { Controls } from "../component/controls/Controls";

const useStyles = makeStyles((theme) => ({
  previewChip: {
    minWidth: 160,
    maxWidth: 210,
  },
}));

const initValues = {
  name: "",
  lastname: "",
  phone: "",
  citizenId: "",
  addressDetail: "",
  road: "",
  district: "",
  subDistrict: "",
  province: "",
  zipCode: "",
};

const EditProfile = () => {
  let navigate = useNavigate();

  const classes = useStyles();
  const theme = useTheme();
  let params = useParams();
  const role = useSelector(getRole);
  const id = useSelector(getUserID);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [textSnackbar, setTextSnackbar] = useState("Edit Success");
  const [severity, setServerity] = useState("success");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const [editFlag, setEditFlag] = useState(true);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    let textRole = "";
    await authService.landing().then(function (response) {
      if (response.data["biller"] === null) {
        textRole = "payer";
      } else {
        textRole = "biller";
      }
      initValues.name = response.data[textRole]["name"];
      initValues.lastname = response.data[textRole]["lastname"];
      initValues.phone = response.data[textRole]["phone"];
      initValues.citizenId = response.data[textRole]["citizenId"];
      initValues.addressDetail = response.data[textRole]["addressDetail"];
      initValues.road = response.data[textRole]["road"];
      initValues.district = response.data[textRole]["district"];
      initValues.subDistrict = response.data[textRole]["subDistrict"];
      initValues.province = response.data[textRole]["province"];
      initValues.zipCode = response.data[textRole]["zipCode"];
    });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("username" in fieldValues) {
      temp.username = values.username ? "" : "กรุณากรอก username";
    }
    if ("password" in fieldValues) {
      temp.password = values.password ? "" : "กรุณากรอกรหัสผ่าน";
    }

    if ("name" in fieldValues) {
      temp.name = values.name ? "" : "กรุณากรอกชื่อ";
    }
    if ("phone" in fieldValues) {
      temp.phone = values.phone ? "" : "กรุณากรอกเบอร์โทรศัพท์";
    }
    if ("addressDetail" in fieldValues) {
      temp.addressDetail = values.addressDetail ? "" : "กรุณากรอกบ้านเลขที่";
    }
    if ("road" in fieldValues) {
      temp.road = values.road ? "" : "กรุณากรอกถนน";
    }
    if ("district" in fieldValues) {
      temp.district = values.district ? "" : "กรุณากรอกอำเภอ";
    }
    if ("subDistrict" in fieldValues) {
      temp.subDistrict = values.subDistrict ? "" : "กรุณากรอกตำบล";
    }
    if ("province" in fieldValues) {
      temp.province = values.province ? "" : "กรุณากรอกจังหวัด";
    }
    if ("zipCode" in fieldValues) {
      temp.zipCode = values.zipCode ? "" : "กรุณากรอกเลขไปรษณีย์";
    }

    if ("citizenId" in fieldValues) {
      temp.citizenId = values.citizenId ? "" : "กรุณากรอกเลขประจำตัว";
    }

    setErrors({
      ...temp,
    });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const {
    values,
    setValues,
    handleInputChage,
    setErrors,
    errors,
    changeCitizen,
  } = useForm(initValues, true, validate);

  const handleClickOpenPassword = () => {
    setOpenPassword(true);
  };

  const handleClosePassword = () => {
    setOpenPassword(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      if (role === "biller") {
        await billerService.biller_update(values);
      } else {
        await payerService.payer_update(values);
      }
      setTextSnackbar("Edit Success");
      setServerity("success");
      setOpenSuccess(true);
      setEditFlag(!editFlag);
      navigate("/editprofile/" + role);
    } else {
      setTextSnackbar("Something worg");
      setServerity("error");
      setOpenSuccess(true);
    }
  };

  const handleEdit = () => {
    setEditFlag(!editFlag);
  };

  const check2 = () => {
    console.log(values);
  };

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
        Edit Profile
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid>
          <Grid item xs={12}>
            <Card>
              <Form onSubmit={handleSubmit}>
                <CardMedia />
                <CardContent>
                  <Grid spacing={3}>
                    <Grid
                      item
                      sx={{
                        "& .MuiTextField-root": { m: 1 },
                      }}>
                      <Grid>
                        <Typography variant="h5" component="h1" p={1}>
                          Infomation
                        </Typography>
                        <Grid>
                          <Controls.Input
                            name="name"
                            label="Firstname"
                            value={values.name}
                            onChange={handleInputChage}
                            error={errors.name}
                            disabled={editFlag}></Controls.Input>
                          <Controls.Input
                            name="lastname"
                            label="Lastname"
                            value={values.lastname}
                            onChange={handleInputChage}
                            error={errors.lastname}
                            disabled={editFlag}></Controls.Input>
                          <Controls.Input
                            name="phone"
                            label="Phone Number"
                            value={values.phone}
                            onChange={handleInputChage}
                            error={errors.phone}
                            disabled={editFlag}></Controls.Input>
                        </Grid>
                        <Grid>
                          <Controls.Input
                            name="addressDetail"
                            label="Address Detail"
                            value={values.addressDetail}
                            onChange={handleInputChage}
                            error={errors.addressDetail}
                            disabled={editFlag}></Controls.Input>
                          <Controls.Input
                            name="road"
                            label="Road"
                            value={values.road}
                            onChange={handleInputChage}
                            error={errors.road}
                            disabled={editFlag}></Controls.Input>
                          <Controls.Input
                            name="district"
                            label="District"
                            value={values.district}
                            onChange={handleInputChage}
                            error={errors.district}
                            disabled={editFlag}></Controls.Input>

                          <Controls.Input
                            name="subDistrict"
                            label="Subdistrict"
                            value={values.subDistrict}
                            onChange={handleInputChage}
                            error={errors.subDistrict}
                            disabled={editFlag}></Controls.Input>
                        </Grid>
                        <Grid>
                          <Controls.Input
                            name="province"
                            label="Province"
                            value={values.province}
                            onChange={handleInputChage}
                            error={errors.province}
                            disabled={editFlag}></Controls.Input>
                          <Controls.Input
                            name="zipCode"
                            label="Zipcode"
                            value={values.zipCode}
                            onChange={handleInputChage}
                            error={errors.zipCode}
                            disabled={editFlag}></Controls.Input>
                        </Grid>
                        <Grid>
                          <Controls.Input
                            name="citizenId"
                            label="Citizen ID"
                            value={values.citizenId}
                            onChange={handleInputChage}
                            error={errors.citizenId}
                            disabled={editFlag}></Controls.Input>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider />
                </CardContent>

                {editFlag ? (
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}>
                    <Stack direction={"row"} spacing={2}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => check2()}>
                        check2
                      </Button>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleClickOpenPassword()}>
                        Change Password
                      </Button>

                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit()}>
                        Edit
                      </Button>
                    </Stack>
                  </CardActions>
                ) : (
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <Button
                      onClick={() => handleEdit()}
                      variant="outlined"
                      color="error">
                      Cancel
                    </Button>
                    <Button type="submit" variant="outlined" color="success">
                      Confirm
                    </Button>
                  </CardActions>
                )}
              </Form>
            </Card>
          </Grid>
          <ResponsiveSnackbar
            text={textSnackbar}
            severity={severity}
            openSuccess={openSuccess}
            handleClose={handleCloseSnackBar}></ResponsiveSnackbar>
        </Grid>

        <Dialog
          fullScreen={fullScreen}
          open={openPassword}
          onClose={handleClosePassword}
          aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title">
            {"เปลี่ยนรหัสผ่าน"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid pt={2} spacing={3}>
                <Stack direction={"row"} spacing={2} pb={2}></Stack>

                <Stack direction={"row"} spacing={2}></Stack>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClosePassword}>
              Disagree
            </Button>
            <Button onClick={handleClosePassword} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default EditProfile;
