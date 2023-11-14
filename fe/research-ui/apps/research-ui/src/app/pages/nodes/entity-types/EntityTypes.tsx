import { Box, Typography, Stack, Chip } from '@mui/material';
import { MouseEventHandler } from 'react';

export interface EntityTypesProps {
  Category: string;
  Data: string[];
  categorySelectionChanged: MouseEventHandler<HTMLDivElement> | undefined;
  categoryDeleted: ((event: any) => void) | undefined;
}

export function EntityTypes(props: EntityTypesProps) {
  function renderChip(value: string): any {
    if (value === props.Category) {
      return (
        <Chip
          label={value}
          onClick={props.categorySelectionChanged}
          onDelete={props.categoryDeleted}
          color="primary"
        />
      );
    } else {
      return (
        <Chip
          label={value}
          onClick={props.categorySelectionChanged}
          onDelete={props.categoryDeleted}
        />
      );
    }
  }

  return (
    <Box padding={1}>
      <Typography>Categories:</Typography>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        padding={3}
      >
        {props.Data.map((r) => renderChip(r))}
      </Stack>
    </Box>
  );
}

export default EntityTypes;
