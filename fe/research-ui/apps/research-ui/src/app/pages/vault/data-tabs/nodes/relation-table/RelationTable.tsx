import { EntityModel } from 'apps/research-ui/src/app/models/Entity.Model';
import { RelationModel } from 'apps/research-ui/src/app/models/Relation.Model';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Build_Relationship } from './utils';

export interface RelationTableProps {
  entities: EntityModel[];
  relations: RelationModel[];
}

export function RelationTable(props: RelationTableProps) {
  const columns: GridColDef[] = [
    { field: 'identifier', headerName: 'ID', width: 90 },
    {
      field: 'SourceNode',
      headerName: 'Source',
      flex: 1,
      editable: true,
    },
    {
      field: 'SourceLabel',
      headerName: 'Source Label',
      flex: 1,
      editable: true,
    },
    {
      field: 'RelationType',
      headerName: 'Type of Relation',
      flex: 1,
      editable: true,
    },
    {
      field: 'DestinationNode',
      headerName: 'Destination',

      flex: 1,
      editable: true,
    },
    {
      field: 'DestinationLabel',
      headerName: 'Destination Label',

      flex: 1,
      editable: true,
    },
  ];

  return (
    <DataGrid
      rows={Build_Relationship(props.entities, props.relations)}
      columns={columns}
      getRowId={(row) => row.identifier}
      sx={{ width: '880px', maxWidth: '1080px;' }}
    ></DataGrid>
  );
}

export default RelationTable;
