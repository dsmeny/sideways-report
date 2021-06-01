import Dexie from "dexie";

const db = new Dexie("StockList");
db.version(1).stores({ items: "++id, name, date, itemHasBeenUpdated" });

export default db;
