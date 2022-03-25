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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { blue } from "@mui/material/colors";
import * as authService from "../services/authService";
import axios from "axios";

const theme = createTheme();

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
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Grid>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Grid item>
              <Card>
                <CardMedia />
                <CardContent
                  sx={{
                    // marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}>
                      Login
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        {/* <Link href="#" variant="body2">
                      ลืมรหัสผ่าน
                    </Link> */}
                      </Grid>
                      <Grid item>
                        {/* <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link> */}
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card
                sx={{
                  border: "1px solid",
                  borderColor: blue[300] + 75,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  // ':hover': {
                  //     boxShadow:  '0 2px 14px 0 rgb(32 40 45 / 8%)'
                  // },
                  borderRadius: 3,
                }}>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <StickyNote2Icon />
                </Avatar>
                <CardHeader title={"Not a member yet? Join us now"} />

                <CardActionArea onClick={() => navigate("/register/biller")}>
                  <CardContent
                    sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      Register For Create Invoice
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Divider />
                <CardActionArea onClick={() => navigate("/register/payer")}>
                  <CardContent
                    sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      Register
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Stack>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
