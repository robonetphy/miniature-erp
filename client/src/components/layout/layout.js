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
  ManageWeight,
  ChangeRate,
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

  const modalStackPush = useCallback((type) => {
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
      Rate: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Change Rates",
        ModalType: ChangeRate,
        modalWidth: "100vw",
        modalHeight: "99vh",
      },
      Weight: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Manage Weights",
        ModalType: ManageWeight,
        modalWidth: "100vw",
        modalHeight: "99vh",
      },
    };
    setModalStack((oldStack) => {
      const isModalExist = oldStack.filter(
        (item) => item.modalTitle === ModalData[type].modalTitle
      );
      const remainData = oldStack.filter(
        (item) => item.modalTitle !== ModalData[type].modalTitle
      );
      let newStack = [...remainData];
      if (isModalExist.length) {
        newStack = [...newStack, ...isModalExist];
      } else {
        newStack = [...newStack, { ...ModalData[type], key: uuidv4() }];
      }
      console.log(isModalExist);
      console.log(remainData);
      console.log(newStack);
      return [...newStack];
    });
  }, []);

  const editModalStackPush = useCallback((type) => {
    //fetch data
    const ModalData = {
      Purchase: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Edit Purchase",
        ModalType: CreatePurchase,
        modalWidth: "100vw",
        modalHeight: "99vh",
        ModalTypeData: {
          mode: "Edit",
          Date: "2021-04-02",
          Title: "Edit Purchase",
          Remarks: "Nothing",
          TotalQty: 10,
          TotalAmount: 1000,
          TableRows: [
            {
              name: "Abc",
              qty: 10,
              rate: 100,
              amount: 1000,
              key: uuidv4(),
            },
          ],
        },
      },
      Stock: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Edit Stock",
        ModalType: CreateStock,
        modalWidth: "40vw",
        modalHeight: "65vh",
        ModalTypeData: {
          mode: "Edit",
          Size: "123x123",
          Type: "ABC",
          HSN: "12%",
          Name: "proxitile",
          Rate: 100,
          Company: "ABC",
          initialQty: 0,
        },
      },
      Company: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Edit Company",
        ModalType: CreateCompany,
        modalWidth: "40vw",
        modalHeight: "40vh",
        ModalTypeData: {
          mode: "Edit",
          Company: "ABX",
          Address: "asdaksjflka lknlaklaskna klnlask",
          PhoneNo: "+124819028019",
        },
      },
      Breakage: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Edit Breakage",
        ModalType: CreateBreakage,
        modalWidth: "100vw",
        modalHeight: "99vh",
        ModalTypeData: {
          mode: "Edit",
          Remarks: "Nothing",
          TotalQty: 12,
          Title: "Something",
          Date: "2021-04-12",
          TotalAmount: 120,
          TotalItem: 1,
          TableRows: [
            {
              size: "12x12",
              name: "asda",
              company: "afsa",
              type: "asfas",
              qty: 12,
              rate: 10,
              subtotal: 120,
              key: uuidv4(),
            },
          ],
        },
      },
      Return: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Edit Return",
        ModalType: CreateReturn,
        modalWidth: "100vw",
        modalHeight: "99vh",
        ModalTypeData: {
          mode: "Edit",
          Remarks: "nothing",
          TotalQty: 10,
          TotalAmount: 120,
          TotalItem: 1,
          MerchantName: "sdasdasdas",
          Date: "2021-04-02",
          Address: "asfag as agdsa fas fasd",
          PhoneNo1: "+444646465464",
          PhoneNo2: "+4654646464",
          LastReturn: "R-12",
          TableRows: [
            {
              size: "12x12",
              product: "asda",
              company: "afsa",
              type: "asfas",
              qty: 12,
              rate: 10,
              subtotal: 120,
              key: uuidv4(),
            },
          ],
        },
      },
      Merchant: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Edit Merchant",
        ModalType: AddMerchant,
        modalWidth: "40vw",
        modalHeight: "75vh",
        ModalTypeData: {
          mode: "Edit",
          Name: "asd fd",
          Address: "asdalksflka nklnflkajsl",
          PhoneNo1: "+78312312",
          PhoneNo2: "+464646464646",
          Email: "asda@afamslk.com",
          PANNo: "ASDASDd12123",
          State: { code: "KA", title: "Karnataka" },
          GSTIN: "asdaasda",
        },
      },
      Invoice: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Edit Invoice",
        ModalType: CreateInvoice,
        modalWidth: "100vw",
        modalHeight: "99vh",
        ModalTypeData: {
          mode: "Edit",
          Remarks: "Nothing",
          TotalQty: 120,
          TotalAmount: 11760,
          Count: 1,
          TableRows: [
            {
              size: "123x123",
              product: "asdasda",
              qty: 120,
              rate: 100,
              hsn: 12,
              discount: 2,
              subtotal: 11760,
              key: uuidv4(),
            },
          ],
          MerchantName: "asdasd",
          Date: "2021-04-02",
          Address: "asdasdasdas",
          PhoneNo1: "86784684684",
          PhoneNo2: "4444646546",
          State: { code: "JH", title: "Jharkhand" },
          PaymentType: "Check",
          TransportDetails: "Airplane",
          Transport: "Nothing",
          Weight: 0,
          ShippedTo: {},
          GSTIN: "asdasdasd",
        },
      },
    };
    if (ModalData[type]) {
      const data = { ...ModalData[type], key: uuidv4() };
      setModalStack((oldStack) => [...oldStack, data]);
    }
  }, []);
  const deleteModalStackPush = useCallback((type) => {
    //fetch data
    const ModalData = {
      Purchase: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Delete Purchase",
        ModalType: CreatePurchase,
        modalWidth: "100vw",
        modalHeight: "99vh",
        ModalTypeData: {
          mode: "Delete",
          Date: "2021-04-02",
          Title: "Edit Purchase",
          Remarks: "Nothing",
          TotalQty: 10,
          TotalAmount: 1000,
          TableRows: [
            {
              name: "Abc",
              qty: 10,
              rate: 100,
              amount: 1000,
              key: uuidv4(),
            },
          ],
        },
      },
      Stock: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Delete Stock",
        ModalType: CreateStock,
        modalWidth: "40vw",
        modalHeight: "65vh",
        ModalTypeData: {
          mode: "Delete",
          Size: "123x123",
          Type: "ABC",
          HSN: "12%",
          Name: "proxitile",
          Rate: 100,
          Company: "ABC",
          initialQty: 0,
        },
      },
      Company: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Delete Company",
        ModalType: CreateCompany,
        modalWidth: "40vw",
        modalHeight: "40vh",
        ModalTypeData: {
          mode: "Delete",
          Company: "ABX",
          Address: "asdaksjflka lknlaklaskna klnlask",
          PhoneNo: "+124819028019",
        },
      },
      Breakage: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Delete Breakage",
        ModalType: CreateBreakage,
        modalWidth: "100vw",
        modalHeight: "99vh",
        ModalTypeData: {
          mode: "Delete",
          Remarks: "Nothing",
          Title: "Something",
          Date: "2021-04-12",
          TotalQty: 12,
          TotalAmount: 120,
          TotalItem: 1,
          TableRows: [
            {
              size: "12x12",
              name: "asda",
              company: "afsa",
              type: "asfas",
              qty: 12,
              rate: 10,
              subtotal: 120,
              key: uuidv4(),
            },
          ],
        },
      },
      Return: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Delete Return",
        ModalType: CreateReturn,
        modalWidth: "100vw",
        modalHeight: "99vh",
        ModalTypeData: {
          mode: "Delete",
          Remarks: "nothing",
          TotalQty: 10,
          TotalAmount: 120,
          TotalItem: 1,
          MerchantName: "sdasdasdas",
          Date: "2021-04-02",
          Address: "asfag as agdsa fas fasd",
          PhoneNo1: "+444646465464",
          PhoneNo2: "+4654646464",
          LastReturn: "R-12",
          TableRows: [
            {
              size: "12x12",
              product: "asda",
              company: "afsa",
              type: "asfas",
              qty: 12,
              rate: 10,
              subtotal: 120,
              key: uuidv4(),
            },
          ],
        },
      },
      Merchant: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Delete Merchant",
        ModalType: AddMerchant,
        modalWidth: "40vw",
        modalHeight: "75vh",
        ModalTypeData: {
          mode: "Delete",
          Name: "asd fd",
          Address: "asdalksflka nklnflkajsl",
          PhoneNo1: "+78312312",
          PhoneNo2: "+464646464646",
          Email: "asda@afamslk.com",
          PANNo: "ASDASDd12123",
          State: { code: "KA", title: "Karnataka" },
          GSTIN: "asdaasda",
        },
      },
      Invoice: {
        showModal: true,
        closeModal: modalStackPop,
        modalTitle: "Delete Invoice",
        ModalType: CreateInvoice,
        modalWidth: "100vw",
        modalHeight: "99vh",
        ModalTypeData: {
          mode: "Delete",
          Remarks: "Nothing",
          TotalQty: 120,
          TotalAmount: 11760,
          Count: 1,
          TableRows: [
            {
              size: "123x123",
              product: "asdasda",
              qty: 120,
              rate: 100,
              hsn: 12,
              discount: 2,
              subtotal: 11760,
              key: uuidv4(),
            },
          ],
          MerchantName: "asdasd",
          Date: "2021-04-02",
          Address: "asdasdasdas",
          PhoneNo1: "86784684684",
          PhoneNo2: "4444646546",
          State: { code: "JH", title: "Jharkhand" },
          PaymentType: "Check",
          TransportDetails: "Airplane",
          Transport: "Nothing",
          Weight: 0,
          ShippedTo: {},
          GSTIN: "asdasdasd",
        },
      },
    };
    if (ModalData[type]) {
      const data = { ...ModalData[type], key: uuidv4() };
      setModalStack((oldStack) => [...oldStack, data]);
    }
  }, []);
  const handleKeyEvent = useCallback(
    (e, message) => {
      console.log(message);
      modalStackPush(message);
    },
    [modalStackPush]
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
              NAVIN TEXTILE
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
          <Navigation></Navigation>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Switch>
            {routes.map(({ path, Component, data, TableName }) => {
              return (
                <Route
                  path={path}
                  exact
                  key={uuidv4()}
                  render={(props) =>
                    React.createElement(Component, {
                      ...data,
                      editCallback: (selectedData) => {
                        console.log("EditCallback");
                        console.log(selectedData);
                        editModalStackPush(TableName);
                      },
                      deleteCallback: (data) => {
                        console.log("deleteCallback");
                        console.log(data);
                        deleteModalStackPush(TableName);
                      },
                    })
                  }
                />
              );
            })}
            <Redirect to={defaultRoute} />
          </Switch>
        </main>
      </div>
      {ModalStack ? ModalStack.map((item) => <CustomModal {...item} />) : null}
    </Router>
  );
}

/*
tune for where ever the custom table used
fixedHeader: props.fixedHeader ?? false,
tableBodyHeight: props.tableBodyHeight ?? "auto",\
company and merchant gstin
toggle button for paid or unpaid
size structure change.
last bill first in table
Balance sheet of selected date.
payment terms (under date )
gst (2.5%) and cgst(2.5%) automatic calculation
merchant profile with pending things. pdf for pending things.
frameless with menu.
*/
