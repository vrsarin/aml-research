import { Component, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export interface CategoryListProps {
  Category: string | null;
  Data: any;
}

export class CategoryList extends Component<CategoryListProps> {
  override render() {
    return (
      <Box padding={2}>
        <Typography>{this.props.Category}:</Typography>
        <Box>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <IconButton aria-label="comment">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar alt="Gautam Adani" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Gautam Adani"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      CEO:
                    </Typography>
                    {'Adani Group'}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <IconButton aria-label="comment">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar alt="Priti Adani" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Priti Adani"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Chairperson:
                    </Typography>
                    {'Adani Foundation'}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  }
}

export default CategoryList;
