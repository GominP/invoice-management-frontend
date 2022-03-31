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

export default function RegisterForm(props) {
  const { role, openSuccessSnackBar } = props;
  const navigate = useNavigate();
  let params = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),

    lastname: Yup.string().required("Last name required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Password must match")
      .required("Confrim Password is required"),

    phone: Yup.string().required("Phone number is required"),
    citizenId: Yup.string()
      .min(8, "Too Short!")
      .required("Citizen ID is required"),
    taxId: Yup.string().min(8, "Too Short!").required("Tax ID is required"),
    isCitizen: Yup.bool().required("Please Select "),
    addressDetail: Yup.string().required("Address detail is required"),
    road: Yup.string().required("Road is required"),
    district: Yup.string().required("District is required"),
    subDistrict: Yup.string().required("Subdistrict is required"),
    province: Yup.string().required("Province is required"),
    zipCode: Yup.string().required("Zipcode is required"),
    role: "",
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      // confirmPassword: "",
      name: "",
      lastname: "",
      phone: "",
      citizenId: "",
      taxId: "",
      isCitizen: true,
      addressDetail: "",
      road: "",
      district: "",
      subDistrict: "",
      province: "",
      zipCode: "",
      role: params.role,
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log(values);
      setTimeout(() => {
        authService.postRegiter(values);
      }, 2000);
      setTimeout(() => {
        openSuccessSnackBar();
        setSubmitting(!isSubmitting);
      }, 3000);
      setTimeout(() => {
        navigate("/");
      }, 4000);
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
    handleChange,

    setFieldValue,
    setFieldError,
  } = formik;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // const handleExist = (e) => {
  //   console.log(e.target.value);
  //   const checkUsername = authService.username_exists(e.target.value);
  //   if (checkUsername === true) {
  //     setFieldValue("name", e.target.value);
  //   } else {
  //     setFieldError("name", "Username is Exist");
  //   }
  // };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              // onChange={(e) => {
              //   console.log("onChange", e.currentTarget.value);
              //   handleExist(e);
              // }}
              fullWidth
              label="Firstname"
              // onChange={handleExist}
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              label="Lastname"
              {...getFieldProps("lastname")}
              error={Boolean(touched.lastname && errors.lastname)}
              helperText={touched.lastname && errors.lastname}
            />
          </Stack>

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
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showConfirmPassword ? "text" : "confirmPassword"}
            label="Confirm Password"
            {...getFieldProps("confirmPassword")}
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
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          <TextField
            fullWidth
            label="Phone number"
            {...getFieldProps("phone")}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Address detail"
              {...getFieldProps("addressDetail")}
              error={Boolean(touched.addressDetail && errors.addressDetail)}
              helperText={touched.addressDetail && errors.addressDetail}
            />

            <TextField
              fullWidth
              label="Road"
              {...getFieldProps("road")}
              error={Boolean(touched.road && errors.road)}
              helperText={touched.road && errors.road}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Subdistrict"
              {...getFieldProps("subDistrict")}
              error={Boolean(touched.subDistrict && errors.subDistrict)}
              helperText={touched.subDistrict && errors.subDistrict}
            />

            <TextField
              fullWidth
              label="District"
              {...getFieldProps("district")}
              error={Boolean(touched.district && errors.district)}
              helperText={touched.district && errors.district}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Province"
              {...getFieldProps("province")}
              error={Boolean(touched.province && errors.province)}
              helperText={touched.province && errors.province}
            />

            <TextField
              fullWidth
              label="Zipcode"
              {...getFieldProps("zipCode")}
              error={Boolean(touched.zipCode && errors.zipCode)}
              helperText={touched.zipCode && errors.zipCode}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Citizen ID"
              {...getFieldProps("citizenId")}
              error={Boolean(touched.citizenId && errors.citizenId)}
              helperText={touched.citizenId && errors.citizenId}
            />

            <TextField
              fullWidth
              label="Tax ID"
              {...getFieldProps("taxId")}
              error={Boolean(touched.taxId && errors.taxId)}
              helperText={touched.taxId && errors.taxId}
            />
          </Stack>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              {...getFieldProps("isCitizen")}
              error={Boolean(touched.isCitizen && errors.isCitizen)}
              helperText={touched.isCitizen && errors.isCitizen}>
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Person"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Legal"
              />
            </RadioGroup>
          </FormControl>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

RegisterForm.propTypes = {
  role: PropTypes.string,
  openSuccessSnackBar: PropTypes.func.isRequired,
  // onClose: PropTypes.func.isRequired,
};
