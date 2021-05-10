import createInvoice from "./invoice";

export default function createInvoiceOperations({ database }) {
  return Object.freeze({
    add,
    findById,
    getItems,
    remove,
    update,
  });

  async function getItems() {
    const db = await database;
    return db.invoiceData.map(documentToInvoice);
  }

  async function add(invoice) {
    const db = await database;
    const id = db.generateId();
    db.invoiceData.push({
      ...invoice,
      invoiceId: id,
    });
    return {
      success: true,
      created: documentToInvoice({
        ...invoice,
        invoiceId: id,
      }),
    };
  }

  async function findById({ invoiceId }) {
    const db = await database;
    const data = db.invoiceData.filter(
      (item) => item.invoiceId === invoiceId
    )[0];
    if (data) return documentToInvoice(data);
    return null;
  }

  async function remove({ key: invoiceId }) {
    const db = await database;
    db.invoiceData = db.invoiceData.filter(
      (item) => item.invoiceId !== invoiceId
    );
    return `Delete the record with key:${invoiceId}`;
  }

  // todo:
  async function update({ key: invoiceId, ...otherInfo }) {
    const db = await database;
    db.invoiceData.forEach((item, index) => {
      if (item.invoiceId === invoiceId) {
        db.invoiceData[index] = {
          ...db.invoiceData[index],
          ...otherInfo,
        };
      }
    });
    return `updated the record with key:${invoiceId}`;
  }

  function documentToInvoice({ invoiceId: key, ...doc }) {
    return createInvoice({ key, ...doc });
  }
}
