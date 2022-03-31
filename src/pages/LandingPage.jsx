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
import CardTotal3 from "../component/landingDashboard/CardTotal3";
import CardTotal2 from "../component/landingDashboard/CardTotal2";
import TestCard from "../component/landingDashboard/TestCard";
import NavigateCard from "../component/landingDashboard/NavigateCard";
import payerIcon from "../asset/images/payer.png";
import billerIcon from "../asset/images/biller.png";
import paymentIcon from "../asset/images/notes.png";
import invoiceIcon from "../asset/images/bill.png";
import { useNavigate, useLocation } from "react-router-dom";

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

export default function LandingPage() {
  //redux
  const role = useSelector(getRole);
  const id = useSelector(getUserID);
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState("");
  // const [countNoti, setCountNoti] = useState();
  const noti = useSelector(getNotiCount);

  let navigate = useNavigate();

  //---------------
  const [isBiller, setIsBiller] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const [dayTotal, setDayTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);
  const [yearTotal, setYearTotal] = useState(0);
  const allTotal = [dayTotal, monthTotal, yearTotal];
  const [rowTotalText, setRowTotalText] = useState([]);

  useEffect(() => {
    callApiLanding();
  }, [rowTotalText]);

  const callApiLanding = async () => {
    let textRole = "";
    let textTotal = "";
    await authService.landing().then(function (response) {
      if (response.data["biller"] === null) {
        textRole = "payer";
        textTotal = "totalExpenses";
        setRowTotalText(payerText);
      } else {
        textRole = "biller";
        textTotal = "totalIncome";
        setRowTotalText(billerText);

        setIsBiller(true);
      }

      setDataInfo(response.data[textRole]);
      dispatch(setRole(textRole));
      dispatch(setId(response.data[textRole]["id"]));
      dispatch(setNotiCount(response.data["unreadCount"]));

      setDayTotal(response.data[textTotal + "Today"]);
      setMonthTotal(response.data[textTotal + "ThisMonth"]);
      setYearTotal(response.data[textTotal + "ThisYear"]);
    });
  };

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
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <NavigateCard
                  headText={role === "biller" ? "PAYERS" : "BILLER"}
                  detail={role === "biller" ? "Check detail about payer." : "Check detail about biller."}
                  img={role === "biller" ? payerIcon : billerIcon}
                  handleNavigate={"/payer"}
                />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <NavigateCard
                  headText="INVOICES"
                  detail="Check All Invoices. Oh wait  Did u know invoice ?  "
                  img={invoiceIcon}
                  handleNavigate={"/allbill"}
                />
              </Grid>

              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item sm={6} xs={12} md={6} lg={12}>
                    <CardTotal
                      text={rowTotalText[0]}
                      amount={allTotal[0]}></CardTotal>
                  </Grid>
                  <Grid item sm={6} xs={12} md={6} lg={12}>
                    <CardTotal2
                      text={rowTotalText[1]}
                      amount={allTotal[1]}></CardTotal2>
                  </Grid>
                  <Grid item sm={6} xs={12} md={6} lg={12}>
                    <CardTotal3
                      text={rowTotalText[2]}
                      amount={allTotal[2]}></CardTotal3>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {/* <NavigateCard headText="PAYMENTS" detail="" img={paymentIcon} /> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
