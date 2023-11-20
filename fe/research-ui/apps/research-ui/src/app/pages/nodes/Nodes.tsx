import { useState } from 'react';
import { Container, Divider } from '@mui/material';

import CategoryList from './category_list/CategoryList';
import EntityTypes from './entity-types/EntityTypes';
import { EntityModel } from '../../models/Entity.Model';

export interface NodedProperties {
  identifier:string
  entities: EntityModel[] | undefined;
}

export function Nodes(props: NodedProperties) {
  const [category, setCategory] = useState('Person');
  const [categories, setCategories] = useState([
    'Person',
    'Business',
    'Government',
    'Information',
    'Company',
  ]);

  const handler = (event: any) => {
    setCategory(event.target.innerText);
  };

  const deleteHandler = (event: any) => {
    const filteredCategories = categories.filter(
      (c) => c !== event.currentTarget.parentNode.innerText
    );
    // if (event.currentTarget.parentNode.innerText !== category) {
    //   setCategory(categories[0]);
    // }
    setCategories(filteredCategories);
  };

  if (categories.filter((c) => c === category).length == 0) {
    setCategory(categories[0]);
  }

  return (
    <Container>
      <EntityTypes
        Category={category}
        Data={categories}
        categorySelectionChanged={handler}
        categoryDeleted={deleteHandler}
      />
      <Divider />
      <CategoryList Category={category} Data={props.entities} />
    </Container>
  );
}

export default Nodes;
