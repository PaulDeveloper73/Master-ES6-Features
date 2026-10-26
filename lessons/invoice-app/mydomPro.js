import { invoices } from './invoices.js'

const elements = {
  currentYear: document.querySelector('#current-year'),
  totalInvoiceCount: document.querySelector('#total-invoice-count'),
  totalInvoiceValue: document.querySelector('#total-invoice-value'),
  paidInvoiceCount: document.querySelector('#paid-invoice-count'),
  paidInvoiceValue: document.querySelector('#paid-invoice-value'),
  pendingInvoiceCount: document.querySelector('#pending-invoice-count'),
  pendingInvoiceValue: document.querySelector('#pending-invoice-value'),
  overdueInvoiceCount: document.querySelector('#overdue-invoice-count'),
  overdueInvoiceValue: document.querySelector('#overdue-invoice-value'),
  invoiceSearch: document.querySelector('#invoice-search'),
  statusFilter: document.querySelector('#status-filter'),
  yearFilter: document.querySelector('#year-filter'),
  invoiceTableBody: document.querySelector('#invoice-table-body'),
  resultCount: document.querySelector('#result-count'),
  emptyState: document.querySelector('#empty-state'),
  resetFilters: document.querySelector('#reset-filters'),
  exportCsv: document.querySelector('#export-csv'),
  dataMessage: document.querySelector('#data-message')
}

const ugxFormatter = new Intl.NumberFormat('en-UG', {
  style: 'currency',
  currency: 'UGX',
  maximumFractionDigits: 0
})

const numberFormatter = new Intl.NumberFormat('en-UG')

function formatMoney (amount) {
  return ugxFormatter.format(Number(amount) || 0)
}

function formatNumber (value) {
  return numberFormatter.format(Number(value) || 0)
}

function formatDate (dateString) {
  if (!dateString) return '—'

  const date = new Date(`${dateString}T00:00:00`)
  if (Number.isNaN(date.getTime())) return dateString

  return new Intl.DateTimeFormat('en-UG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

function normalizeStatus (status) {
  return String(status ?? '')
    .trim()
    .toLowerCase()
}

function getStatusLabel (status) {
  const normalized = normalizeStatus(status)
  const labels = {
    paid: 'Paid',
    pending: 'Pending',
    overdue: 'Overdue',
    cancelled: 'Cancelled',
    draft: 'Draft'
  }

  return labels[normalized] ?? 'Unknown'
}

function createStatusBadge (status) {
  const badge = document.createElement('span')
  const normalized = normalizeStatus(status)
  const knownStatuses = ['paid', 'pending', 'overdue', 'cancelled', 'draft']

  badge.className = `status-badge status-${
    knownStatuses.includes(normalized) ? normalized : 'unknown'
  }`
  badge.textContent = getStatusLabel(status)

  return badge
}

function createCell (value, className = '') {
  const cell = document.createElement('td')
  cell.className = className
  cell.textContent =
    value === null || value === undefined || value === '' ? '—' : String(value)
  return cell
}

function updateDashboardStats () {
  const paidInvoices = invoices.filter(
    invoice => normalizeStatus(invoice.status) === 'paid'
  )
  const pendingInvoices = invoices.filter(
    invoice => normalizeStatus(invoice.status) === 'pending'
  )
  const overdueInvoices = invoices.filter(
    invoice => normalizeStatus(invoice.status) === 'overdue'
  )

  const totalValue = invoices.reduce(
    (total, invoice) => total + (Number(invoice.amount) || 0),
    0
  )
  const paidValue = paidInvoices.reduce(
    (total, invoice) => total + (Number(invoice.amount) || 0),
    0
  )
  const pendingValue = pendingInvoices.reduce(
    (total, invoice) => total + (Number(invoice.amount) || 0),
    0
  )
  const overdueValue = overdueInvoices.reduce(
    (total, invoice) => total + (Number(invoice.amount) || 0),
    0
  )

  elements.totalInvoiceCount.textContent = formatNumber(invoices.length)
  elements.totalInvoiceValue.textContent = formatMoney(totalValue)
  elements.paidInvoiceCount.textContent = formatNumber(paidInvoices.length)
  elements.paidInvoiceValue.textContent = formatMoney(paidValue)
  elements.pendingInvoiceCount.textContent = formatNumber(
    pendingInvoices.length
  )
  elements.pendingInvoiceValue.textContent = formatMoney(pendingValue)
  elements.overdueInvoiceCount.textContent = formatNumber(
    overdueInvoices.length
  )
  elements.overdueInvoiceValue.textContent = formatMoney(overdueValue)
}

function populateYearFilter () {
  const years = [
    ...new Set(
      invoices.map(invoice => String(invoice.year ?? '')).filter(Boolean)
    )
  ].sort((a, b) => Number(b) - Number(a))

  for (const year of years) {
    const option = document.createElement('option')
    option.value = year
    option.textContent = year
    elements.yearFilter.append(option)
  }
}

function getFilteredInvoices () {
  const searchTerm = elements.invoiceSearch.value.trim().toLowerCase()
  const selectedStatus = elements.statusFilter.value
  const selectedYear = elements.yearFilter.value

  return invoices.filter(invoice => {
    const searchableValues = [
      invoice.id,
      invoice.customerId,
      invoice.customerName,
      invoice.amount,
      invoice.status,
      invoice.year,
      invoice.createdAt
    ]

    const matchesSearch =
      !searchTerm ||
      searchableValues.some(value =>
        String(value ?? '')
          .toLowerCase()
          .includes(searchTerm)
      )
    const matchesStatus =
      selectedStatus === 'all' ||
      normalizeStatus(invoice.status) === selectedStatus
    const matchesYear =
      selectedYear === 'all' || String(invoice.year) === selectedYear

    return matchesSearch && matchesStatus && matchesYear
  })
}

function displayInvoices (records) {
  const fragment = document.createDocumentFragment()
  elements.invoiceTableBody.replaceChildren()

  for (const invoice of records) {
    const row = document.createElement('tr')
    row.className = 'invoice-row'

    const invoiceCell = createCell(invoice.id, 'invoice-id-cell')
    const customerCell = document.createElement('td')
    customerCell.className = 'px-5 py-4'

    const customerName = document.createElement('span')
    customerName.className = 'block font-semibold text-slate-800'
    customerName.textContent = invoice.customerName || 'Unknown customer'

    const customerId = document.createElement('span')
    customerId.className = 'mt-1 block text-xs text-slate-500'
    customerId.textContent = `Customer ID: ${invoice.customerId ?? '—'}`
    customerCell.append(customerName, customerId)

    const amountCell = createCell(
      formatMoney(invoice.amount),
      'whitespace-nowrap px-5 py-4 font-semibold text-slate-800'
    )
    const statusCell = document.createElement('td')
    statusCell.className = 'whitespace-nowrap px-5 py-4'
    statusCell.append(createStatusBadge(invoice.status))
    const yearCell = createCell(
      invoice.year,
      'whitespace-nowrap px-5 py-4 text-slate-600'
    )
    const dateCell = createCell(
      formatDate(invoice.createdAt),
      'whitespace-nowrap px-5 py-4 text-slate-600'
    )

    row.append(
      invoiceCell,
      customerCell,
      amountCell,
      statusCell,
      yearCell,
      dateCell
    )
    fragment.append(row)
  }

  elements.invoiceTableBody.append(fragment)
  elements.resultCount.textContent = `${formatNumber(records.length)} ${
    records.length === 1 ? 'invoice' : 'invoices'
  } found`
  elements.emptyState.hidden = records.length !== 0
}

function refreshInvoiceTable () {
  displayInvoices(getFilteredInvoices())
}

function resetFilters () {
  elements.invoiceSearch.value = ''
  elements.statusFilter.value = 'all'
  elements.yearFilter.value = 'all'
  refreshInvoiceTable()
  elements.invoiceSearch.focus()
}

function csvEscape (value) {
  const stringValue = String(value ?? '')
  return `"${stringValue.replaceAll('"', '""')}"`
}

function exportFilteredInvoices () {
  const records = getFilteredInvoices()
  if (records.length === 0) {
    elements.dataMessage.textContent =
      'There are no invoices in the current view to export.'
    elements.dataMessage.hidden = false
    return
  }

  elements.dataMessage.hidden = true

  const headers = [
    'Invoice ID',
    'Customer ID',
    'Customer Name',
    'Amount (UGX)',
    'Status',
    'Year',
    'Created At'
  ]
  const rows = records.map(invoice => [
    invoice.id,
    invoice.customerId,
    invoice.customerName,
    invoice.amount,
    getStatusLabel(invoice.status),
    invoice.year,
    invoice.createdAt
  ])

  const csvContent = [headers, ...rows]
    .map(row => row.map(csvEscape).join(','))
    .join('\r\n')
  const blob = new Blob(['\uFEFF', csvContent], {
    type: 'text/csv;charset=utf-8;'
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = 'invoice-records.csv'
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function initializeDashboard () {
  elements.currentYear.textContent = new Date().getFullYear()
  updateDashboardStats()
  populateYearFilter()
  refreshInvoiceTable()

  elements.invoiceSearch.addEventListener('input', refreshInvoiceTable)
  elements.statusFilter.addEventListener('change', refreshInvoiceTable)
  elements.yearFilter.addEventListener('change', refreshInvoiceTable)
  elements.resetFilters.addEventListener('click', resetFilters)
  elements.exportCsv.addEventListener('click', exportFilteredInvoices)

  if (window.lucide) window.lucide.createIcons()
}

window.addEventListener('load', () => {
  initializeDashboard()
})
