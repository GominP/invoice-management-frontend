import React from "react";
import ResponsiveHeader from "../component/ResponsiveHeader";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Grid,
  Divider,
  Card,
} from "@mui/material/";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { gridSpacing } from "../store/constant";
import MainCard from "../component/MainCard";
import CreateBill from "./CreateBill";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ResponsiveDialog from "../component/ResponsiveDialog";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

export default function CheckBillInfo(props) {
  const theme = useTheme();
  const { isPayerBill, rows, status,requestEdit } = props;

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Grid container>
          <Grid item xs={12} md={7}>
            <MainCard>
              <Stack direction={{ xs: "column", sm: "row" }} margin={"auto"}>
                <ResponsiveHeader text="ตรวจสอบบิล" />
                <Button variant="outlined" color="error">
                  {status}
                </Button>
              </Stack>

              <Box padding={5} margin={"auto"}>
                <Stack direction={{ xs: "column", sm: "row" }}>
                  <Grid spacing={gridSpacing}>
                    <Grid item xs={12}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                          บริษัทใจดี จำกัด
                          <Grid pt={3}>
                            <Typography variant="h5" sx={{ color: "purple" }}>
                              ลูกค้า
                            </Typography>
                            <Box>บริษัทใจดี</Box>
                            <Box>อำเภอ กระบี่</Box>
                            เลขประจำตัวผู้เสียภาษี 123456789
                          </Grid>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                          <Grid pt={3}>
                            <Typography sx={{ color: "purple" }} variant="h5">
                              ใบแจ้งหนี้ต้นฉบับ
                            </Typography>
                            <Divider />
                            <Box>
                              <Grid container>
                                <Grid item xs={4} md={3}>
                                  <Typography>เลขที่</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>123123345</Typography>
                                </Grid>
                                <Grid item xs={4} md={3}>
                                  <Typography>วันที่</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>12/06/2562</Typography>
                                </Grid>
                                <Grid item xs={4} md={3}>
                                  <Typography>ครบกำหนด</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>12/07/2562</Typography>
                                </Grid>
                                <Grid item xs={4} md={3}>
                                  <Typography>ผู้ขาย</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>นาย สินชัย มั่นคง</Typography>
                                </Grid>
                              </Grid>
                            </Box>
                            <Divider />
                            <Box>
                              <Grid container>
                                <Grid item xs={4} md={3}>
                                  <Typography>ผู้ติดต่อ</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>นาย ทรัพย์ ทวี</Typography>
                                </Grid>
                                <Grid item xs={4} md={3}>
                                  <Typography>เบอร์โทร</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>0958654531</Typography>
                                </Grid>
                                <Grid item xs={4} md={3}>
                                  <Typography>อีเมลล์</Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                  <Typography>test@gmail.com</Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={12} lg={12}>
                          <TableContainer>
                            <Table aria-label="spanning table">
                              <TableHead>
                                <TableRow>
                                  <TableCell>รายละเอียด</TableCell>
                                  <TableCell align="right">จำนวน</TableCell>
                                  <TableCell align="right">
                                    ราคาต่อหน่วย
                                  </TableCell>
                                  <TableCell align="right">ยอดรวม</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map((row) => (
                                  <TableRow key={row.desc}>
                                    <TableCell>{row.desc}</TableCell>
                                    <TableCell align="right">
                                      {row.qty}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.unit}
                                    </TableCell>
                                    <TableCell align="right">
                                      {ccyFormat(row.price)}
                                    </TableCell>
                                  </TableRow>
                                ))}

                                <TableRow>
                                  <TableCell rowSpan={3} />
                                  <TableCell colSpan={2}>รวมเป็นเงิน</TableCell>
                                  <TableCell align="right">
                                    {ccyFormat(invoiceSubtotal)}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>ภาษีมูลค่าเพิ่ม </TableCell>
                                  <TableCell align="right">{`${(
                                    TAX_RATE * 100
                                  ).toFixed(0)} %`}</TableCell>
                                  <TableCell align="right">
                                    {ccyFormat(invoiceTaxes)}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell colSpan={2}>
                                    จำนวนเงินทั้งสิ้น
                                  </TableCell>
                                  <TableCell align="right">
                                    {ccyFormat(invoiceTotal)}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Stack>
              </Box>
            </MainCard>
          </Grid>
          {isPayerBill ? (
            <Grid>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                  md: "column",
                }}
                spacing={1}>
                <ResponsiveDialog textButton="จ่ายบิล" requestEdit={false}></ResponsiveDialog>
                <ResponsiveDialog textButton="ส่งคำร้องขอแก้ไข" requestEdit={true}></ResponsiveDialog>
              </Stack>
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </>
  );
}
CheckBillInfo.propTypes = {
  isPayerBill: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  requestEdit: PropTypes.bool.isRequired,


};
