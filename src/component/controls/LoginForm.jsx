import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as authService from "../../services/authService";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      //   .email("Email must be a valid email address")
      .required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      //   remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      const response = authService
        .login(values)
        .then(function (response) {
          console.log(response);
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status === 401) {
            setSubmitting(!isSubmitting);
            setShowError(true)
            // touched.username = "wewdasdadad"
            // window.location.href = "/";
          }
        });
      // console.log(response)
      //   console.log(values);

      //   navigate("/dashboard", { replace: true });
    },
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    getFieldProps,
    ErrorMessage,
  } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClose = () => {
    setShowError(false);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="username"
            label="Username"
            {...getFieldProps("username")}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon
                      icon={
                        showPassword
                          ? VisibilityOutlinedIcon
                          : VisibilityOffOutlinedIcon
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        {/* <ErrorMessage name="username"  /> */}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}></Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>

      <Dialog
        open={showError}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your login credentials don't match an account in our system
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </FormikProvider>
  );
}
