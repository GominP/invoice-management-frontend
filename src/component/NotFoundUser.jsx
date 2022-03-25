import PropTypes from "prop-types";
// material
import { Paper, Typography, Box } from "@mui/material";

// ----------------------------------------------------------------------

NotFoundUser.propTypes = {
  searchQuery: PropTypes.string,
};

export default function NotFoundUser({ searchQuery = "", ...other }) {
  return (
    <Box>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found . Try adding new biller for invoice
      </Typography>
    </Box>
  );
}
