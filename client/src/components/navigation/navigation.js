import React from "react";
import {
  MenuList,
  MenuItem,
  ListItemIcon,
  makeStyles,
} from "@material-ui/core";
import { navigationRoutes } from "./navigationData";
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  padding: {
    padding: "20px",
  },
}));

export default function Navigation() {
  const location = useLocation();
  const classes = useStyles();
  return (
    <MenuList>
      {navigationRoutes.map(({ Logo, navigateTo, title }) => (
        <MenuItem
          button
          key={uuidv4()}
          component={Link}
          to={navigateTo}
          selected={location.pathname === navigateTo}
          className={classes.padding}
        >
          <ListItemIcon>
            <Logo></Logo>
          </ListItemIcon>
          {title}
          {/* <MenuItemText primary={navigateTo} /> */}
        </MenuItem>
      ))}
    </MenuList>
  );
}
