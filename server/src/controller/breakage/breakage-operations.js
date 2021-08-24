import createBreakage from "./breakage";

export default function createBreakageOperations({ database }) {
  return Object.freeze({
    add,
    findById,
    getItems,
    remove,
    update,
  });

  async function getItems() {
    const db = await database;
    return db.breakageData.map(documentToBreakage);
  }

  async function add(breakage) {
    const db = await database;
    const id = db.generateId();
    db.breakageData.push({
      ...breakage,
      breakageId: id,
    });
    return {
      success: true,
      created: documentToBreakage({
        ...breakage,
        breakageId: id,
      }),
    };
  }

  async function findById({ breakageId }) {
    const db = await database;
    const data = db.breakageData.filter((item) => item.breakageId === breakageId)[0];
    if (data) return documentToBreakage(data);
    return null;
  }

  async function remove({ key: breakageId }) {
    const db = await database;
    db.breakageData = db.breakageData.filter((item) => item.breakageId !== breakageId);
    return `Delete the record with key:${breakageId}`;
  }

  // todo:
  async function update({ key: breakageId, ...otherInfo }) {
    const db = await database;
    db.breakageData.forEach((item, index) => {
      if (item.breakageId === breakageId) {
        db.breakageData[index] = {
          ...db.breakageData[index],
          ...otherInfo,
        };
      }
    });
    return `updated the record with key:${breakageId}`;
  }

  function documentToBreakage({ breakageId: key, ...doc }) {
    return createBreakage({ key, ...doc });
  }
}
