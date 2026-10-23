// DOM PRO MANIPULATIONS
import { customerTransactions as DATA } from './customer-data.js' //* the customer transactions

/**
 * 2. COMPONENT STATE
 */
let state = {
  searchQuery: '',
  sortColumn: 'id',
  sortDirection: 'desc',
  currentPage: 1,
  pageSize: 10,
  isLoading: true
}

/**
 * 3. UI RENDER ENGINE
 */
function render () {
  const tableBody = document.getElementById('tableBody')
  const emptyState = document.getElementById('emptyState')
  const tableElement = document.getElementById('mainTable')

  // 3a. Filter Data
  let filteredData = DATA.filter(item => {
    const searchStr =
      `${item.grantee} ${item.category} ${item.id} ${item.details}`.toLowerCase()
    return searchStr.includes(state.searchQuery.toLowerCase())
  })

  // 3b. Sort Data
  filteredData.sort((a, b) => {
    let valA = a[state.sortColumn]
    let valB = b[state.sortColumn]
    if (typeof valA === 'string') {
      return state.sortDirection === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
    }
    return state.sortDirection === 'asc' ? valA - valB : valB - valA
  })

  // 3c. Paginate Data
  const total = filteredData.length
  const totalPages = Math.ceil(total / state.pageSize)
  state.currentPage = Math.min(state.currentPage, totalPages) || 1
  const start = (state.currentPage - 1) * state.pageSize
  const paginatedData = filteredData.slice(start, start + state.pageSize)

  // 3d. Update UI
  tableBody.innerHTML = ''

  if (paginatedData.length === 0) {
    tableElement.classList.add('hidden')
    emptyState.classList.remove('hidden')
    emptyState.classList.add('flex')
  } else {
    tableElement.classList.remove('hidden')
    emptyState.classList.add('hidden')
    emptyState.classList.remove('flex')

    paginatedData.forEach(row => {
      const tr = document.createElement('tr')
      tr.className = 'hover:bg-indigo-50/30 cursor-default'
      tr.innerHTML = `
                        <td class="px-6 py-4 font-medium text-slate-900">#${
                          row.id
                        }</td>
                        <td class="px-6 py-4">
                            <div class="font-medium text-slate-900">${
                              row.grantee
                            }</div>
                            <div class="text-xs text-slate-400 mt-0.5">${
                              row.year
                            }</div>
                        </td>
                        <td class="px-6 py-4 text-slate-500 hidden lg:table-cell">${
                          row.geography
                        }</td>
                        <td class="px-6 py-4">
                            <span class="${getCategoryStyle(
                              row.category
                            )} px-2.5 py-0.5 rounded-full text-xs font-medium">
                                ${row.category}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-right font-mono font-semibold text-slate-700">
                            ${new Intl.NumberFormat('en-UG').format(row.ugx)}
                        </td>
                        <td class="px-6 py-4 text-center">
                            <a href="${
                              row.link
                            }" class="text-indigo-600 hover:text-indigo-900 font-medium inline-flex items-center gap-1">
                                View <i data-lucide="external-link" class="w-3 h-3"></i>
                            </a>
                        </td>
                    `
      tableBody.appendChild(tr)
    })
  }

  // Update Pagination Info
  document.getElementById('showingStart').innerText =
    total === 0 ? 0 : start + 1
  document.getElementById('showingEnd').innerText = Math.min(
    start + state.pageSize,
    total
  )
  document.getElementById('totalResults').innerText = total

  renderPagination(totalPages)
  lucide.createIcons()
}

function renderPagination (totalPages) {
  const container = document.getElementById('paginationControls')
  container.innerHTML = ''

  const btnClass =
    'px-3 py-1 border border-slate-200 rounded-md text-sm font-medium hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed'

  // Prev
  const prev = document.createElement('button')
  prev.className = btnClass
  prev.innerHTML = `<i data-lucide="chevron-left" class="w-4 h-4"></i>`
  prev.disabled = state.currentPage === 1
  prev.onclick = () => {
    state.currentPage--
    render()
  }
  container.appendChild(prev)

  // Page Numbers (Simplified)
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= state.currentPage - 1 && i <= state.currentPage + 1)
    ) {
      const p = document.createElement('button')
      p.innerText = i
      p.className = `${btnClass} ${
        state.currentPage === i
          ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
          : 'text-slate-600'
      }`
      p.onclick = () => {
        state.currentPage = i
        render()
      }
      container.appendChild(p)
    } else if (i === state.currentPage - 2 || i === state.currentPage + 2) {
      const span = document.createElement('span')
      span.innerText = '...'
      span.className = 'text-slate-400 px-1'
      container.appendChild(span)
    }
  }

  // Next
  const next = document.createElement('button')
  next.className = btnClass
  next.innerHTML = `<i data-lucide="chevron-right" class="w-4 h-4"></i>`
  next.disabled = state.currentPage === totalPages || totalPages === 0
  next.onclick = () => {
    state.currentPage++
    render()
  }
  container.appendChild(next)
}

/**
 * 4. UTILITIES
 */
function getCategoryStyle (cat) {
  switch (cat.toLowerCase()) {
    case 'community':
      return 'bg-blue-50 text-blue-700 border border-blue-100'
    case 'sponsorship':
      return 'bg-purple-50 text-purple-700 border border-purple-100'
    case 'donation':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100'
    default:
      return 'bg-slate-50 text-slate-700 border border-slate-100'
  }
}

function debounce (func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function resetFilters () {
  document.getElementById('globalSearch').value = ''
  state.searchQuery = ''
  render()
}

/**
 * 5. EVENT LISTENERS
 */
document.getElementById('globalSearch').addEventListener(
  'input',
  debounce(e => {
    state.searchQuery = e.target.value
    state.currentPage = 1
    render()
  })
)

document.getElementById('pageSize').addEventListener('change', e => {
  state.pageSize = parseInt(e.target.value)
  state.currentPage = 1
  render()
})

document.querySelectorAll('th[data-sort]').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.sort
    if (state.sortColumn === col) {
      state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      state.sortColumn = col
      state.sortDirection = 'asc'
    }
    render()
  })
})

// Initial Render
window.addEventListener('load', () => {
  initApp()
})

const initApp = () => {
  console.log('managing user transactions')
  // Simulate loading
  setTimeout(() => {
    render()
  }, 500)
}
