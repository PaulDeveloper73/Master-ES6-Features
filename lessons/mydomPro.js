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
  const taskList = document.querySelectorAll('ul#tasks')

  taskList.forEach(element => {
    console.log(element.textContent)
  })
}
