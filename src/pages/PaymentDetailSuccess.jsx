import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  CardHeader,
  CardActionArea,
  Button,
  CardActions,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import img2 from "../asset/images/Cat03.jpg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@mui/styles";
import ResponsiveHeader from "../component/ResponsiveHeader";
import { useEffect, useState } from "react";
import ResponsiveDialog from "../component/ResponsiveDialog";

export default function PaymentDetailSuccess() {
  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Card variant="outlined">
            <Grid>
              <Box>
                <CardContent>
                  {/* <CardHeader title={"ข้อมูลผู้จ่ายบิล"}/> */}
                  <ResponsiveHeader text="ข้อมูลผู้จ่ายใบแจ้งหนี้"></ResponsiveHeader>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Typography>ผู้ติดต่อ :</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>สิ่นชัย มั่นคง</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography>อีเมลล์ :</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>test@gmail.com</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography>เบอร์โทร :</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>0958654531</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <CardActions>
                  <ResponsiveDialog
                    textButton={"ยกเลิกใบแจ้งหนี้"}
                    deleteRelation={true}></ResponsiveDialog>
                  {/* <Button>ยกเลิกใขแจ้งหนี้</Button> */}
                </CardActions>
              </Box>
            </Grid>

            {/* <CardMedia
          component="img"
          //   sx={{ width: 151 }}
          image={img2}
          alt="Live from space album cover"
        /> */}
          </Card>
        </Grid>
      </Box>
    </div>
  );
}