const mysql = require("mysql2");
//require('dotenv').config({ path: require('find-config')('.env') })
console.time("Function #5");
console.log("live started");
var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "toplist",
  connectionLimit: 11,
  acquireTimeout: 10000, // Adjust as needed
  multipleStatements: false, // Consider setting to false unless necessary
  dateStrings: true,
  decimalNumbers: true,
});

connection.getConnection((err) => {
  if (err) {
    //console.timeEnd('Function #1')
    //console.log(process.env.host)
    console.log("Error in local connection ", JSON.stringify(err));
    process.exit(1);
    return;
  } else {
    console.timeEnd("Function #5");
    console.log("Connected");
  }
});

var Remoteconnection = mysql.createPool({
  host: "124.109.43.178",
  port: 3306,
  user: "trx_user",
  password: "trx@@#123",
  database: "toplist",
  connectionLimit: 11,
  acquireTimeout: 1000000,
  multipleStatements: true,
  //queryTimeout: 600000,
  acquireTimeout: 50000,
});
Remoteconnection.getConnection((err) => {
  if (err) {
    //console.timeEnd('Function #1')
    //console.log(process.env.host)
    console.log("Error in Remote connection ", JSON.stringify(err));
    process.exit(1);
  } else {
    // console.timeEnd('Function #5')
    console.log(" Remote Connected");
  }
});

module.exports = {
  LocalDb: connection.promise(),
  RemoteDb: Remoteconnection.promise(),
};
