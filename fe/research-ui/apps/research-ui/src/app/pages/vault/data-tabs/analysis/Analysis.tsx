import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

/* eslint-disable-next-line */
export interface AnalysisProps {}

export function Analysis(props: AnalysisProps) {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item>Question: </Grid>
        <Grid xs item>
          <TextField
            fullWidth
            rows={2}
            multiline
            value={
              'Does Gautam Adani own any company? if yes, provide all subsidiaries also.'
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item>Answer: </Grid>
        <Grid xs item>
          <Typography padding={2} color="primary">
            Yes, Gautam Adani does own several companies. Some of the major
            subsidiaries of Adani Group, which is owned by Gautam Adani, include
            Adani Ports and Special Economic Zone Ltd, Adani Power Ltd, Adani
            Enterprises Ltd, Adani Transmission Ltd, Adani Green Energy Ltd, and
            Adani Gas Ltd. These companies operate in various sectors such as
            ports, power generation, infrastructure, renewable energy, and gas
            distribution.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs></Grid>
        <Grid item>
          <Button variant="contained">Add to Summary</Button>
        </Grid>
        <Grid item>
          <Button variant="contained">Add to Report</Button>
        </Grid>
      </Grid>
      <Divider>History</Divider>
    </Box>
  );
}

export default Analysis;
