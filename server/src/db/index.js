import { v4 as uuidv4 } from "uuid";
export default async function createDb() {
  // const MongoClient = mongodb.MongoClient
  // const url = 'mongodb://localhost:27017'
  // const dbName = 'mm_api_demo'
  // const client = new MongoClient(url, { useNewUrlParser: true })
  // await client.connect()
  // const db = await client.db(dbName)
  const db = {};
  db.generateId = generateId;
  db.purchaseData = [];
  db.breakageData = [];
  db.companyData = [];
  db.merchantData = [];
  db.stockData = [];
  db.returnData = [];
  db.invoiceData = [];
  return db;
}
function generateId() {
  return uuidv4();
}
