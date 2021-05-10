import createReturn from "./return";

export default function createReturnOperations({ database }) {
  return Object.freeze({
    add,
    findById,
    getItems,
    remove,
    update,
  });

  async function getItems() {
    const db = await database;
    return db.returnData.map(documentToReturn);
  }

  async function add(returnIn) {
    const db = await database;
    const id = db.generateId();
    db.returnData.push({
      ...returnIn,
      returnId: id,
    });
    return {
      success: true,
      created: documentToReturn({
        ...returnIn,
        returnId: id,
      }),
    };
  }

  async function findById({ returnId }) {
    const db = await database;
    const data = db.returnData.filter(
      (item) => item.returnId === returnId
    )[0];
    if (data) return documentToReturn(data);
    return null;
  }

  async function remove({ key: returnId }) {
    const db = await database;
    db.returnData = db.returnData.filter(
      (item) => item.returnId !== returnId
    );
    return `Delete the record with key:${returnId}`;
  }

  // todo:
  async function update({ key: returnId, ...otherInfo }) {
    const db = await database;
    db.returnData.forEach((item, index) => {
      if (item.returnId === returnId) {
        db.returnData[index] = {
          ...db.returnData[index],
          ...otherInfo,
        };
      }
    });
    return `updated the record with key:${returnId}`;
  }

  function documentToReturn({ returnId: key, ...doc }) {
    return createReturn({ key, ...doc });
  }
}
