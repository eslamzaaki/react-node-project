const mysql = require("mysql");

const newDB = mysql.createConnection({
  host: "localhost",
  user: process.env.NAME,
  password: process.env.PASSWORD === "" ? undefined : process.env.PASSWORD,
  database: process.env.DATABASE,
});

newDB.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  // create tables
  var sql =
    "CREATE TABLE campaigns  (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), amount int, description VARCHAR(255), status VARCHAR(255))";
  newDB.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table of campaigns  created");
  });
  var sql2 =
    "CREATE TABLE donations  (id INT AUTO_INCREMENT PRIMARY KEY, nickname VARCHAR(255), amount INT, campaignid INT )";
  newDB.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Table of donations  created");
  });

  // create test data
  var sql = "INSERT INTO campaigns (name,amount,description,status) VALUES ?";
  var values = [
    ["ccamp 1", 100, "Highway 71", "active"],
    ["camp 2", 200, "Lowstreet 4", "active"],
    ["camp 3", 300, "Apple st 652", "active"],
    ["camp 4", 400, "Mountain 21", "active"],
    ["camp 5", 500, "Valley 345", "active"],
    ["camp 6", 600, "Ocean blvd 2", "active"],
    ["camp 33", 700, "Green Grass 1", "active"],
    ["camp 42134", 800, "Sky st 331", "active"],
    ["camp test", 900, "One way 98", "active"],
    ["camp not test", 1000, "Yellow Garden 2", "active"],
    ["camp making test", 300, "Park Lane 38", "active"],
    ["camp ao wow", 400, "Central st 954", "active"],
    ["camp real", 500, "Main Road 989", "active"],
    ["camp parca", 600, "Sideway 1633", "active"],
  ];
  newDB.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of campaigns inserted: " + result.affectedRows);
    newDB.end();
  });
});
