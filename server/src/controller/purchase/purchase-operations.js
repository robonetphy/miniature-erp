import createPurchase from "./purchase";

export default function createPurchaseOperations({ database }) {
  return Object.freeze({
    add,
    findById,
    getItems,
    remove,
    update,
  });

  async function getItems() {
    const db = await database;
    return db.purchaseData.map(documentToPurchase);
  }

  async function add(purchase) {
    const db = await database;
    const id = db.generateId();
    db.purchaseData.push({
      ...purchase,
      purchaseId: id,
    });
    return {
      success: true,
      created: documentToPurchase({
        ...purchase,
        purchaseId: id,
      }),
    };
  }

  async function findById({ purchaseId }) {
    const db = await database;
    const data = db.purchaseData.filter(
      (item) => item.purchaseId === purchaseId
    )[0];
    if (data) return documentToPurchase(data);
    return null;
  }

  async function remove({ key: purchaseId }) {
    const db = await database;
    db.purchaseData = db.purchaseData.filter(
      (item) => item.purchaseId !== purchaseId
    );
    return `Delete the record with key:${purchaseId}`;
  }

  // todo:
  async function update({ key: purchaseId, ...otherInfo }) {
    const db = await database;
    db.purchaseData.forEach((item, index) => {
      if (item.purchaseId === purchaseId) {
        db.purchaseData[index] = {
          ...db.purchaseData[index],
          ...otherInfo,
        };
      }
    });
    return `updated the record with key:${purchaseId}`;
  }

  function documentToPurchase({ purchaseId: key, ...doc }) {
    return createPurchase({ key, ...doc });
  }
}
