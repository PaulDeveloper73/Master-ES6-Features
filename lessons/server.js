// server.js
import express from 'express'

const app = express()

app.get('/api/invoices', (req, res) => {
  res.json([
    { id: 1, customer: 'Paul', amount: 50000 },
    { id: 2, customer: 'John', amount: 75000 }
  ])
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
