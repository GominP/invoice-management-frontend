import * as React from "react";
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

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@mui/styles";
import ResponsiveHeader from "../component/ResponsiveHeader";
import { useEffect, useState } from "react";
import ResponsiveDialog from "../component/ResponsiveDialog";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  setRole,
  setId,
  setNotiCount,
  getRole,
  getUserID,
  getNotiCount,
} from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import * as billerService from "../services/billerServices";
import * as payerService from "../services/payerService";
import * as relationService from "../services/relationService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: 800,
    [theme.breakpoints.down("md")]: {
      maxWidth: 600,
    },
  },
  media: {
    height: 300,
  },
}));

export default function DetailUser() {
  const theme = useTheme();
  const classes = useStyles();
  let params = useParams();
  const role = useSelector(getRole);
  const userId = useSelector(getUserID);

  const [textHeader, setTextHeader] = useState("Payer Information ");
  const [dataInfo, setDataInfo] = useState({});
  const [relation_id, setRelation_id] = useState();

  useEffect(() => {
    callApi();

    if (role === "payer") {
      setTextHeader("Biller Information ");
    }
  }, []);

  const callApi = async () => {
    let data = { id: params.id };

    if (role === "biller") {
      await payerService.payer_detail_inquiry(data).then(function (response) {
        setDataInfo(response);
      });
    } else if (role === "payer") {
      billerService.biller_detail_inquiry(data).then(function (response) {
        setDataInfo(response);
      });
    }

    // dataInfo.id
  };

  const handleDisconnet = () => {
    console.log("test cancel");
    let data = {};
    role === "biller"
      ? (data = { billerId: userId, payerId: params.id })
      : (data = { billerId: params.id, payerId: userId });
    relationService.relationship_status_update(data).then(function (response) {
      console.log(response);
      window.location.href = "/payer";
    });
    // relationship_status_update
  };

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Card className={classes.root} variant="outlined">
            <Grid>
              <Box>
                <CardContent>
                  <ResponsiveHeader text={textHeader}></ResponsiveHeader>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Typography>Name :</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>
                          {dataInfo.name} {dataInfo.lastname}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography>Address :</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>
                          {dataInfo.addressDetail} {dataInfo.subDistrict}{" "}
                          {dataInfo.district} {dataInfo.road}{" "}
                          {dataInfo.province} {dataInfo.zipCode}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography>Phone number :</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>0958654531</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography>Tax id :</Typography>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography>{dataInfo.taxId}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <ResponsiveDialog
                    onClick={handleDisconnet}
                    status={params.status}
                    textButton={
                      params.status === "inactive" ? "Connect" : "Disconnect"
                    }
                    deleteRelation={true}
                    color={
                      params.status === "inactive" ? "success" : "error"
                    }></ResponsiveDialog>
                </CardActions>
              </Box>
            </Grid>
          </Card>
        </Grid>
      </Box>
    </div>
  );
}
