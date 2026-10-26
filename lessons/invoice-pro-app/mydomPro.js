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
  dateFrom: document.querySelector('#date-from'),
  dateTo: document.querySelector('#date-to'),
  columnFilterId: document.querySelector('#column-filter-id'),
  columnFilterCustomerId: document.querySelector('#column-filter-customer-id'),
  columnFilterCustomerName: document.querySelector(
    '#column-filter-customer-name'
  ),
  columnFilterAmount: document.querySelector('#column-filter-amount'),
  columnFilterStatus: document.querySelector('#column-filter-status'),
  columnFilterYear: document.querySelector('#column-filter-year'),
  columnFilterCreatedAt: document.querySelector('#column-filter-created-at'),
  invoiceTableBody: document.querySelector('#invoice-table-body'),
  resultCount: document.querySelector('#result-count'),
  emptyState: document.querySelector('#empty-state'),
  resetFilters: document.querySelector('#reset-filters'),
  exportFormat: document.querySelector('#export-format'),
  exportButton: document.querySelector('#export-button'),
  dataMessage: document.querySelector('#data-message'),
  sortingDescription: document.querySelector('#sorting-description')
}

const ugxFormatter = new Intl.NumberFormat('en-UG', {
  style: 'currency',
  currency: 'UGX',
  maximumFractionDigits: 0
})
const numberFormatter = new Intl.NumberFormat('en-UG')
const knownStatuses = ['paid', 'pending', 'overdue', 'cancelled', 'draft']
const sortState = { key: 'createdAt', direction: 'desc' }

const sortLabels = {
  id: 'Invoice ID',
  customerId: 'Customer ID',
  customerName: 'Customer',
  amount: 'Amount',
  status: 'Status',
  year: 'Year',
  createdAt: 'Created date'
}

function formatMoney (amount) {
  return ugxFormatter.format(Number(amount) || 0)
}

function formatNumber (value) {
  return numberFormatter.format(Number(value) || 0)
}

function formatDate (dateString) {
  if (!dateString) return '—'
  const date = new Date(`${dateString}T00:00:00`)
  if (Number.isNaN(date.getTime())) return String(dateString)
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
  const paid = invoices.filter(
    invoice => normalizeStatus(invoice.status) === 'paid'
  )
  const pending = invoices.filter(
    invoice => normalizeStatus(invoice.status) === 'pending'
  )
  const overdue = invoices.filter(
    invoice => normalizeStatus(invoice.status) === 'overdue'
  )
  const sum = records =>
    records.reduce((total, invoice) => total + (Number(invoice.amount) || 0), 0)

  elements.totalInvoiceCount.textContent = formatNumber(invoices.length)
  elements.totalInvoiceValue.textContent = formatMoney(sum(invoices))
  elements.paidInvoiceCount.textContent = formatNumber(paid.length)
  elements.paidInvoiceValue.textContent = formatMoney(sum(paid))
  elements.pendingInvoiceCount.textContent = formatNumber(pending.length)
  elements.pendingInvoiceValue.textContent = formatMoney(sum(pending))
  elements.overdueInvoiceCount.textContent = formatNumber(overdue.length)
  elements.overdueInvoiceValue.textContent = formatMoney(sum(overdue))
}

function addYearOptions (selectElement, firstLabel) {
  const years = [
    ...new Set(
      invoices.map(invoice => String(invoice.year ?? '')).filter(Boolean)
    )
  ].sort((a, b) => Number(b) - Number(a))

  selectElement.replaceChildren()
  const allOption = document.createElement('option')
  allOption.value = 'all'
  allOption.textContent = firstLabel
  selectElement.append(allOption)

  for (const year of years) {
    const option = document.createElement('option')
    option.value = year
    option.textContent = year
    selectElement.append(option)
  }
}

function getColumnFilters () {
  return {
    id: elements.columnFilterId.value.trim().toLowerCase(),
    customerId: elements.columnFilterCustomerId.value.trim().toLowerCase(),
    customerName: elements.columnFilterCustomerName.value.trim().toLowerCase(),
    amount: elements.columnFilterAmount.value.trim().toLowerCase(),
    status: elements.columnFilterStatus.value,
    year: elements.columnFilterYear.value,
    createdAt: elements.columnFilterCreatedAt.value.trim().toLowerCase()
  }
}

function includesText (value, query) {
  return String(value ?? '')
    .toLowerCase()
    .includes(query)
}

function matchesDateRange (invoice, fromDate, toDate) {
  if (!fromDate && !toDate) return true
  const date = String(invoice.createdAt ?? '')
  // ISO dates can be compared lexically. Records without valid dates do not
  // match an explicitly requested date range.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false
  return (!fromDate || date >= fromDate) && (!toDate || date <= toDate)
}

function getFilteredInvoices () {
  const searchTerm = elements.invoiceSearch.value.trim().toLowerCase()
  const selectedStatus = elements.statusFilter.value
  const selectedYear = elements.yearFilter.value
  const fromDate = elements.dateFrom.value
  const toDate = elements.dateTo.value
  const filters = getColumnFilters()

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
      searchableValues.some(value => includesText(value, searchTerm))
    const matchesStatus =
      selectedStatus === 'all' ||
      normalizeStatus(invoice.status) === selectedStatus
    const matchesYear =
      selectedYear === 'all' || String(invoice.year ?? '') === selectedYear
    const matchesRange = matchesDateRange(invoice, fromDate, toDate)
    const matchesIdColumn = includesText(invoice.id, filters.id)
    const matchesCustomerIdColumn = includesText(
      invoice.customerId,
      filters.customerId
    )
    const matchesCustomerNameColumn = includesText(
      invoice.customerName,
      filters.customerName
    )
    const matchesAmountColumn =
      !filters.amount ||
      includesText(invoice.amount, filters.amount) ||
      includesText(formatMoney(invoice.amount), filters.amount)
    const matchesStatusColumn =
      filters.status === 'all' ||
      normalizeStatus(invoice.status) === filters.status
    const matchesYearColumn =
      filters.year === 'all' || String(invoice.year ?? '') === filters.year
    const matchesCreatedAtColumn =
      !filters.createdAt ||
      includesText(invoice.createdAt, filters.createdAt) ||
      includesText(formatDate(invoice.createdAt), filters.createdAt)

    return (
      matchesSearch &&
      matchesStatus &&
      matchesYear &&
      matchesRange &&
      matchesIdColumn &&
      matchesCustomerIdColumn &&
      matchesCustomerNameColumn &&
      matchesAmountColumn &&
      matchesStatusColumn &&
      matchesYearColumn &&
      matchesCreatedAtColumn
    )
  })
}

function compareValues (left, right, key) {
  if (key === 'amount' || key === 'year')
    return (Number(left[key]) || 0) - (Number(right[key]) || 0)
  if (key === 'createdAt')
    return String(left[key] ?? '').localeCompare(String(right[key] ?? ''))
  return String(left[key] ?? '').localeCompare(
    String(right[key] ?? ''),
    undefined,
    { numeric: true, sensitivity: 'base' }
  )
}

function getVisibleInvoices () {
  const directionFactor = sortState.direction === 'asc' ? 1 : -1
  return getFilteredInvoices()
    .slice()
    .sort(
      (left, right) =>
        compareValues(left, right, sortState.key) * directionFactor
    )
}

function updateSortIndicators () {
  document.querySelectorAll('[data-sort-key]').forEach(button => {
    const key = button.dataset.sortKey
    const indicator = button.querySelector('.sort-indicator')
    const active = key === sortState.key
    if (indicator)
      indicator.textContent = active
        ? sortState.direction === 'asc'
          ? '↑'
          : '↓'
        : '↕'
    button.setAttribute(
      'aria-sort',
      active
        ? sortState.direction === 'asc'
          ? 'ascending'
          : 'descending'
        : 'none'
    )
    button.classList.toggle('is-sorted', active)
  })
  const direction = sortState.direction === 'asc' ? 'ascending' : 'descending'
  const description =
    sortState.key === 'createdAt' && sortState.direction === 'desc'
      ? 'newest first'
      : sortState.key === 'createdAt' && sortState.direction === 'asc'
      ? 'oldest first'
      : direction
  elements.sortingDescription.textContent = `Sorted by ${
    sortLabels[sortState.key]
  }: ${description}.`
}

function displayInvoices (records) {
  const fragment = document.createDocumentFragment()
  elements.invoiceTableBody.replaceChildren()

  for (const invoice of records) {
    const row = document.createElement('tr')
    row.className = 'invoice-row'
    row.append(
      createCell(invoice.id, 'invoice-id-cell'),
      createCell(
        invoice.customerId,
        'whitespace-nowrap px-3 py-4 text-slate-600'
      ),
      createCell(
        invoice.customerName || 'Unknown customer',
        'whitespace-nowrap px-3 py-4 font-semibold text-slate-800'
      ),
      createCell(
        formatMoney(invoice.amount),
        'whitespace-nowrap px-3 py-4 font-semibold text-slate-800'
      )
    )
    const statusCell = document.createElement('td')
    statusCell.className = 'whitespace-nowrap px-3 py-4'
    statusCell.append(createStatusBadge(invoice.status))
    row.append(statusCell)
    row.append(
      createCell(invoice.year, 'whitespace-nowrap px-3 py-4 text-slate-600'),
      createCell(
        formatDate(invoice.createdAt),
        'whitespace-nowrap px-3 py-4 text-slate-600'
      )
    )
    fragment.append(row)
  }

  elements.invoiceTableBody.append(fragment)
  elements.resultCount.textContent = `${formatNumber(records.length)} ${
    records.length === 1 ? 'invoice' : 'invoices'
  } found`
  elements.emptyState.hidden = records.length !== 0
  updateSortIndicators()
}

function refreshInvoiceTable () {
  displayInvoices(getVisibleInvoices())
  elements.dataMessage.hidden = true
}

function resetFilters () {
  elements.invoiceSearch.value = ''
  elements.statusFilter.value = 'all'
  elements.yearFilter.value = 'all'
  elements.dateFrom.value = ''
  elements.dateTo.value = ''
  elements.columnFilterId.value = ''
  elements.columnFilterCustomerId.value = ''
  elements.columnFilterCustomerName.value = ''
  elements.columnFilterAmount.value = ''
  elements.columnFilterStatus.value = 'all'
  elements.columnFilterYear.value = 'all'
  elements.columnFilterCreatedAt.value = ''
  sortState.key = 'createdAt'
  sortState.direction = 'desc'
  refreshInvoiceTable()
  elements.invoiceSearch.focus()
}

function showMessage (message, type = 'warning') {
  elements.dataMessage.textContent = message
  elements.dataMessage.className =
    type === 'success'
      ? 'mx-5 mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 sm:mx-6'
      : 'mx-5 mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 sm:mx-6'
  elements.dataMessage.hidden = false
}

function csvEscape (value) {
  let text = String(value ?? '')
  // Protect spreadsheet users from formula injection in string fields.
  if (/^[\s]*[=+@]/.test(text) || /^[\s]*-/.test(text)) text = `'${text}`
  return `"${text.replaceAll('"', '""')}"`
}

const exportHeaders = [
  'Invoice ID',
  'Customer ID',
  'Customer Name',
  'Amount (UGX)',
  'Status',
  'Year',
  'Created At'
]

function exportRows (records) {
  return records.map(invoice => [
    invoice.id ?? '',
    invoice.customerId ?? '',
    invoice.customerName ?? '',
    Number(invoice.amount) || 0,
    getStatusLabel(invoice.status),
    invoice.year ?? '',
    invoice.createdAt ?? ''
  ])
}

function downloadBlob (blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function exportCsv (records) {
  const content = [exportHeaders, ...exportRows(records)]
    .map(row => row.map(csvEscape).join(','))
    .join('\r\n')
  downloadBlob(
    new Blob(['\uFEFF', content], { type: 'text/csv;charset=utf-8;' }),
    'invoice-records.csv'
  )
}

function exportText (records) {
  const rows = exportRows(records)
  const lines = [
    `INVOICE RECORDS`,
    `Exported: ${new Date().toLocaleString()}`,
    `Records: ${records.length}`,
    ''
  ]
  lines.push(exportHeaders.join(' | '))
  lines.push('-'.repeat(100))
  for (const row of rows)
    lines.push(
      row.map(value => String(value ?? '').replaceAll('|', '\\|')).join(' | ')
    )
  downloadBlob(
    new Blob([lines.join('\r\n')], { type: 'text/plain;charset=utf-8' }),
    'invoice-records.txt'
  )
}

function exportJson (records) {
  const blob = new Blob([JSON.stringify(records, null, 2)], {
    type: 'application/json;charset=utf-8'
  })
  downloadBlob(blob, 'invoice-records.json')
}

function exportExcel (records) {
  if (!window.XLSX)
    throw new Error(
      'The Excel export library did not load. Check your internet connection and reload the page.'
    )
  const data = [exportHeaders, ...exportRows(records)]
  const worksheet = window.XLSX.utils.aoa_to_sheet(data)
  worksheet['!cols'] = [
    { wch: 16 },
    { wch: 14 },
    { wch: 22 },
    { wch: 18 },
    { wch: 14 },
    { wch: 10 },
    { wch: 16 }
  ]
  const workbook = window.XLSX.utils.book_new()
  window.XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoice Records')
  window.XLSX.writeFile(workbook, 'invoice-records.xlsx')
}

function exportPdf (records) {
  const JsPDF = window.jspdf?.jsPDF
  if (!JsPDF)
    throw new Error(
      'The PDF export library did not load. Check your internet connection and reload the page.'
    )
  const documentPdf = new JsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4'
  })
  documentPdf.setFontSize(16)
  documentPdf.text('Invoice Records', 40, 36)
  documentPdf.setFontSize(9)
  documentPdf.text(
    `Records: ${records.length} | Generated: ${new Date().toLocaleString()}`,
    40,
    53
  )
  const body = records.map(invoice => [
    String(invoice.id ?? ''),
    String(invoice.customerId ?? ''),
    String(invoice.customerName ?? ''),
    `UGX ${formatNumber(invoice.amount)}`,
    getStatusLabel(invoice.status),
    String(invoice.year ?? ''),
    String(invoice.createdAt ?? '')
  ])
  if (typeof documentPdf.autoTable !== 'function')
    throw new Error(
      'The PDF table plugin did not load. Reload the page and try again.'
    )
  documentPdf.autoTable({
    head: [exportHeaders],
    body,
    startY: 68,
    styles: { fontSize: 8, cellPadding: 5, overflow: 'linebreak' },
    headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    margin: { left: 40, right: 40 }
  })
  documentPdf.save('invoice-records.pdf')
}

function escapeHtml (value) {
  return String(value ?? '').replace(
    /[&<>"']/g,
    character =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[character])
  )
}

function exportWord (records) {
  const bodyRows = records
    .map(invoice => {
      const row = [
        invoice.id,
        invoice.customerId,
        invoice.customerName,
        `UGX ${formatNumber(invoice.amount)}`,
        getStatusLabel(invoice.status),
        invoice.year,
        invoice.createdAt
      ]
      return `<tr>${row
        .map(value => `<td>${escapeHtml(value)}</td>`)
        .join('')}</tr>`
    })
    .join('')
  const tableHead = exportHeaders
    .map(header => `<th>${escapeHtml(header)}</th>`)
    .join('')
  const htmlDocument = `<!doctype html><html><head><meta charset="utf-8"><title>Invoice Records</title><style>body{font-family:Arial,sans-serif;color:#1e293b}h1{color:#1e3a8a}p{color:#475569}table{border-collapse:collapse;width:100%}th,td{border:1px solid #cbd5e1;padding:7px;text-align:left;font-size:10pt}th{background:#1e293b;color:#fff}tr:nth-child(even){background:#f1f5f9}</style></head><body><h1>Invoice Records</h1><p>Exported ${escapeHtml(
    new Date().toLocaleString()
  )} | ${
    records.length
  } records</p><table><thead><tr>${tableHead}</tr></thead><tbody>${bodyRows}</tbody></table></body></html>`
  downloadBlob(
    new Blob(['\ufeff', htmlDocument], {
      type: 'application/msword;charset=utf-8'
    }),
    'invoice-records.doc'
  )
}

async function exportDocx (records) {
  const library = window.docx
  if (!library?.Document || !library?.Packer || !library?.Table) {
    throw new Error(
      'The DOCX export library did not load. Check your internet connection and reload the page.'
    )
  }

  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    HeadingLevel,
    PageOrientation
  } = library
  const makeCell = (value, isHeader = false) =>
    new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: String(value ?? ''),
              bold: isHeader,
              color: isHeader ? 'FFFFFF' : '1E293B',
              size: 18
            })
          ]
        })
      ],
      shading: isHeader ? { fill: '1E293B' } : undefined,
      verticalAlign: 'center'
    })

  const headerRow = new TableRow({
    tableHeader: true,
    children: exportHeaders.map(header => makeCell(header, true))
  })
  const dataRows = records.map(invoice => {
    const values = [
      invoice.id,
      invoice.customerId,
      invoice.customerName,
      `UGX ${formatNumber(invoice.amount)}`,
      getStatusLabel(invoice.status),
      invoice.year,
      invoice.createdAt
    ]
    return new TableRow({ children: values.map(value => makeCell(value)) })
  })

  const documentFile = new Document({
    creator: 'Ionic Solutions Ltd',
    title: 'Invoice Records',
    description:
      'Exported invoice records from the Invoice Management Dashboard',
    sections: [
      {
        properties: {
          page: { size: { orientation: PageOrientation.LANDSCAPE } }
        },
        children: [
          new Paragraph({
            text: 'Invoice Records',
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Exported: ${new Date().toLocaleString()} | Records: ${
                  records.length
                }`,
                color: '64748B',
                size: 18
              })
            ]
          }),
          new Paragraph({ text: '' }),
          new Table({
            rows: [headerRow, ...dataRows],
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: [1800, 1400, 2200, 1900, 1400, 900, 1800]
          })
        ]
      }
    ]
  })
  const blob = await Packer.toBlob(documentFile)
  downloadBlob(blob, 'invoice-records.docx')
}

async function exportFilteredInvoices () {
  const records = getVisibleInvoices()
  if (records.length === 0) {
    showMessage('There are no invoices in the current filtered view to export.')
    return
  }

  const format = elements.exportFormat.value
  const exporters = {
    csv: exportCsv,
    xlsx: exportExcel,
    pdf: exportPdf,
    docx: exportDocx,
    doc: exportWord,
    json: exportJson,
    txt: exportText
  }

  try {
    const exporter = exporters[format]
    if (!exporter) throw new Error('Please select a supported export format.')
    await exporter(records)
    showMessage(
      `Export prepared: ${
        records.length
      } invoice record(s) in ${format.toUpperCase()} format.`,
      'success'
    )
  } catch (error) {
    console.error('Invoice export failed:', error)
    showMessage(
      error instanceof Error
        ? error.message
        : 'Export failed. Please try again.'
    )
  }
}

function handleSort (event) {
  const button = event.target.closest('[data-sort-key]')
  if (!button) return
  const key = button.dataset.sortKey
  if (!key || !(key in sortLabels)) return

  if (sortState.key === key) {
    sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc'
  } else {
    sortState.key = key
    sortState.direction = 'asc'
  }
  refreshInvoiceTable()
}

function initializeDashboard () {
  elements.currentYear.textContent = new Date().getFullYear()
  addYearOptions(elements.yearFilter, 'All years')
  addYearOptions(elements.columnFilterYear, 'All years')
  updateDashboardStats()
  refreshInvoiceTable()

  elements.invoiceSearch.addEventListener('input', refreshInvoiceTable)
  elements.statusFilter.addEventListener('change', refreshInvoiceTable)
  elements.yearFilter.addEventListener('change', refreshInvoiceTable)
  elements.dateFrom.addEventListener('change', () => {
    if (
      elements.dateTo.value &&
      elements.dateFrom.value &&
      elements.dateFrom.value > elements.dateTo.value
    ) {
      elements.dateTo.value = elements.dateFrom.value
    }
    refreshInvoiceTable()
  })
  elements.dateTo.addEventListener('change', () => {
    if (
      elements.dateFrom.value &&
      elements.dateTo.value &&
      elements.dateTo.value < elements.dateFrom.value
    ) {
      elements.dateFrom.value = elements.dateTo.value
    }
    refreshInvoiceTable()
  })

  const columnFilterInputs = [
    elements.columnFilterId,
    elements.columnFilterCustomerId,
    elements.columnFilterCustomerName,
    elements.columnFilterAmount,
    elements.columnFilterStatus,
    elements.columnFilterYear,
    elements.columnFilterCreatedAt
  ]
  for (const input of columnFilterInputs) {
    input.addEventListener(
      input.tagName === 'SELECT' ? 'change' : 'input',
      refreshInvoiceTable
    )
  }

  document
    .querySelector('.invoice-table thead')
    .addEventListener('click', handleSort)
  elements.resetFilters.addEventListener('click', resetFilters)
  elements.exportButton.addEventListener('click', exportFilteredInvoices)
  if (window.lucide) window.lucide.createIcons()
}

initializeDashboard()
