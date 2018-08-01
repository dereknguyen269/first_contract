const express = require('express')
const app = express()
const port = 3000


app.set('view engine', 'pug')
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('index', { title: 'Fcontracts DAPP' })
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
