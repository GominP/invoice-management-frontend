import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

function ResponsiveHeader(props) {
  return (
    <div>
      <Box sx={{ flexGrow: 1, px: 5 }}>
        <Typography variant="h5"  gutterBottom component="div">
          {props.text}
        </Typography>
      </Box>
    </div>
  );
}

ResponsiveHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ResponsiveHeader;
