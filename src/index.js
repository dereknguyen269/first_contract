require('dotenv').config();
const contractAddress = process.env.CONTRACT_ADDRESS
const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000

fs.createReadStream('./build/contracts/Fcontracts.json').pipe(fs.createWriteStream('./public/js/Fcontracts.json'))

app.set('view engine', 'pug')
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('index', { title: 'Fcontracts DAPP', contractAddress: contractAddress })
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
