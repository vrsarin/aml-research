import { Box, Button, TextField, Typography } from '@mui/material';

/* eslint-disable-next-line */
export interface MergeEntitiesProps {}

export function MergeEntities(props: MergeEntitiesProps) {
  return (
    <Box>
      <Box>
        Question:
        <TextField rows={10} />
      </Box>
      <Box>
        <Typography>Question 1</Typography>
        <Typography>Answer 1</Typography>
        <Typography>Question 2</Typography>
        <Typography>
          Answer 2<Button>Add for Analysis</Button>
        </Typography>
      </Box>
    </Box>
  );
}

export default MergeEntities;
