import { invoices } from './invoices.js'

window.addEventListener('load', () => {
  initApp()
})
const initApp = () => {
  console.log('Loading data soon!...')
  const currentYear = document.querySelector('#current-year')
  const myYear = new Date().getFullYear()
  currentYear.textContent = myYear
  const changeButton = document.querySelector('#changeButton')
  const heading = document.querySelector('#heading')
  changeButton.addEventListener('click', e => {
    e.preventDefault()
    const currURL = document.location.origin + document.location.pathname
    heading.textContent = 'Processing the transaction now.'
    window.location.href = `${currURL}?id=1234&status=paid&customerId=42&year=2026`
  })
  //   Document
  console.log('\n--------------------\n')
  console.log(document)
  console.log(document.title)
  console.log(document.head.childElementCount)
  console.log(document.body)
  console.log(document.URL)
  console.log(document.location)

  //   Get search params
  console.log('-------Extracting the user search parameters---------\n')
  const params = new URLSearchParams(window.location.search)
  console.log(window.location.search)
  console.log('Client Id: ' + params.get('customerId'))
  console.log('Invioce status is: ' + params.get('status'))
  console.log(window.location.href)
  const currentUrl = new URL(window.location.href)
  console.log('--------Current URL details: ------------')
  console.log(currentUrl)

  console.log('Complete URL:', currentUrl.href)
  console.log('Page path:', currentUrl.pathname)
  console.log('Query parameters:', currentUrl.searchParams)

  for (const [key, value] of currentUrl.searchParams.entries()) {
    console.log(`${key}: ${value}`)
  }
  console.log(invoices)

  // /////////// DOm details
  console.log(document.documentElement)
  myDom()
}

const myDom = () => {
  const title = document.querySelector('#pageTitle')
  const description = document.querySelector('.description')
  const saveButton = document.querySelector('button')

  console.log(title.textContent)
  console.log(description.textContent)
  console.log(saveButton.textContent)
  console.log(saveButton?.classList.add('shadow-xl'))
  saveButton.style.marginBottom = '40px'
  const taskList = document.querySelectorAll('ul#tasks')
  let taskListPro = document.querySelector('.tasks')

  taskList.forEach(element => {
    console.log(element.textContent)
  })
  if (taskListPro) {
    console.log(taskListPro)
  } else {
    taskListPro = document.createElement('h2')
    taskListPro.textContent = 'Updated Dashboard'
    taskListPro.textContent += ' Loading..'
    console.log(taskListPro)
  }
  let result = Number('5') + 6
  console.log(result)

  // \n      New line
  // \t      Tab
  // \r      Carriage return
  // \\      Backslash
  // \"      Double quote
  // \'      Single quote
  let username = 'Joshua'
  console.log(username?.toUpperCase() && `${username}, Welcome!`)
  console.log(username?.toUpperCase() ?? `${username}, Welcome!`)
  //Spread operator usage
  const myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const myuser = {
    name: 'Paul',
    items: [...myArray]
  }
  //rest Operator Usage
  const sumAllNumber = (...numbers) => {
    // Above is rest operator used in operation
    console.log(numbers)
    return numbers.map(n => n).reduce((total, acc) => total + acc, 0)
  }
  const total = sumAllNumber(...myArray) // Spread operator in operation
  console.log(myuser)
  console.log('<<--- Sum of Numbers (0 - 9) is--->>')
  console.log(total)

  //  html attributes data-  details
  const viewInvoice = document.querySelector('#view-invoice')
  // const invoiceNo = viewInvoice.dataset.invoiceId
  const invoiceNo = viewInvoice.dataset.invoiceId
  const invoiceStatus = viewInvoice.dataset.status
  console.log(viewInvoice)
  console.log(
    '--------Extracting dataset details from the html element--------------'
  )
  console.log('Invoice No: ' + invoiceNo)
  console.log('Invoice Staus: ' + invoiceStatus)

  // ** JS Events: make the page interactive
  const greetButton = document.querySelector('#greetButton')
  greetButton.addEventListener('click', e => {
    e.preventDefault()
    console.log(e.type)
    console.log(e.target)
    console.log(e.currentTarget)
    console.log(e.currentTarget.textContent)
  })
  // Select an inovice data id details
  const invoiceList = document.querySelector('#invoiceList')
  invoiceList.addEventListener('click', event => {
    const button = event.target.closest('button[data-id]')
    if (!button || !invoiceList.contains(button)) {
      return
    }
    console.log('Selected invoice:', button.dataset.id)
  })
  const employeeForm = document.querySelector('#employeeForm')
  const employeeNameInput = document.querySelector('#employeeName')
  const employeeEmailInput = document.querySelector('#employeeEmail')
  const formMessage = document.querySelector('#formMessage')
  const grossSalalry = document.querySelector('#gross-salalry')
  const grossSalary = Number.parseFloat(grossSalalry)

  if (!Number.isFinite(grossSalary) || grossSalary <= 0) {
    // Handle invalid gross salary
  }
  employeeForm.addEventListener('submit', event => {
    event.preventDefault()
    const employeeName = employeeNameInput.value.trim()
    const employeeEmail = employeeEmailInput.value.trim()
    formMessage.classList.add('text-green-800')
    if (!employeeName || !employeeEmail) {
      formMessage.textContent = 'Please complete both fields.'
      return
    }
    if (!employeeForm.checkValidity()) {
      employeeForm.reportValidity()
      return
    }
    if (grossSalary <= 0) {
      employeeForm.reportValidity()
      formMessage.textContent = `Enter valid amount`
      formMessage.classList.add('text-red-500')
      grossSalalry.focus()
      grossSalalry.classList.add('border-red-600')
      return
    }
    formMessage.textContent = `Employee ${employeeName} has been saved!.`
    setTimeout(() => {
      formMessage.textContent = ` `
      employeeForm.reset()
      employeeNameInput.focus()
    }, 5000)
  })

  const addCustomer = document.querySelector('#add-customer')
  addCustomer.disabled = true
  addCustomer.style.cursor = 'wait'
  addCustomer.classList.contains('text-slate-300')
  addCustomer.style.opacity = '.4'
  addCustomer.textContent = 'Loading...'
  const custStyles = getComputedStyle(addCustomer)
  console.log(custStyles.backgroundColor)

  // Find the closest button near this id: save-btn
  const saveBtn = document.querySelector('#save-btn')
  const myBtn = saveBtn.closest('p')
  console.log(saveBtn)
  console.log(myBtn)
  const invoiceSearch = document.querySelector('#invoiceSearch')
  const searchMessage = document.querySelector('#searchMessage')
  invoiceSearch.addEventListener('input', e => {
    e.preventDefault()
    const userSearch = e.target.value.trim()
    if (userSearch) {
      searchMessage.textContent = userSearch
      searchMessage.classList.add('capitalize')
    }
  })

  // Working with form:
}
