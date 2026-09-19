// Javascript mastery -- Javascript ES6 fetaures

// 1. const and Let
let age = 33 // can be re-assigned
const name = 'Magezi Joshua' // No-re-assignment granted

// 2. Arrow functions
const addNumber = (a, b) => a + b

// 3. Template string
let phone = '0774 185 964'
console.log(`My number is: ${phone}`)

// 4. Default Parameters
// Tradition function
function studentAge (dobYear, currentYear = 2026) {
  // dob( parameter) and currentYear=2026( default parameter with defaul value: 2026

  return console.log(currentYear - dobYear)
}
studentAge(1993) // "1993 is the argumnet- actual value"
// using arow functions
const studentRegNumber = (regNo = 'KP74490001') =>
  console.log(`My registration number is:${regNo}`)

// 5. Array destruction

const myArray = [1, 2, 3, 4, 5, 6, 7, , 8, 9]
const [first, second, third, fourth, fifth] = myArray

// 6. Object destructuring

const employeeData = {
  employ_name: 'Kisakye Paul',
  role: 'Software developer',
  skills: [
    'HTML',
    'CSS',
    'PHP',
    'JAVASCRIPT',
    'REACT',
    'FLUTTER',
    'JAVA',
    'LARAVEL',
    'PYTHON',
    'WORDPRESS'
  ],
  date_of_joining: 2021,
  supervisor: 'Julius K.',
  dept: 'Web/App Development',
  company: 'Premier Advertising & Media',
  location: 'Crane Chamber Kampala Rd, 3rd floor',
  country: 'Uganda',
  city: 'Kampala'
}
const { employ_name, role, dept, company } = employeeData
console.log(
  `My name is:${name}, working at ${company} as ${role} in the department of ${dept}`
)
// 7. Rest Operator
const sumTotal = (...numbers) =>
  numbers.reduce((total, currentValue) => total + currentValue, 0)

// 8. Spread Operator
const myArray2 = ['a', 'b', 'c', 'd']
console.log(`My letters are: ${myArray2}`)

addNumber(34, 6)
sumTotal(7, 8, 9, 6, 6, 1, 3, 2)
