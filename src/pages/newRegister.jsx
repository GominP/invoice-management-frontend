import { Link as RouterLink, useParams } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Container, Typography } from "@mui/material";
// layouts
import AuthLayout from "../component/layouts/AuthLayout";
// components
import { MHidden } from "../component/@material-extend";
import RegisterForm from "../component/controls/RegisterForm";
import { PanoramaSharp } from "@mui/icons-material";
import { useState } from "react";
import ResponsiveSnackbar from "../component/ResponsiveSnackbar";

// ----------------------------------------------------------------------

// const RootStyle = styled(Page)(({ theme }) => ({
//   [theme.breakpoints.up("md")]: {
//     display: "flex",
//   },
// }));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  let params = useParams();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [severity, setServerity] = useState("success");
  const [textSnackbar, setTextSnackbar] = useState("Register successfully.");

  const handleOpenSnackBar = (event, reason) => {
    setOpenSuccess(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  return (
    <Box>
      <ResponsiveSnackbar
        text={textSnackbar}
        severity={severity}
        openSuccess={openSuccess}
        handleClose={handleCloseSnackBar}></ResponsiveSnackbar>
      <AuthLayout>
        Already have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/">
          Login
        </Link>
      </AuthLayout>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {params.role === "biller"
                ? "Get started for create your invoice"
                : "Get started for pay invoice"}
            </Typography>
          </Box>

          <RegisterForm
            role={params.role}
            openSuccessSnackBar={handleOpenSnackBar}
          />
        </ContentStyle>
      </Container>
    </Box>
  );
}
