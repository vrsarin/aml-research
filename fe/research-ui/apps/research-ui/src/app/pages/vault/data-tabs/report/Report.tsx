import { Button, Divider, Grid, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
export interface ReportProps {}

export function Report(props: ReportProps) {
  return (
    <Grid>
      <Grid
        container
        spacing={1}
        textAlign={'center'}
        sx={{ fontWeight: 'bold' }}
      >
        <Grid item xs={1.5}>
          <Paper sx={{ backgroundColor: 'lightslategray', color: 'white' }}>
            Type
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper sx={{ backgroundColor: 'lightslategray', color: 'white' }}>
            Analysis
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper sx={{ backgroundColor: 'lightslategray', color: 'white' }}>
            Source
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={1.5}>
          Answer to question
        </Grid>
        <Grid item xs={5}>
          Yes, Gautam Adani does own several companies. Some of the major
          subsidiaries of Adani Group, which is owned by Gautam Adani, include
          Adani Ports and Special Economic Zone Ltd, Adani Power Ltd, Adani
          Enterprises Ltd, Adani Transmission Ltd, Adani Green Energy Ltd, and
          Adani Gas Ltd. These companies operate in various sectors such as
          ports, power generation, infrastructure, renewable energy, and gas
          distribution.
        </Grid>
        <Grid item xs>
          Does Gautam Adani own any company? if yes, provide all subsidiaries
          also.
        </Grid>
        <Grid>
          <IconButton color="primary" aria-label="Open Related Documents">
            <OpenInNewIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="primary" aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={1.5}>
          Answer to question
        </Grid>
        <Grid item xs={5}>
          There are different types of secrets. She had held onto plenty of them
          during her life, but this one was different. She found herself holding
          onto the worst type. It was the type of secret that could gnaw away at
          your insides if you didn't tell someone about it, but it could end up
          getting you killed if you did.
        </Grid>
        <Grid item xs>
          How many secrets are there?
        </Grid>
        <Grid>
          <IconButton color="primary" aria-label="Open Related Documents">
            <OpenInNewIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="primary" aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={1.5}>
          Answer to question
        </Grid>
        <Grid item xs={5}>
          Patricia's friend who was here hardly had any issues at all, but she
          wasn't telling the truth. Yesterday, before she left to go home, she
          heard that her husband is in the hospital and pretended to be
          surprised. It later came out that she was the person who had put him
          there.
        </Grid>
        <Grid item xs>
          Who is particia's friend?
        </Grid>
        <Grid>
          <IconButton color="primary" aria-label="Open Related Documents">
            <OpenInNewIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="primary" aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider>Report</Divider>
      <Grid container spacing={2}>
        <Grid item xs></Grid>
        <Grid item>
          <Button variant="contained">
            <SummarizeIcon />
            Generate Report
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained">
            <FolderZipIcon />
            Download zip
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained">
            <PictureAsPdfIcon />
            Download PDF
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Report;
