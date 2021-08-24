import createCompany from "./company";

export default function createCompanyOperations({ database }) {
  return Object.freeze({
    add,
    findById,
    getItems,
    remove,
    update,
  });

  async function getItems() {
    const db = await database;
    return db.companyData.map(documentToCompany);
  }

  async function add(company) {
    const db = await database;
    const id = db.generateId();
    db.companyData.push({
      ...company,
      companyId: id,
    });
    return {
      success: true,
      created: documentToCompany({
        ...company,
        companyId: id,
      }),
    };
  }

  async function findById({ companyId }) {
    const db = await database;
    const data = db.companyData.filter((item) => item.companyId === companyId)[0];
    if (data) return documentToCompany(data);
    return null;
  }

  async function remove({ key: companyId }) {
    const db = await database;
    db.companyData = db.companyData.filter((item) => item.companyId !== companyId);
    return `Delete the record with key:${companyId}`;
  }

  // todo:
  async function update({ key: companyId, ...otherInfo }) {
    const db = await database;
    db.companyData.forEach((item, index) => {
      if (item.companyId === companyId) {
        db.companyData[index] = {
          ...db.companyData[index],
          ...otherInfo,
        };
      }
    });
    return `updated the record with key:${companyId}`;
  }

  function documentToCompany({ companyId: key, ...doc }) {
    return createCompany({ key, ...doc });
  }
}
