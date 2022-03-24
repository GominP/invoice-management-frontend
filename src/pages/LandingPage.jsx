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
import { setRole, setId, getUsers } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

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
const url = "http://localhost:8080/";
export default function LandingPage() {
  //redux
  const users = useSelector(getUsers);
  const id = useSelector((state) => state.users.userid);

  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState("");
  //---------------
  const [isBiller, setIsBiller] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const [dayTotal, setDayTotal] = useState();
  const [monthTotal, setMonthTotal] = useState();
  const [yearTotal, setYearTotal] = useState();
  const allTotal = {
    dayTotal,
    monthTotal,
    yearTotal,
  };

  useEffect(() => {
    axios
      .post(
        url + "landing",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then(function (response) {
        if (response.data["biller"] === null) {
          setDataInfo(response.data["payer"]);
          dispatch(setRole("payer"));
          localStorage.setItem("userId", response.data["payer"]["id"]);
          dispatch(setId(response.data["payer"]["id"]));
          setDayTotal(response.data["payer"]["totalIncomeToday"]);
          setDayTotal(response.data["payer"]["totalIncomeThisMonth"]);
          setDayTotal(response.data["payer"]["totalIncomeThisYear"]);
        } else {
          setDataInfo(response.data["biller"]);
          dispatch(setRole("biller"));
          dispatch(setId(response.data["payer"]["id"]));
        }
      });
  }, []);

  return (
    <div>
      <Box padding={5} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <WelcomeCard name={dataInfo.name} />
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
                : payerText.map((option,index) => (
                    <Grid item xs={12} md={4}>
                      <CardTotal text={option} amount={allTotal[index]}></CardTotal>
                    </Grid>
                  ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
