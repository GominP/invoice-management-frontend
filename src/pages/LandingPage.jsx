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
import axios from "axios";
import {
  setRole,
  setId,
  setNotiCount,
  getRole,
  getUserID,
  getNotiCount,
} from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import * as authService from "../services/authService";

const billerText = [
  "Total Income Today",
  "Total Income This Month",
  "Total Income This Year",
];
const payerText = [
  "Total Expenses Today",
  "Total Expenses This Month",
  "Total Expenses This Year",
];
const url = "http://localhost:8080/";
export default function LandingPage() {
  //redux
  const users = useSelector(getRole);
  const id = useSelector(getUserID);

  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState("");
  // const [countNoti, setCountNoti] = useState();
  const noti = useSelector(getNotiCount);

  //---------------
  const [isBiller, setIsBiller] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const [dayTotal, setDayTotal] = useState();
  const [monthTotal, setMonthTotal] = useState();
  const [yearTotal, setYearTotal] = useState();
  const allTotal = [dayTotal, monthTotal, yearTotal];

  useEffect(() => {
    callApiLanding();
  }, []);

  const callApiLanding = async () => {
    let textRole = "";
    let textTotal = "";
    await authService.landing().then(function (response) {
      response.data["biller"] === null
        ? (textRole = "payer")
        : (textRole = "biller");
      response.data["biller"] === null
        ? (textTotal = "totalExpenses")
        : (textTotal = "totalIncome");

      setDataInfo(response.data[textRole]);
      dispatch(setRole(textRole));
      dispatch(setId(response.data[textRole]["id"]));
      dispatch(setNotiCount(response.data["unreadCount"]));

      setDayTotal(response.data[textTotal + "Today"]);
      setMonthTotal(response.data[textTotal + "ThisMonth"]);
      setYearTotal(response.data[textTotal + "ThisYear"]);

      console.log(users);
      console.log(id);
    });
  };

  // const setTotal = () => {
  //   allTotal[0];
  // };

  return (
    <div>
      <Box padding={5} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <WelcomeCard name={dataInfo.name + " " + dataInfo.lastname} />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <NotiCard notification={noti} />
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
                : payerText.map((option, index) => (
                    <Grid item xs={12} md={4}>
                      <CardTotal
                        text={option}
                        amount={allTotal[index]}></CardTotal>
                    </Grid>
                  ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
