import CustomTable from "../table";
import { v4 as uuidv4 } from "uuid";
const dataGenerator = (data, length) => {
  var dummy = [];
  for (var i = 0; i < length; i++) {
    dummy.push({ ...data, key: uuidv4() });
  }
  return dummy;
};
/**
 * Routes for application and it's associated Components.
 */
export const routes = [
  {
    Component: CustomTable,
    data: {
      columns: [
        { title: "Date", id: "date" },
        { title: "Title", id: "title" },
        { title: "Qty", id: "qty" },
        { title: "Amount", id: "amount" },
        { title: "Remarks", id: "remarks" },
      ],
      data: [
        ...dataGenerator(
          {
            date: "12-2-2021",
            title: "Title1",
            qty: 100,
            amount: 1000,
            remarks: "Firstone",
          },
          42
        ),
      ],
      title: "Purchase",
      tableBodyHeight: "600px",
    },
    path: "/purchase",
    TableName: "Purchase",
  },
  {
    Component: CustomTable,
    data: {
      columns: [
        { title: "Name", id: "name" },
        { title: "Size", id: "size" },
        { title: "Company", id: "company" },
        { title: "Qty", id: "qty" },
        { title: "Type", id: "type" },
        { title: "Rate", id: "rate" },
        { title: "HSN", id: "hsn" },
      ],
      data: [
        ...dataGenerator(
          {
            name: "T1",
            size: "18x12",
            company: "ABC",
            qty: 1000,
            type: "abs",
            rate: 200,
            hsn: "12%",
          },
          105
        ),
      ],
      title: "Inventory",
      tableBodyHeight: "600px",
    },
    path: "/inventory",
    TableName: "Stock",
  },
  {
    Component: CustomTable,
    data: {
      columns: [
        { title: "Company", id: "company" },
        { title: "Address", id: "address" },
        { title: "Phone No", id: "phoneno" },
      ],
      data: [
        ...dataGenerator(
          {
            company: "ABC",
            address: "asdasfasddasdas",
            phoneno: "+912123123123",
          },
          56
        ),
      ],
      title: "Company",
      tableBodyHeight: "600px",
    },
    path: "/company",
    TableName: "Company",
  },
  {
    Component: CustomTable,
    data: {
      columns: [
        { title: "Name", id: "name" },
        { title: "Phone1", id: "phone1" },
        { title: "Phone2", id: "phone2" },
        { title: "Address", id: "address" },
        { title: "GSTIN", id: "gstin" },
      ],
      data: [
        ...dataGenerator(
          {
            name: "abc",
            phone1: "+912123123123",
            phone2: "+912123123123",
            address: "asdasfasddasdas",
            gstin: "ASFAS1231231A",
          },
          15
        ),
      ],
      title: "Merchant",
      tableBodyHeight: "600px",
    },
    path: "/merchant",
    TableName: "Merchant",
  },
  {
    Component: CustomTable,
    data: {
      columns: [
        { title: "Invoice No", id: "invoiceno" },
        { title: "Date", id: "date" },
        { title: "Merchant", id: "merchant" },
        { title: "Qty", id: "qty" },
        { title: "Total", id: "total" },
        { title: "Remarks", id: "remarks" },
      ],
      data: [
        ...dataGenerator(
          {
            invoiceno: "123123",
            date: "21-12-2021",
            merchant: "ABC",
            qty: 123,
            total: 312,
            remarks: "hi there",
          },
          504
        ),
      ],
      title: "Invoice",
      tableBodyHeight: "600px",
    },
    path: "/invoice",
    TableName: "Invoice",
  },
  {
    Component: CustomTable,
    data: {
      columns: [
        { title: "Date", id: "date" },
        { title: "Title", id: "title" },
        { title: "Qty", id: "qty" },
        { title: "Amount", id: "amount" },
        { title: "Remarks", id: "remarks" },
      ],
      data: [
        ...dataGenerator(
          {
            date: "12-2-2021",
            title: "Title1",
            qty: 100,
            amount: 1000,
            remarks: "Firstone",
          },
          42
        ),
      ],
      title: "Breakage",
      tableBodyHeight: "600px",
    },
    path: "/breakage",
    TableName: "Breakage",
  },
  {
    Component: CustomTable,
    data: {
      columns: [
        { title: "RI No", id: "rino" },
        { title: "Date", id: "date" },
        { title: "Merchant", id: "merchant" },
        { title: "Total Qty", id: "totalqty" },
        { title: "Total Amount", id: "totalamount" },
        { title: "Remarks", id: "remarks" },
      ],
      data: [
        ...dataGenerator(
          {
            rino: "123123",
            date: "21-12-2021",
            merchant: "ABC",
            totalqty: 123,
            totalamount: 312,
            remarks: "hi there",
          },
          54
        ),
      ],
      title: "Return",
      tableBodyHeight: "600px",
    },
    path: "/return",
    TableName: "Return",
  },
];

/**
 * Default Route for Navigation.
 */
export const defaultRoute = "/purchase";
