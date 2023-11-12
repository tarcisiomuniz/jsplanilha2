const cors = require('cors')
const conn = require('./db_connection')
const express = require('express')
const app = express()
const port = process.env.port ||  3001

//cors
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {

  res.send("Ola Mundo")
})

app.post("/login", (req, res) => {

  const {email, password} = req.body

  const sql = 'select * from users where id = 1'

  conn.query(sql, (err, data) => {
    
    if(err) {
      console.log(err)
    } else  if(email === data[0].email && password === data[0].password){
      res.send("ok")
    } else {
      res.send('no')
    }

  })

})

app.post("/data", (req, res) => {

  const {dia, servico, number} = req.body

  // google sheets
  async function enviarDados (dia, servico, number) {

    await fetch('https://sheetdb.io/api/v1/qddtbj8rjp34d', {
      method: 'post',
      headers: {
        Accept: 'Application/json',
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({dia, servico, valor_total: number})
    })

  }

  enviarDados(dia, servico, number)

  const sql = "insert into dados (??, ??, ??) values (?, ?, ?)"
  const data = ["dia", "servico", "valor_total", dia, servico, number]

  conn.query(sql, data, (err, data) => {
    if(err) {
      console.log(err)
    } else {
      res.send("ok")
    }
  })

})

app.listen(port, _=> console.log(`App rodando na porta: ${port}`))