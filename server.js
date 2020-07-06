// modules =================================================
const express = require("express");
const app = express();
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "welc0me3",
  database: "user",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
// set our port
const port = 3000;
app.get("/", (req, res) => res.send("Test Tutorial"));
app.post("/insert-data", (req, res) => {
  let data = req.body.data;
  let table_name = req.body.table_name;
  bulkInsert(connection, table_name, data, (error, response) => {
    if (error) res.send(error);
    res.json(response);
  });
});
function bulkInsert(connection, table, objectArray, callback) {
  let keys = Object.keys(objectArray[0]);
  let values = objectArray.map((obj) => keys.map((key) => obj[key]));
  let sql = "INSERT INTO " + table + " (" + keys.join(",") + ") VALUES ?";
  connection.query(sql, [values], function (error, results, fields) {
    if (error) callback(error);
    callback(null, results);
  });
}
// startup our app at http://localhost:3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
