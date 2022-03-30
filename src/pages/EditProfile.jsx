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
import { useFormPassword, FormPassword } from "../utils/useFormPassword";

import { Controls } from "../component/controls/Controls";
import PasswordForm from "../component/controls/PasswordForm";

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

const initValuesPassword = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
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
  const [tempInfo, setTempInfo] = useState({
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
  });

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

      setTempInfo(initValues);
    });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("username" in fieldValues) {
      temp.username = values.username ? "" : "Please fill username";
    }
    if ("name" in fieldValues) {
      temp.name = values.name ? "" : "Please fill firstname";
    }
    if ("lastname" in fieldValues) {
      temp.lastname = values.lastname ? "" : "Please fill lastname";
    }
    if ("phone" in fieldValues) {
      temp.phone = values.phone ? "" : "Please fill phone number";
    }
    if ("addressDetail" in fieldValues) {
      temp.addressDetail = values.addressDetail
        ? ""
        : "Please fill address detail";
    }
    if ("road" in fieldValues) {
      temp.road = values.road ? "" : "Please fill road";
    }
    if ("district" in fieldValues) {
      temp.district = values.district ? "" : "Please fill district";
    }
    if ("subDistrict" in fieldValues) {
      temp.subDistrict = values.subDistrict ? "" : "Please fill subdistrict";
    }
    if ("province" in fieldValues) {
      temp.province = values.province ? "" : "Please fill province";
    }
    if ("zipCode" in fieldValues) {
      temp.zipCode = values.zipCode ? "" : "Please fill zipcode";
    }

    if ("citizenId" in fieldValues) {
      temp.citizenId = values.citizenId ? "" : "Please fill citizen id";
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
    if (editFlag === false) {
      window.location.href = "/editProfile/" + role;
      // navigate("/editProfile/" + role);
      initValues.name = tempInfo.name;
      initValues.lastname = tempInfo.lastname;
      initValues.phone = tempInfo.phone;
      initValues.citizenId = tempInfo.citizenId;
      initValues.addressDetail = tempInfo.addressDetail;
      initValues.road = tempInfo.road;
      initValues.district = tempInfo.district;
      initValues.subDistrict = tempInfo.subDistrict;
      initValues.province = tempInfo.province;
      initValues.zipCode = tempInfo.zipCode;
    }
  };

  const check = () => {
    console.log(initValues);
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
                    <Stack direction={"row"} spacing={2}></Stack>
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
          {/* <Button autoFocus color="error" onClick={check}>
            check
          </Button> */}
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
          {/* <FormPassword onSubmit={handleSubmitPassword}> */}
          <DialogTitle id="responsive-dialog-title">
            {"Change Password"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid pt={2} spacing={3}>
                <PasswordForm
                  handleClosePassword={handleClosePassword}
                  textSnackbar={setTextSnackbar}
                  serverity={setServerity}
                  openSuccess={setOpenSuccess}></PasswordForm>
                {/* <Stack direction={"column"} spacing={2} pb={2}>
                    <Controls.InputPassword
                      name="oldPassword"
                      label="Old Password"
                      value={valuesPassword.oldPassword}
                      onChange={handleInputChagePassword}
                      error={errorPassword.oldPassword}
                      showPassword={false}></Controls.InputPassword>
                    <Controls.InputPassword
                      label="New Password"
                      name="newPassword"
                      value={valuesPassword.newPassword}
                      onChange={handleInputChagePassword}
                      showPassword={false}
                      error={
                        errorPassword.newPassword
                      }></Controls.InputPassword>
                    <Controls.InputPassword
                      label="Confirm New Password"
                      name="confirmNewPassword"
                      value={valuesPassword.confirmNewPassword}
                      onChange={handleInputChagePassword}
                      showPassword={false}
                      error={
                        errorPassword.confirmNewPassword
                      }></Controls.InputPassword>
                  </Stack> */}
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="error" onClick={handleClosePassword}>
              Cancel
            </Button>
            {/* <Button type="submit" color="primary" autoFocus>
                Change Password
              </Button> */}
          </DialogActions>
          {/* </FormPassword> */}
        </Dialog>
      </Box>
    </div>
  );
};

export default EditProfile;
