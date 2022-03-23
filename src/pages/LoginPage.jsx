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

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignIn() {
  let navigate = useNavigate();

  const axios = require("axios");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post("http://localhost:8080/login", {
        username: "granger12",
        password: "hermioneE00@",
      })
      .then(function (response) {
        localStorage.setItem("token", response.data["jwtToken"]);
        console.log(response.data["jwtToken"]);
        navigate("/landing");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          marginTop: 8,
          alignItems: "center",
        }}>
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Grid item>
              <Card>
                <CardMedia />
                <CardContent>
                  {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar> */}
                  <Typography component="h1" variant="h5">
                    ลงชื่อเข้าสู่ระบบ
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
                      label="ชื่อบัญชีผู้ใช้"
                      name="username"
                      autoComplete="username"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="รหัสผ่าน"
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
                      เข้าสู่ระบบ
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
                  // ':hover': {
                  //     boxShadow:  '0 2px 14px 0 rgb(32 40 45 / 8%)'
                  // },
                  borderRadius: 3,
                }}>
                <CardHeader
                  title={"ยังไม่ได้เป็นสมาชิก? สมัครสมาชิกกับเราเลย"}
                />
                <CardActionArea onClick={() => navigate("/register/biller")}>
                  <CardContent
                    sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      สมัครสมาชิกเพื่อสร้างใบแจ้งหนี้
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Divider />
                <CardActionArea onClick={() => navigate("/register/payer")}>
                  <CardContent
                    sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      สมัครสมาชิกเพื่อจ่ายใบแจ้งหนี้
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
