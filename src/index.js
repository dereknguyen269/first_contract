const express = require('express')
const app = express()
const port = 3000

const fs = require('fs')
var obj = JSON.parse(fs.readFileSync('./build/contracts/Fcontracts.json', 'utf8'))

app.set('view engine', 'pug')
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('index', { title: 'Fcontracts DAPP', obj: obj })
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
