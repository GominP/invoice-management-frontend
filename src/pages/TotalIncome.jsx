import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ResponsiveHeader from "../component/ResponsiveHeader";
import EarningCard from "../component/EarningCard";
import { gridSpacing } from "../store/constant";
import TotalOrderLineChartCard from "../component/TotalOrderLineChartCard";
import TotalIncomeDarkCard from "../component/TotalIncomeDarkCard";
import TotalIncomeLightCard from "../component/TotalIncomeLightCard";
import TotalGrowthBarChart from "../component/TotalGrowthBarChart";

const TotalIncome = () => {

  return (
    <>
      <Box padding={5}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <EarningCard />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <TotalOrderLineChartCard/>
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item sm={6} xs={12} md={6} lg={12}>
                    <TotalIncomeDarkCard/>
                  </Grid>
                  <Grid item sm={6} xs={12} md={6} lg={12}>
                    <TotalIncomeLightCard/>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={8}>
                <TotalGrowthBarChart/>
              </Grid>
              <Grid item xs={12} md={4}>
                Test
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TotalIncome;
