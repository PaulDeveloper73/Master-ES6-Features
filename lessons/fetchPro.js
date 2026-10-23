// // server.js
// import express from "express";

// const app = express();

// app.get("/api/invoices", (req, res) => {
//   res.json([
//     { id: 1, customer: "Paul", amount: 50000 },
//     { id: 2, customer: "John", amount: 75000 }
//   ]);
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

// *Suppose a user fills out an invoice form:
const newInvoice = {
  customer: 'Paul',
  amount: 50000,
  currency: 'UGX',
  status: 'pending'
}

//? Task: 001 *GET — retrieve data from an API
//? Task: 002 POST — send data to create a resource
//? Task 002 PUT — replace a resource
//Suppose invoice 101 currently contains:
// {
//   "id": 101,
//   "customer": "Paul",
//   "amount": 50000,
//   "currency": "UGX",
//   "status": "pending"
// }
// ? Task 003: PATCH — update part of a resource
// Imagine an invoice has these details:
// const invoice = {
//   id: 101,
//   customer: "Paul",
//   amount: 50000,
//   status: "pending"
// };
//!You only want to change its status to "paid".

//? Task: 004 DELETE — delete a resource
//Suppose you want to delete draft invoice 101.
// ? Understand request headers and request bodies
// Headers carry additional information about a request. The body carries the data you are submitting.

//* Here is an example of sending JSON to an API that requires authentication:
// const response = await fetch("/api/invoices", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//     "Authorization": `Bearer ${accessToken}`
//   },
//   body: JSON.stringify({
//     customer: "Paul",
//     amount: 50000
//   })
// });

//Fetch pending invoices: await fetch("/api/invoices?status=pending");
//*Understand HTTP status codes
// Your JavaScript needs to distinguish successful responses from unsuccessful ones.
// Status	Meaning	Typical situation
// 200 OK	Request succeeded	Invoices retrieved
// 201 Created	Resource created	Invoice created
// 202 Accepted	Accepted for processing	Background job started
// 204 No Content	Success with no body	Invoice deleted
// 400 Bad Request	Invalid request	Malformed data
// 401 Unauthorized	Authentication required or invalid	Session expired
// 403 Forbidden	Not permitted	Staff member lacks permission
// 404 Not Found	Resource not found	Invoice does not exist
// 409 Conflict	Conflict with current state	Duplicate or conflicting operation
// 422 Unprocessable Content	Request data rejected	Invalid invoice fields
// 429 Too Many Requests	Rate limit exceeded	Too many requests
// 500 Internal Server Error	Server failed	Unexpected backend error
// 503 Service Unavailable	Service temporarily unavailable	Backend maintenance

// The exact status codes depend on the API's design.

// A successful HTTP response does not always mean the business operation is fully complete. For example, 202 Accepted may mean a payment is still being processed.
// 11. Handle API errors professionally
// There are three important error categories.

// Network errors

// The server cannot be reached, the request is interrupted, or the browser blocks it. fetch() generally rejects with an error.

// HTTP errors

// The server responds with a status such as 400, 401, 404, or 500. Check response.ok or response.status.

// Response parsing errors

// The server returns invalid JSON, or your code tries to parse an empty response as JSON.

// ** Task: 004 create a  reusable helper for JSON APIs
// Instead of repeatedly writing the same response checks in every function, you can create a reusable helper.

//? GET
// const invoices = await requestJSON('/api/invoices')

// ? POST
// const createdInvoice = await requestJSON('/api/invoices', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     customer: 'Paul',
//     amount: 50000
//   })
// })

// ? PATCH
// const updatedInvoice = await requestJSON('/api/invoices/101', {
//   method: 'PATCH',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     status: 'pending'
//   })
// })

// ? DELETE
// await requestJSON('/api/invoices/101', {
//   method: 'DELETE'
// })

//*  Validate user input

function validateInvoice (invoice) {
  if (typeof invoice.customer !== 'string' || invoice.customer.trim() === '') {
    throw new Error('Customer name is required')
  }

  if (
    typeof invoice.amount !== 'number' ||
    !Number.isFinite(invoice.amount) ||
    invoice.amount <= 0
  ) {
    throw new Error('Amount must be a positive number')
  }
}

async function submitInvoice (invoiceData) {
  try {
    validateInvoice(invoiceData)

    const createdInvoice = await requestJSON('/api/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invoiceData)
    })

    console.log('Successfully created:', createdInvoice)
    return createdInvoice
  } catch (error) {
    console.error('Invoice submission failed:', error.message)
    throw error
  }
}

// ? Task :005 Use URLSearchParams for filters and search

//*Send files using FormData
// ?Send files using FormData
// ?Not all API requests send JSON. If a user uploads an invoice PDF, a receipt, or a profile image, FormData is often appropriate.
