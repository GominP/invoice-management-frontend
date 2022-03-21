import React from "react";
import MainCard from "../MainCard";
import { gridSpacing } from "../../store/constant";
import {
  Avatar,
  Box,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import TotalLandingIncomeCard from "./TotalLandingIncomeCard";

export default function TotalLanding() {
  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container spacing={1}>
                <Grid item>
                  {/* <Typography variant="subtitle2">Total Growth</Typography> */}
                </Grid>
                <Grid item>
                  <Typography variant="h3">ยอดรวมทั้งหมด</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>234</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Stack direction={"row"} spacing={2}>
            <TotalLandingIncomeCard text="ยอดรวมรายรับ" />
            <TotalLandingIncomeCard text="ยอดรวมรายรับ" />
          </Stack>
          
        </Grid>
      </Grid>
    </MainCard>
  );
}
