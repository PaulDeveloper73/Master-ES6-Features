import customerData from './customer.js'
const vehicle = {
  wheel: 4,
  color: ['red', 'green', 'blue', 'orange', 'black'],
  brand: 'Toyota',
  horsePower: '50000cc',
  manufactered_year: 2021,
  engine: function () {
    return console.log(`Vooo,   capacity is: ${this.horsePower}`)
  }
}
console.log(vehicle.wheel)
console.log(vehicle.engine())
//new object
const car = Object.create(vehicle)
console.log(car.brand)
car.horsePower = '9000CC'
car.engine = () => {
  return console.log(`Sheeee,   capacity is: ${car.horsePower}`)
}
car.engine()
// delete object property
// delete vehicle.color
console.log(vehicle)
// add another color for car object
car.color.push('Pink')
const myCarColors = car.color.map(color => color.toUpperCase())
console.log(myCarColors)
console.log(vehicle.color)
// object destructuring
const { horsePower: carCC, wheeel: myCarWheels } = vehicle
console.log(carCC)
// const bodaBoda = Object.assign({}, car, { isLatestModel: true })
const bodaBoda2 = Object.assign({}, car, { isLatestModel: true })
console.log(car)
// console.log(bodaBoda)
console.log(bodaBoda2)
//* JavaScript classes

class MyCompany {
  constructor (
    companyName,
    companyRevenue,
    basicSalary,
    staffName,
    allowancesPercentage = 0.07
  ) {
    this.companyName = companyName
    this.companyRevenue = companyRevenue
    this.basicSalary = basicSalary
    this.allowancesPercentage = allowancesPercentage
    this.staffName = staffName
  }
  setBasicSalary (salary) {
    this.basicSalary = salary
  }
  getBasicSalary () {
    return this.basicSalary
  }
  getAllowanceAmount () {
    return this.allowancesPercentage * this.basicSalary
  }
  getAllowancePercentage () {
    return this.allowancesPercentage
  }

  calculateGrossSalary () {
    return this.allowancesPercentage * this.basicSalary + this.basicSalary
  }
  getStaffDetails () {
    return ` My Name is ${
      this.staffName
    }  my gross salary is:SHs. ${this.calculateGrossSalary().toLocaleString()} working at ${
      this.companyName
    }`
  }

  setCompanyName (companyName) {
    this.companyName = companyName
  }
  getCompanyName () {
    return this.companyName
  }

  setStaffName (staffName) {
    this.staffName = staffName
  }
  getStaffName () {
    return this.staffName
  }
}

const myCompanyObj = new MyCompany(
  'Ebeneza Shoes Hub Ltd',
  4_500_000_000,
  500_000,
  'Magezi Joshua',
  0.07
)
myCompanyObj.setBasicSalary(1_200_000)
console.log(`My company is called: ${myCompanyObj.getCompanyName()}`)
console.log(myCompanyObj.getStaffDetails())
console.log(
  ' My basic salary is: ' + myCompanyObj.getBasicSalary().toLocaleString()
)
console.log()
console.log(
  'My allowance is ' + myCompanyObj.getAllowanceAmount().toLocaleString()
)
console.log(myCompanyObj.getBasicSalary().toLocaleString())
// class in heritance

class MinCompany extends MyCompany {
  constructor (
    companyName,
    companyRevenue,
    basicSalary,
    staffName,
    allowancesPercentage = 0.07,
    no_employees = 0
  ) {
    super(
      companyName,
      companyRevenue,
      basicSalary,
      staffName,
      allowancesPercentage
    )
    this.no_employees = no_employees
  }
  setEmployeeTotal (employee_no) {
    return employee_no
  }
  getStaffDetails () {
    return ` My Name is ${
      this.staffName
    }  my gross salary is:SHs. ${this.calculateGrossSalary().toLocaleString()} working at ${
      this.companyName
    }`
  }
}

const myMinCompanyObj = new MinCompany(
  'Josh Company Ltd',
  3_000_000_000,
  1_700_000,
  'Kisakye Paul',
  0.04,
  34
)

console.log(
  'Basic salary: UGX ' + myMinCompanyObj.getBasicSalary().toLocaleString()
)

console.log(
  'Allowance: UGX ' + myMinCompanyObj.getAllowanceAmount().toLocaleString()
)

console.log(
  'Allowance percentage: ' +
    myMinCompanyObj.getAllowancePercentage() * 100 +
    '%'
)

console.log(
  `Employee: ${myMinCompanyObj.getStaffName()}, Gross Salary: 
  ${myMinCompanyObj.calculateGrossSalary().toLocaleString()}`
)
console.log('User full details are here:')
console.log(myMinCompanyObj.getStaffDetails())
//JSON stands for JavaScript Object Notation.
//It is a text-based format used to store and exchange structured data.
// WOKRING WITH JSON DATA,  JS ERRORS WITH TRY AND CATCH BLOCKS
// const vehicle = 'Paul'
// console.log(vehicle)//creates syntax error
// Object..assign()// creates syntax error
// console.log(james) // Creates a reference error
//* Working with JSON Data
console.log(typeof vehicle) //Object Data
const receiveData = JSON.stringify(vehicle) //
console.log(typeof receiveData) // String data

//* conversion back to an object is here
const myVehicleObj = JSON.parse(receiveData)
console.log(typeof myVehicleObj)
console.log(myVehicleObj) // Back to original object but methods were lost during string conversion process

// * Handling Errors
console.error('This is acustom error')
console.warn('This is acustom')
// * errors while using try and catch block

const makeError = () => {
  let i = 0
  while (i <= 10) {
    try {
      if (i % 2 !== 0) {
        throw new Error('This is Odd Number')
      }
      console.log('This is even number: ' + i)
    } catch (err) {
      console.error(err.stack)
    } finally {
      i++
      console.log('Finally block executed no matter what')
    }
  }
}
makeError()

// * Document Object Model

// * JavaScript Masterclass: JSON, try...catch, and fetch() — from beginner to professional React developer
//These three concepts work together in almost every modern web application. When you build React 18/19 applications, you will use them to communicate with APIs, load invoices, register customers, authenticate users, handle payments, and display errors when something goes wrong.
//Imagine you are building a financial application that displays invoices.
// {
//   "id": 1,
//   "name": "Paul",
//   "email": "paul@example.com",
//   "isActive": true,
//   "balance": 250000,
// "name": "Paul",
// "age": 30,
// "isDeveloper": true,
// "isMarried": false,
// "middleName": null,
// "skills": ["JavaScript", "React", "Node.js"],
// "address": {
//   "city": "Kampala",
//   "country": "Uganda"
// }

// }
// JSON.stringify(value,replacor,space) // syntax
console.log(customerData) // the customer data details are here.
console.log('Convert Js customer object to text value is here')
const convertedCutomerdata = JSON.stringify(customerData)
console.log(convertedCutomerdata, null, 2) // indent by 2 spacefromthe right, good for debgging API data
console.log('The above JSON is of type: ' + typeof convertedCutomerdata)
console.log(JSON.stringify('paul'))
const user = { name: 'Paul' }
// user.self = user // This hinder the object from being stringified because its refering to its own self

JSON.stringify(user) // Throws TypeError
console.log('object')
// * JSON.PARSE
const jsonCustomer = '{"id":1,"name":"Paul","isActive":true}'
//CONVERT THE JSON TEXT
console.log(typeof jsonCustomer)
const response = JSON.parse(jsonCustomer)
console.log(response)
console.log(typeof response)
console.log(response.name)
// Try & catch block
const jsonCustomerPro = '{"name": "Paul",}'

try {
  const customer = JSON.parse(jsonCustomerPro)

  console.log(customer.name)
} catch (error) {
  console.error('Could not read customer data:', error.stack)
} finally {
  console.log('Application continues')
}

function createInvoice (amount) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    throw new TypeError('Invoice amount must be a finite number')
  }

  if (amount <= 0) {
    throw new RangeError('Invoice amount must be greater than zero')
  }

  return {
    id: 'INV-001',
    amount,
    status: 'unpaid'
  }
}

try {
  const invoice = createInvoice(50000)
  // console.log(invoice)
} catch (error) {
  console.error(error.message)
}
console.clear()
// * Fetch APIs
// this aweb API for making http requests.
// async function createCustomer(customerData) {
// try {
//   const response = await fetch('/api/customers', {
//     method: 'POST',

//     headers: {
//       'Content-Type': 'application/json'
//     },

//     body: JSON.stringify(customerData)
//   })

//   if (!response.ok) {
//     throw new Error(`Failed to create customer: HTTP ${response.status}`)
//   }

//   const createdCustomer = await response.json()

//   console.log('Customer created:', createdCustomer)

//   return createdCustomer
// } catch (error) {
//   console.error('Create customer failed:', error)
//   throw error
// }

const newCustomer = {
  name: 'Paul',
  email: 'paul@example.com',
  phone: '+256700000000'
}
///
async function getInvoices () {
  return await fetch('./api.json')
}

async function displayInvoices () {
  try {
    const invoices = await getInvoices()
    const invoiceData = await invoices.json()
    console.log('-------Invoices returned sucessfully now!---------')
    console.log('Invoices:', invoiceData)
  } catch (error) {
    if (error.status === 401) {
      console.error('Please sign in again.')
    } else if (error.status === 403) {
      console.error('You do not have permission to view these invoices.')
    } else {
      console.error('Could not load invoices:', error.stack)
    }
  }
}

displayInvoices()
// My custom fetch method

const fetchData = async () => {
  try {
    const response = await fetch('./api.json')
    const data = await response.json()
    if (!response.ok) {
      throw new Error('An error occured')
    }

    return data
  } catch (err) {
    console.error(err.stack)
    return false
  } finally {
    console.log('Fetching data is in progress...')
  }
}
const customerInvoices = await fetchData()
const paidInvoice = customerInvoices.filter(inv => inv.status === 'paid')
console.log('All paid invoice are here:')
console.log(paidInvoice)
console.log('All invoices are here:')
console.log(customerInvoices)
const response_001 = await fetch('/api/customers')

console.log(response_001.status)
console.log(response_001.ok)
console.log(response_001.statusText)
console.log(response_001.headers)
console.log(response_001.url)

// * Pro fetch APIs methods usage
const originalInvoice = {
  id: 'INV-001',
  customer: 'Paul',
  amount: 500000,
  paid: false
}
// Convert to text

// ! Preparing data for storage
const inInvoiceForStorage = JSON.stringify(originalInvoice)
// store invoices
localStorage.setItem('myInvoices', inInvoiceForStorage)
console.log(inInvoiceForStorage)
console.log(typeof inInvoiceForStorage)
// retrive the stored invoices
const storedInvoices = JSON.parse(localStorage.getItem('myInvoices'))
console.log(typeof storedInvoices)
if (storedInvoices !== null) {
  console.log('Some Data is available in local storage')
} else {
  console.log('No data available in local storage')
}
console.log(storedInvoices)

//

const jsonCustomerData = '{"id":1,"name":"Paul","isActive":true}'
const jsonCustomerObj = JSON.parse(jsonCustomerData)
console.log('Original Json text is here: ' + jsonCustomerData)
console.log('Converted Json Object is here: ')
console.log(jsonCustomerObj)
const isJsonObjSame =
  jsonCustomerData === jsonCustomerObj
    ? 'The above Json formats are the same'
    : 'The above Json format are not the .'
console.log(isJsonObjSame)
console.log(
  `One is of type:  ${typeof jsonCustomerData}  and another is of type: ${typeof jsonCustomerObj}`
)
// ! trying to parse and object akready an object
// console.log(JSON.parse(originalInvoice)) /// syntax errot data is already an object no need to parse it.
console.log('Object')
// * Dont just cacth the error let it be of significany to the user

const getCustomerName = customerData => {
  try {
    const convertedCustomerData = JSON.parse(customerData)
    console.log('Customer data is right here')
    console.log(convertedCustomerData)
    return convertedCustomerData
  } catch (err) {
    console.error('An Error has occured: ' + err.message)
    return null
  } finally {
    console.log('Thank you for shopping with Us!')
  }
}
const customerSource = JSON.stringify({
  name: 'Magezi Joshua',
  email: 'magezijosua@gmail.com',
  age: 24,
  hobbies: [
    'football',
    'volley ball',
    'music',
    'running',
    'watching movies and music'
  ]
})
const client = getCustomerName(customerSource)
const clientDetails =
  client !== null ? client.name : 'No customer data is available'
console.log(clientDetails)
