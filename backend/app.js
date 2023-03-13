const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyparser = require("body-parser");

require("dotenv").config();

app = express();
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyparser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.NAME,
  password: process.env.PASSWORD === "" ? undefined : process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.get("/", (req, res) => {
  res.send("tested");
});

app.get("/campaigns", (req, res) => {
  const sql = "SELECT * FROM campaigns";
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/donations", (req, res) => {
  const sql = "INSERT INTO donations (nickname,amount,campaignid) VALUES  ?";
  const donate = [["eslam", 1, 1]];
  db.query(sql, [donate], function (err, result) {
    if (err) throw err;
    console.log(result, req.body);
    res.send("donation created");
  });
});

app.listen("4000", () => {
  console.log("server start at 4000");
});
