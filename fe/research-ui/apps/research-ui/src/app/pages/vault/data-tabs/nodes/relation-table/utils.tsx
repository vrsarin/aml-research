import { EntityModel } from 'apps/research-ui/src/app/models/Entity.Model';
import { RelationModel } from 'apps/research-ui/src/app/models/Relation.Model';

export interface RelationData {
  identifier: string;
  SourceNode: string;
  SourceElementId: string;
  SourceLabel: string;
  DestinationNode: string;
  DestinationElementId: string;
  DestinationLabel: string;
  RelationType: string;
}

export function Build_Relationship(
  entities: EntityModel[],
  relations: RelationModel[]
): RelationData[] {
  const result: RelationData[] = [];

  for (let index = 0; index < relations.length; index++) {
    const relation = relations[index];
    const source =
      entities[
        entities.findIndex((r) => r.elementId === relation.sourceElementId)
      ];
    const dest =
      entities[
        entities.findIndex((r) => r.elementId === relation.destinationElementId)
      ];

    const newElement: RelationData = {
      identifier: relation.identifier,
      SourceNode: source.id,
      SourceElementId: relation.sourceElementId,
      SourceLabel: source.labels[0],
      DestinationNode: dest.id,
      DestinationElementId: relation.destinationElementId,
      DestinationLabel: dest.labels[0],
      RelationType: relation.relationType,
    };
    result.push(newElement);
  }
  return result;
}
