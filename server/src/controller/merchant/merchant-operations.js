import createMerchant from "./merchant";

export default function createMerchantOperations({ database }) {
  return Object.freeze({
    add,
    findById,
    getItems,
    remove,
    update,
  });

  async function getItems() {
    const db = await database;
    return db.merchantData.map(documentToMerchant);
  }

  async function add(merchant) {
    const db = await database;
    const id = db.generateId();
    db.merchantData.push({
      ...merchant,
      merchantId: id,
    });
    return {
      success: true,
      created: documentToMerchant({
        ...merchant,
        merchantId: id,
      }),
    };
  }

  async function findById({ merchantId }) {
    const db = await database;
    const data = db.merchantData.filter(
      (item) => item.merchantId === merchantId
    )[0];
    if (data) return documentToMerchant(data);
    return null;
  }

  async function remove({ key: merchantId }) {
    const db = await database;
    db.merchantData = db.merchantData.filter(
      (item) => item.merchantId !== merchantId
    );
    return `Delete the record with key:${merchantId}`;
  }

  // todo:
  async function update({ key: merchantId, ...otherInfo }) {
    const db = await database;
    db.merchantData.forEach((item, index) => {
      if (item.merchantId === merchantId) {
        db.merchantData[index] = {
          ...db.merchantData[index],
          ...otherInfo,
        };
      }
    });
    return `updated the record with key:${merchantId}`;
  }

  function documentToMerchant({ merchantId: key, ...doc }) {
    return createMerchant({ key, ...doc });
  }
}
