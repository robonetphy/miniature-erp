import createStock from "./stock";

export default function createStockOperations({ database }) {
  return Object.freeze({
    add,
    findById,
    getItems,
    remove,
    update,
  });

  async function getItems() {
    const db = await database;
    return db.stockData.map(documentToStock);
  }

  async function add(stock) {
    const db = await database;
    const id = db.generateId();
    db.stockData.push({
      ...stock,
      stockId: id,
    });
    return {
      success: true,
      created: documentToStock({
        ...stock,
        stockId: id,
      }),
    };
  }

  async function findById({ stockId }) {
    const db = await database;
    const data = db.stockData.filter(
      (item) => item.stockId === stockId
    )[0];
    if (data) return documentToStock(data);
    return null;
  }

  async function remove({ key: stockId }) {
    const db = await database;
    db.stockData = db.stockData.filter(
      (item) => item.stockId !== stockId
    );
    return `Delete the record with key:${stockId}`;
  }

  // todo:
  async function update({ key: stockId, ...otherInfo }) {
    const db = await database;
    db.stockData.forEach((item, index) => {
      if (item.stockId === stockId) {
        db.stockData[index] = {
          ...db.stockData[index],
          ...otherInfo,
        };
      }
    });
    return `updated the record with key:${stockId}`;
  }

  function documentToStock({ stockId: key, ...doc }) {
    return createStock({ key, ...doc });
  }
}
