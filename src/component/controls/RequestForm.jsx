import * as Yup from "yup";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";

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
import * as invoiceService from "../../services/invoiceService";

import ResponsiveSnackbar from "../ResponsiveSnackbar";

// ----------------------------------------------------------------------

export default function RequestForm(props) {
  const { invoiceId, onClose, openSuccessSnackBar } = props;
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const RequestSchema = Yup.object().shape({
    correctionRequest: Yup.string()
      //   .email("Email must be a valid email address")
      .required("Request is required"),
  });

  const formik = useFormik({
    initialValues: {
      correctionRequest: "",
      id: invoiceId,
      status: "correctionRequested",
      //   remember: true,
    },
    validationSchema: RequestSchema,
    onSubmit: () => {
      setTimeout(async () => {
        await invoiceService
          .invoice_status_update(values)
          .then(function (response) {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
            // openSuccessSnackBar();
          });
        openSuccessSnackBar();
      }, 2000);
      setTimeout(() => {
        onClose();
      }, 2000);

      console.log(values);

      // window.location.href = "/allbill/billinfo/" + invoiceId;
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          autoComplete="correctionRequest"
          type="correctionRequest"
          label="Request"
          multiline
          {...getFieldProps("correctionRequest")}
          error={Boolean(touched.correctionRequest && errors.correctionRequest)}
          helperText={touched.correctionRequest && errors.correctionRequest}
        />
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
          SEND
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
RequestForm.propTypes = {
  invoiceId: PropTypes.number.isRequired,
  openSuccessSnackBar: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
