import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
// import eyeFill from "@iconify/icons-eva/eye-fill";
// import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate, useParams } from "react-router-dom";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PropTypes from "prop-types";
import * as authService from "../../services/authService";

// ----------------------------------------------------------------------

export default function PasswordForm(props) {
  const {
    role,
    openSuccessSnackBar,
    textSnackbar,
    openSuccess,
    serverity,
    handleClosePassword,
  } = props;
  const navigate = useNavigate();
  let params = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Password is required"),
    //   .matches(
    //     "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    //   ),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "Password must match")
      .required("Confrim Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log(values);
      setTimeout(() => {
        authService
          .password_update(values)
          .then(function (response) {
            console.log(response);
            textSnackbar("Change password Successful");
            serverity("success");
            // openSuccess(true);
            handleClosePassword();
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 500) {
              setSubmitting(!isSubmitting);
              textSnackbar("Old password is invalid");
              serverity("error");
              openSuccess(true);
              //   Yup.object().shape({
              //     oldPassword: Yup.string().required("Old Password is invalid"),
              //   });

              //   handleClosePassword()
            }
          });
      }, 4000);
      setTimeout(() => {
        openSuccess(true);
      }, 7000);
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setSubmitting,
  } = formik;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleMouseDownNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  //   const handleClose = () => {
  //     setShowError(false);
  //   };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "oldPassword"}
            label="Password"
            {...getFieldProps("oldPassword")}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={handleMouseDownPassword}>
                    {showPassword ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.oldPassword && errors.oldPassword)}
            helperText={touched.oldPassword && errors.oldPassword}
          />
          <TextField
            fullWidth
            autoComplete="current-new-password"
            type={showNewPassword ? "text" : "newPassword"}
            label="Password"
            {...getFieldProps("newPassword")}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowNewPassword}
                    onMouseDown={handleMouseDownNewPassword}>
                    {showNewPassword ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showConfirmPassword ? "text" : "confirmNewPassword"}
            label="Confirm Password"
            {...getFieldProps("confirmNewPassword")}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}>
                    {showConfirmPassword ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(
              touched.confirmNewPassword && errors.confirmNewPassword
            )}
            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}>
            Change
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

PasswordForm.propTypes = {
  role: PropTypes.string,
  openSuccessSnackBar: PropTypes.func.isRequired,
  textSnackbar: PropTypes.func.isRequired,
  serverity: PropTypes.func.isRequired,
  openSuccess: PropTypes.func.isRequired,
  handleClosePassword: PropTypes.func.isRequired,
};
