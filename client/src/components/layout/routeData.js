import CustomTable from "../table";
const dataGenerator = (data, length) => {
  var dummy = [];
  for (var i = 0; i < length; i++) {
    dummy.push(data);
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
      columns: ["Date", "Title", "Qty", "Amount", "Remarks"],
      data: [
        ...dataGenerator(["12-2-2021", "Title1", 100, 1000, "Firstone"], 42),
      ],
      title: "Purchase",
      isSearchEnable: true,      
      fixedHeader: true,
      tableBodyHeight: "600px",
    },
    path: "/purchase",
  },
  {
    Component: CustomTable,
    data: {
      columns: ["Name", "Size", "Company", "Qty", "Type", "Rate", "HNS"],
      data: [
        ...dataGenerator(["T1", "18x12", "ABC", 1000, "abs", 200, "12%"], 105),
      ],
      title: "Inventory",
      isSearchEnable: true,
      fixedHeader: true,
      tableBodyHeight: "600px",
    },
    path: "/inventory",
  },
  {
    Component: CustomTable,
    data: {
      columns: ["Company", "Address", "Phone No"],
      data: [...dataGenerator(["ABC", "asdasfasddasdas", "+912123123123"], 56)],
      title: "Company",
      isSearchEnable: true,
      fixedHeader: true,
      tableBodyHeight: "600px",
    },
    path: "/company",
  },
  {
    Component: CustomTable,
    data: {
      columns: ["Name", "Phone1", "Phone2", "Address", "GSTIN"],
      data: [
        ...dataGenerator(
          [
            "abc",
            "+912123123123",
            "+912123123123",
            "asdasfasddasdas",
            "ASFAS1231231A",
          ],
          15
        ),
      ],
      title: "Merchant",
      isSearchEnable: true,
      fixedHeader: true,
      tableBodyHeight: "600px",
    },
    path: "/merchant",
  },
  {
    Component: CustomTable,
    data: {
      columns: ["Invoice No", "Date", "Merchant", "Qty", "Total", "Remarks"],
      data: [
        ...dataGenerator(
          ["123123", "21-12-2021", "ABC", 123, 312, "hi there"],
          504
        ),
      ],
      title: "Invoice",
      isSearchEnable: true,
      fixedHeader: true,
      tableBodyHeight: "600px",
    },
    path: "/invoice",
  },
];

/**
 * Default Route for Navigation.
 */
export const defaultRoute = "/purchase";
