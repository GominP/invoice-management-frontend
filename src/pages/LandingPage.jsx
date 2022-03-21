import React from "react";
import {
  Box,
  Grid,
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import EarningCard from "../component/dashboardTotal/EarningCard";
import { gridSpacing } from "../store/constant";
import TotalOrderLineChartCard from "../component/dashboardTotal/TotalOrderLineChartCard";
import TotalIncomeDarkCard from "../component/dashboardTotal/TotalIncomeDarkCard";
import TotalIncomeLightCard from "../component/dashboardTotal/TotalIncomeLightCard";
import TotalGrowthBarChart from "../component/dashboardTotal/TotalGrowthBarChart";
import WelcomeCard from "../component/landingDashboard/WelcomeCard";
import NotiCard from "../component/landingDashboard/NotiCard";
import TotalLanding from "../component/landingDashboard/TotalLanding";
import TotalLandingIncomeCard from "../component/landingDashboard/TotalLandingIncomeCard";
import CardTotal from "../component/landingDashboard/CardTotal";
import { useEffect, useState } from "react";

const billerText = [
  "ยอดรวมรายรับของวันนี้",
  "ยอดรวมรายรับของเดือนนี้",
  "ยอดรวมรายรับของปีนี้",
];
const payerText = [
  "ยอดรวมรายจ่ายของวันนี้",
  "ยอดรวมรายจ่ายของเดือนนี้",
  "ยอดรวมรายจ่ายของปีนี้",
];

export default function LandingPage() {
  const [isBiller, setIsBiller] = useState(false);
  return (
    <div>
      <Box padding={5} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <WelcomeCard />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <NotiCard />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              {isBiller === true
                ? billerText.map((option) => (
                    <Grid item xs={12} md={4}>
                      <CardTotal text={option}></CardTotal>
                    </Grid>
                  ))
                : payerText.map((option) => (
                    <Grid item xs={12} md={4}>
                      <CardTotal text={option}></CardTotal>
                    </Grid>
                  ))}
              {/* <Grid item xs={12} md={4}>
                <CardTotal text="ยอดรายรับของวันนี้"></CardTotal>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardTotal text="ยอดรายรับของเดือนนี้"></CardTotal>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardTotal text="ยอดรายรับของปีนี้" amount={3}></CardTotal>
              </Grid> */}

              {/* <Grid item xs={12} md={4}>
                Test
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
