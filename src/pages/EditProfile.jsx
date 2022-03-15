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
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";





const useStyles = makeStyles((theme) => ({
  previewChip: {
    minWidth: 160,
    maxWidth: 210
  },
}));

const EditProfile = () => {
  const classes = useStyles();
  const theme = useTheme();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <ResponsiveHeader text="รายละเอียดของผู้จ่ายบิล"></ResponsiveHeader>
      <Box sx={{ px: 5 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 2, sm: 8, md: 12, xl: 20 }}>
          <Grid item xs={2} sm={5} md={8} xl={12}>
            <Card>
              <CardMedia />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Testss
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Des
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={2} sm={3} md={4} xl={8}>
            <Card>
              <CardMedia />
              <CardContent>

                <Typography gutterBottom variant="h5" component="h2">
                  Testss
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Des
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EditProfile;
