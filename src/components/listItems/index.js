import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FavoriteIcon from '@mui/icons-material/Favorite';

function CustomListItem({ index, primaryText, isActive, handleClick }) {
  return (
    <ListItemButton onClick={() => handleClick(index)} selected={isActive}>
      <ListItemIcon>
        {index === 0 ? <DashboardIcon /> : <FavoriteIcon />}
      </ListItemIcon>
      <ListItemText primary={primaryText} />
    </ListItemButton>
  );
}

export const mainListItems = (
  <>
    <CustomListItem index={0} primaryText="Dashboard" />
    <CustomListItem index={1} primaryText="Favourites" />
  </>
);