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
