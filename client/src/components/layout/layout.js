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
  ManageHSN,
  ManageSize,
  ManageType,
  CreateInvoice,
  AddMerchant,
  CreateReturn,
  CreateBreakage,
  CreateStock,
  CreatePurchase,
  CreateCompany,
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
  const [ModalData, setModalData] = useState({
    showModal: false,
    modalTitle: "",
    modalType: () => <></>,
    modalWidth: "",
    modalHeight: "",
  });
  const setShowModal = (showModalValue) => {
    setModalData({ ...ModalData, showModal: showModalValue });
  };
  const handleKeyEvent = useCallback((e, message) => {
    console.log(message);
    switch (message) {
      case "Purchase":
        setModalData({
          showModal: true,
          modalTitle: "Create New Purchase",
          modalType: CreatePurchase,
          modalWidth: "100vw",
          modalHeight: "99vh",
        });
        break;
      case "Stock":
        setModalData({
          showModal: true,
          modalTitle: "Create New Stock",
          modalType: CreateStock,
          modalWidth: "40vw",
          modalHeight: "65vh",
        });
        break;
      case "Company":
        setModalData({
          showModal: true,
          modalTitle: "Create New Company",
          modalType: CreateCompany,
          modalWidth: "40vw",
          modalHeight: "40vh"
        });
        break;
      case "Breakage":
        setModalData({
          showModal: true,
          modalTitle: "Create New Breakage",
          modalType: CreateBreakage,
          modalWidth: "100vw",
          modalHeight: "99vh",
        });
        break;
      case "Return":
        setModalData({
          showModal: true,
          modalTitle: "Create New Return",
          modalType: CreateReturn,
          modalWidth: "100vw",
          modalHeight: "99vh",
        });
        break;
      case "Merchant":
        setModalData({
          showModal: true,
          modalTitle: "Add New Merchant",
          modalType: AddMerchant,
          modalWidth: "40vw",
          modalHeight: "75vh",
        });
        break;
      case "Invoice":
        setModalData({
          showModal: true,
          modalTitle: "Create New Invoice",
          modalType: CreateInvoice,
          modalWidth: "100vw",
          modalHeight: "99vh",
        });
        break;
      case "HSN":
        setModalData({
          showModal: true,
          modalTitle: "Manage HSN",
          modalType: ManageHSN,
          modalWidth: "70vw",
          modalHeight: "80vh",
        });
        break;
      case "Size":
        setModalData({
          showModal: true,
          modalTitle: "Manage Size",
          modalType: ManageSize,
          modalWidth: "70vw",
          modalHeight: "80vh",
        });
        break;
      case "Type":
        setModalData({
          showModal: true,
          modalTitle: "Manage Type",
          modalType: ManageType,
          modalWidth: "70vw",
          modalHeight: "80vh",
        });
        break;
      default:
        break;
    }
    // console.log(message);
  }, []);

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
      {ModalData.showModal ? (
        <CustomModal
          setShowModal={setShowModal}
          showModal={ModalData.showModal}
          modalTitle={ModalData.modalTitle}
          ModalType={ModalData.modalType}
          modalHeight={ModalData.modalHeight}
          modalWidth={ModalData.modalWidth}
        />
      ) : null}
    </Router>
  );
}
