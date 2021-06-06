import Dexie from "dexie";

const db = new Dexie("StockList");
db.version(3).stores({ items: "++id, meta, daily" });

export default db;
