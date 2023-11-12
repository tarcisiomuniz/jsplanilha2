require('dotenv').config()
const mysql = require('mysql2')

const conn = mysql.createConnection(process.env.DATABASE_URL) 
console.log("Conectado ao banco!")

module.exports = conn