"hset CURRENT_STOCK symbol nio";
"hset CURRENT_STOCK date 12-28-2021";

"hget CURRENT_STOCK symbol";
"hget CURRENT_STOCK date";

"hexists CURRENT_STOCK symbol"; // returns 0 === null || 1 === exists

"hscan CURRENT_STOCK 0";
