import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Divider,
  Stack,
} from "@mui/material";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { blue } from "@mui/material/colors";
import * as authService from "../services/authService";
import axios from "axios";
import LoginForm from "../component/controls/LoginForm";
import RegisterCard from "../component/landingDashboard/RegisterCard";

const theme = createTheme();

const ContentStyle = styled("div")(({ theme }) => ({
  fontFamily: ["Kanit", "sans-serif"].join(","),
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

export default function SignIn() {
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataLogin = {
      username: data.get("username"),
      password: data.get("password"),
    };
    await authService.login(dataLogin);
  };

  return (
 
      <Box>
        <Container maxWidth="sm">
          <ContentStyle>
            <Card>
              <CardContent>
                <Stack sx={{ mb: 5 }}>
                  <Typography variant="h4" gutterBottom>
                    Sign in to Invoice Guard
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    Enter your details below.
                  </Typography>
                </Stack>
                {/* <AuthSocial /> */}
                <LoginForm />
              </CardContent>
            </Card>

            <Grid item sx={{ mt: 3 }}>
              <Card
                sx={{
                  border: "1px solid",
                  borderColor: blue[600],
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                  borderRadius: 3,
                }}>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <StickyNote2Icon />
                </Avatar>

                <CardActionArea onClick={() => navigate("/register/biller")}>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}>
                    <Stack direction={"column"}>
                      <RegisterCard
                        headText="Register to create invoice"
                        handleNavigate="biller"
                      />
                      <RegisterCard
                        headText="Register to pay invoice"
                        handleNavigate="payer"
                      />
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </ContentStyle>
        </Container>
      </Box>

  );
}
