//*A reusable helper for JSON APIs
//?Instead of repeatedly writing the same response checks in every function, you can create a reusable helper.
const newInvoice = {
  id: 104,
  customer: 'magezi',
  amount: 500_000,
  status: 'paid'
}
async function requestJSON (url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...options.headers
    }
  })

  const contentType = response.headers.get('content-type')
  let data = null

  if (response.status !== 204 && contentType?.includes('json')) {
    data = await response.json()
  }

  if (!response.ok) {
    const message = data?.message || `Request failed: ${response.status}`

    const error = new Error(message)
    error.status = response.status
    error.data = data

    throw error
  }

  return data
}
//*Now use the helper for different HTTP methods:
// GET
const invoices = await requestJSON('/api/invoices')

// POST
const createdInvoice = await requestJSON('/api/invoices', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    customer: 'Paul',
    amount: 50000
  })
})

// PUT
const replacedInvoice = await requestJSON('/api/invoices/104', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    ...newInvoice
  })
})
// PATCH
const updatedInvoice = await requestJSON('/api/invoices/101', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    status: 'pending'
  })
})

// DELETE
await requestJSON('/api/invoices/101', {
  method: 'DELETE'
})
