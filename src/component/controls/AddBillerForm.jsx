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
import * as relationService from "../../services/relationService";
import * as billerServices from "../../services/billerServices";

// ----------------------------------------------------------------------

export default function AddBillerForm(props) {
  const {
    role,
    openSuccessSnackBar,
    textSnackbar,
    openSuccess,
    serverity,
    payerId,
  } = props;
  const navigate = useNavigate();
  let params = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
  });

  const formik = useFormik({
    initialValues: {
      payerId: payerId,
      code: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log(values);
      const check = billerServices
        .biller_detail_inquiry({ code: values.code })
        .then(async function (response) {
          const addBiller = await relationService
            .relationship_create(values)
            .then(function (test) {
              textSnackbar("Add biller successful");
              serverity("success");

              setTimeout(() => {
                setSubmitting(!isSubmitting);
                openSuccess(true);
              }, 4000);
            })
            .catch((err) => {
              textSnackbar("Somthing wrong with Server");
              serverity("error");
              openSuccess(true);
            });
        })
        .catch((err) => {
          setSubmitting(!isSubmitting);
          setFieldError("code", "Code is invalid");
        });
      //   setTimeout(() => {
      //     authService
      //       .password_update(values)
      //       .then(function (response) {
      //         console.log(response);
      //         textSnackbar("Change password Successful");
      //         serverity("success");
      //         // openSuccess(true);
      //         handleClosePassword();
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //         if (err.response.status === 500) {
      //           setSubmitting(!isSubmitting);
      //           textSnackbar("Old password is invalid");
      //           serverity("error");
      //           openSuccess(true);
      //           //   Yup.object().shape({
      //           //     oldPassword: Yup.string().required("Old Password is invalid"),
      //           //   });

      //           //   handleClosePassword()
      //         }
      //       });
      //   }, 4000);
      //   setTimeout(() => {
      //     openSuccess(true);
      //   }, 7000);
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
    setFieldError,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Code"
            {...getFieldProps("code")}
            error={Boolean(touched.code && errors.code)}
            helperText={touched.code && errors.code}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}>
            Add biller
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

AddBillerForm.propTypes = {
  role: PropTypes.string,
  openSuccessSnackBar: PropTypes.func.isRequired,
  textSnackbar: PropTypes.func.isRequired,
  serverity: PropTypes.func.isRequired,
  openSuccess: PropTypes.func.isRequired,
  payerId: PropTypes.number.isRequired,
};
