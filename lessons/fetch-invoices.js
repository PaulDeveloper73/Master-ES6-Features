const invoiceList = document.querySelector('#invoice-list')
const loadingMessage = document.querySelector('#loading-message')
const errorMessage = document.querySelector('#error-message')
const pendingInvoicesPro = document.querySelector('#pending-invoices')
const paidInvoicesPro = document.querySelector('#paid-invoices')
const totalInvoices = document.querySelector('#total-invoices')

// Load invoice data from the local JSON file
async function getInvoices () {
  try {
    const response = await fetch('./api.json')

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const invoices = await response.json()

    if (!Array.isArray(invoices)) {
      throw new Error('Expected an array of invoices')
    }

    return invoices
  } catch (error) {
    console.error('Could not load invoices:', error.message)
    throw error
  }
}

// Create a table cell safely using DOM methods
function createCell (value, className = '') {
  const cell = document.createElement('td')

  cell.className = className
  cell.textContent = value ?? '—'

  return cell
}

// Create a status badge with the appropriate Tailwind classes
function createStatusBadge (status) {
  const badge = document.createElement('span')

  const normalizedStatus = String(status ?? '')
    .trim()
    .toLowerCase()

  const statusStyles = {
    paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    overdue: 'bg-red-50 text-red-700 ring-red-600/20',
    cancelled: 'bg-slate-100 text-slate-600 ring-slate-500/20',
    draft: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20'
  }

  badge.className = [
    'inline-flex items-center rounded-full px-3 py-1',
    'text-xs font-bold capitalize ring-1 ring-inset',
    statusStyles[normalizedStatus] ??
      'bg-slate-100 text-slate-600 ring-slate-500/20'
  ].join(' ')

  badge.textContent = status || 'Unknown'

  return badge
}

// Display invoices in the table
function displayInvoices (invoices) {
  invoiceList.replaceChildren()

  for (const invoice of invoices) {
    const row = document.createElement('tr')

    row.className = 'transition-colors hover:bg-slate-50'

    // Invoice number
    const invoiceNumber = createCell(
      invoice.id,
      'whitespace-nowrap px-6 py-4 text-sm font-bold text-indigo-600'
    )

    // Customer name
    const customer = createCell(
      invoice.customer,
      'whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700'
    )

    // Amount and currency
    const formattedAmount =
      typeof invoice.amount === 'number' && Number.isFinite(invoice.amount)
        ? `${invoice.amount.toLocaleString('en-UG')} ${
            invoice.currency ?? ''
          }`.trim()
        : '—'

    const amount = createCell(
      formattedAmount,
      'whitespace-nowrap px-6 py-4 text-sm font-bold tabular-nums text-slate-900'
    )

    // Payment status
    const status = document.createElement('td')

    status.className = 'whitespace-nowrap px-6 py-4'
    status.append(createStatusBadge(invoice.status))

    // Append cells to the row
    row.append(invoiceNumber, customer, amount, status)

    // Append the row to the table body
    invoiceList.append(row)
  }
}

// Initialize the application
async function initApp () {
  loadingMessage.hidden = false
  loadingMessage.textContent = 'Loading invoices...'

  errorMessage.hidden = true
  errorMessage.textContent = ''

  try {
    const invoices = await getInvoices()
    // Get all invoice bt not draft
    const invoicetotal = invoices.length
    const paidInvoices = invoices.filter(
      inv => inv.status.toLowerCase() === 'paid'
    ).length

    const pendingInvoices = invoices.filter(inv => inv.status !== 'paid').length

    // Assign value stat cards
    totalInvoices.textContent = invoicetotal.toLocaleString()
    paidInvoicesPro.textContent = paidInvoices.toLocaleString()
    pendingInvoicesPro.textContent = pendingInvoices.toLocaleString()

    displayInvoices(invoices)

    if (invoices.length === 0) {
      loadingMessage.textContent = 'No invoices found.'
      loadingMessage.hidden = false
    } else {
      loadingMessage.hidden = true
    }
  } catch (error) {
    loadingMessage.hidden = true

    invoiceList.replaceChildren()

    errorMessage.textContent =
      'Unable to load invoices. Please try again later.'

    errorMessage.hidden = false
  }
}

initApp()
