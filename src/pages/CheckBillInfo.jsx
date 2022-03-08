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
} from "@mui/material/";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { gridSpacing } from "../store/constant";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function CheckBillInfo() {
  return (
    <>
      <ResponsiveHeader text="ตรวจสอบบิล" />
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
                          <TableCell align="right">ราคาต่อหน่วย</TableCell>
                          <TableCell align="right">ยอดรวม</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.desc}>
                            <TableCell>{row.desc}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right">{row.unit}</TableCell>
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
                          <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                            0
                          )} %`}</TableCell>
                          <TableCell align="right">
                            {ccyFormat(invoiceTaxes)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>จำนวนเงินทั้งสิ้น</TableCell>
                          <TableCell align="right">
                            {ccyFormat(invoiceTotal)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                {/* <Grid item xs={12} md={4}>
                    Test2
                  </Grid> */}
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid>
            <Stack direction={{sm: "column"}}>
              <Button>Test</Button>
              <Button>Test</Button>
            </Stack>
          </Grid> */}
        </Stack>
      </Box>
    </>
  );
}
