import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import MainCard from "../component/MainCard";
import { gridSpacing } from "../store/constant";
import ResponsiveHeader from "../component/ResponsiveHeader";
import { useEffect, useState } from "react";
// import DateAdapter from '@mui/lab/AdapterMoment';
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";

export default function CreateBill() {
  const [name, setName] = useState("");
  const [total, setTotal] = useState(400);
  const today = new Date().toLocaleString("th-TH").split(" ")[0];
  const [value, setValue] = React.useState(new Date());


  const handleChange = () => {};

  return (
    <>
     {/* <LocalizationProvider dateAdapter={DateAdapter}> */}
      <Box sx={{ p: 3 }}>
        <Grid container>
          <Grid item xs={12} md={7}>
            <Stack direction={{ xs: "column", sm: "row" }} margin={"auto"}>
              <ResponsiveHeader text="ใบวางบิล" />
              <Button variant="outlined" color="success">
                สร้างบิล
              </Button>
            </Stack>
            <MainCard>
              <Box padding={5} margin={"auto"}>
                <Grid spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                        <TextField
                          id="outlined-name"
                          label="ชื่อลูกค้า"
                          value={name}
                          onChange={handleChange}
                        />
                        <Grid pt={3}>
                          <TextField
                            id="outlined-textarea"
                            label="รายละเอียด"
                            placeholder="รายละเอียดลูกค้า"
                            multiline
                          />
                        </Grid>
                        <Grid pt={3}>
                          <TextField
                            id="outlined-textarea"
                            label="ที่อยู่"
                            placeholder="ที่อยู่ลูกค้า"
                            multiline
                          />
                        </Grid>
                      </Grid>
                      <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                        <Grid>
                          <Box>
                            <Grid container>
                              <Grid item xs={4} md={3}>
                                <Typography>ผู้ติดต่อ</Typography>
                              </Grid>
                              <Grid item xs={8} md={9}>
                                <Typography>สิ่นชัย มั่นคง</Typography>
                              </Grid>
                              <Grid item xs={4} md={3}>
                                <Typography>อีเมลล์</Typography>
                              </Grid>
                              <Grid item xs={8} md={9}>
                                <Typography>test@gmail.com</Typography>
                              </Grid>
                              <Grid item xs={4} md={3}>
                                <Typography>เบอร์โทร</Typography>
                              </Grid>
                              <Grid item xs={8} md={9}>
                                <Typography>0958654531</Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                        <Typography sx={{ color: "purple" }} variant="h5">
                          จำนวนเงินทั้งสิ้น
                        </Typography>
                        <Typography>{total} บาท</Typography>
                        <Box>
                          <Grid container>
                            <Grid item xs={4} md={3}>
                              <Typography>วันที่</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                              <TextField
                                id="outlined-name"
                                label="วันที่"
                                disabled
                                value={today}
                              />
                            </Grid>
                            <Grid item xs={4} md={3}>
                              <Typography>ครบกำหนด</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                              {/* <DatePicker
                                disableFuture
                                label="Responsive"
                                openTo="year"
                                views={["year", "month", "day"]}
                                value={value}
                                onChange={(newValue) => {
                                  setValue(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              /> */}
                            </Grid>
                            <Grid item xs={4} md={3}>
                              <Typography>ผู้ออกใบแจ้งหนี้</Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                              <TextField
                                id="outlined-name"
                                label="ผู้ออกใบแจ้งหนี้"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12} md={12} lg={12}>
                        Test
                      </Grid>
                      <Grid item xs={12} md={4}>
                        Test2
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </MainCard>
          </Grid>
        </Grid>
      </Box>
      {/* </LocalizationProvider> */}
    </>
  );
}
