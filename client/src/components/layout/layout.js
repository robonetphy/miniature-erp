import React, { useState, useEffect, useCallback } from "react";
import {
  makeStyles,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Navigation from "../navigation";
import { routes, defaultRoute } from "./routeData";
import { v4 as uuidv4 } from "uuid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CustomModal from "../modal";
import {
  CreateStock,
  CreatePurchase,
  CreateInvoice,
  CreateBreakage,
  CreateReturn,
  CreateCompany,
  AddMerchant,
  ManageHSN,
  ManageType,
  ManageSize,
} from "../forms";
const { ipcRenderer } = window.require("electron");
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Layout() {
  const classes = useStyles();
  const [ModalStack, setModalStack] = useState([]);
  const modalStackPop = () => {
    setModalStack((prev) =>
      prev.filter((item, index) => prev.length - 1 !== index)
    );
  };

  const ModalData = {
    Purchase: {
      showModal: true,
      closeModal: modalStackPop,
      modalTitle: "Create New Purchase",
      ModalType: CreatePurchase,
      modalWidth: "100vw",
      modalHeight: "99vh",
    },
    Stock: {
      showModal: true,
      closeModal: modalStackPop,
      modalTitle: "Create New Stock",
      ModalType: CreateStock,
      modalWidth: "40vw",
      modalHeight: "65vh",
    },
    Company: {
      showModal: true,
      closeModal: modalStackPop,
      modalTitle: "Create New Company",
      ModalType: CreateCompany,
      modalWidth: "40vw",
      modalHeight: "40vh",
    },
    Breakage: {
      showModal: true,
      closeModal: modalStackPop,
      modalTitle: "Create New Breakage",
      ModalType: CreateBreakage,
      modalWidth: "100vw",
      modalHeight: "99vh",
    },
    Return: {
      showModal: true,
      closeModal: modalStackPop,
      modalTitle: "Create New Return",
      ModalType: CreateReturn,
      modalWidth: "100vw",
      modalHeight: "99vh",
    },
    Merchant: {
      showModal: true,
      closeModal: modalStackPop,
      modalTitle: "Add New Merchant",
      ModalType: AddMerchant,
      modalWidth: "40vw",
      modalHeight: "75vh",
    },
    Invoice: {
      showModal: true,
      closeModal: modalStackPop,
      modalTitle: "Create New Invoice",
      ModalType: CreateInvoice,
      modalWidth: "100vw",
      modalHeight: "99vh",
    },
    HSN: {
      showModal: true,
      closeModal: modalStackPop,
      modalTitle: "Manage HSN",
      ModalType: ManageHSN,
      modalWidth: "70vw",
      modalHeight: "80vh",
    },
    Size: {
      showModal: true,
      closeModal: modalStackPop,
      modalTitle: "Manage Size",
      ModalType: ManageSize,
      modalWidth: "70vw",
      modalHeight: "80vh",
    },
    Type: {
      showModal: true,
      closeModal: modalStackPop,
      modalTitle: "Manage Type",
      ModalType: ManageType,
      modalWidth: "70vw",
      modalHeight: "80vh",
    },
  };

  const modalStackPush = (type) => {
    setModalStack((oldStack) => [...oldStack, ModalData[type]]);
  };
  const handleKeyEvent = useCallback(
    (e, message) => {
      console.log(message);
      modalStackPush(message);
    },
    [ModalStack]
  );

  useEffect(() => {
    ipcRenderer.on("modalToLoad", handleKeyEvent);
    return () => {
      ipcRenderer.removeListener("modalToLoad", handleKeyEvent);
    };
  }, [handleKeyEvent]);
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Z-THETA
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          {/* <div className={classes.drawerContainer}> */}
          <Navigation></Navigation>
          {/* </div> */}
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Switch>
            {routes.map(({ path, Component, data }) => {
              return (
                <Route
                  path={path}
                  exact
                  key={uuidv4()}
                  render={(props) => React.createElement(Component, data)}
                />
              );
            })}
            <Redirect to={defaultRoute} />
          </Switch>
        </main>
      </div>
      {console.log("Render Again")}
      {console.log(ModalStack)}
      {ModalStack ? ModalStack.map((item) => <CustomModal {...item} />) : null}
    </Router>
  );
}
