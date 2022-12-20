import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { shadows } from '@mui/system';

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.3rem 1.3rem 0.8rem 1.3rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.8rem",
  boxShadow: theme.shadows[3],
}));

export default WidgetWrapper;