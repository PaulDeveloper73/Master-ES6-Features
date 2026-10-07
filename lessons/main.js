console.log('Master Mobile/Web App development')
console.log(typeof 'My name')
console.log(typeof 200)
console.log(typeof true)
console.log(typeof 98.45)
console.log(typeof undefined)
console.log(typeof null)
console.log(typeof [1, 2, 3, 4])
console.log(typeof { name: 'paul' })
console.log(typeof ' ')
console.log(typeof '')
let name = 'paul'
console.log(name)
name = 'paul'
console.log(name)

const age = 20
console.log(age)
console.clear()
// String manipulations
console.log('String manipulations')
let firstName = 'Paul'
let lastName = 'Kisakye'
const subject = 'Mobile/Web App development'
let fullName = firstName + ' ' + lastName
console.log(fullName)
console.log(`${firstName} ${lastName}`)
console.log(fullName.length)
console.log(firstName.indexOf('ul'))
console.log(subject.indexOf('e'))
console.log(subject.charAt(9))
console.log(subject.lastIndexOf('b'))
console.log(firstName.length)
console.log(firstName.slice(0, 3))
console.log(firstName.substring(0, 3))
console.log(fullName.includes('m'))
console.log(fullName.includes('a'))
console.log(fullName.split('a'))
console.log(subject.split('e'))
console.log(subject.split(''))
console.log(subject.split(' '))
console.log(subject.toUpperCase())
console.log(subject.toLowerCase())

// Email username and domain extraction
console.log('<------- Email username and domain extraction --------->')
const email = 'kisakyepaul73@gmail.com'
const username = email.slice(0, email.indexOf('@'))
const domain = email.slice(email.indexOf('@') + 1)
console.log(username)
console.log(domain)

// Number manipulations(interger and float value)
const myNumber = 100
const myAge = '100'
const isEqual = myNumber === myAge
const isEqual2 = myNumber == myAge
console.log(isEqual)
console.log(isEqual2)
console.log(Number(myAge) === myNumber)
console.log(Number(false))
console.log(Number(true))
// tofixed method returns a string representation of a number with a specified number of decimals
const myFloat = 100.123456789
const myFloat2 = '20.1234ABC'
console.log(myFloat.toFixed(2))
console.log(typeof myFloat.toFixed(2))
const newNumer = Number.parseFloat(myFloat2)
const myInteger = Number.parseInt(myFloat2)
console.log('Interger number: ' + myInteger)
console.log(myInteger)
console.log(typeof myInteger)
console.log('Floating Number: ' + newNumer)
console.log(newNumer.toFixed(5))
console.log(typeof newNumer)
// Check is the number is NaN(Not a Number)
console.log(`Checking if the number is NaN: ${isNaN(myFloat2)}`)
console.log(`Checking if the number is NaN: ${isNaN(newNumer)}`)

// Math function manipulations
console.log('Math function manipulations')
const myNum = 100.53456789
const My_TAX = 0.5
console.log(Math.round(myNum))
console.log(Math.floor(myNum))
console.log(Math.ceil(myNum))

// Generate  9 arandom number betweeen 1  and 10

const randNum10 = Math.floor(Math.random() * 10 + 1)

// Generate 9 arandom number betweeen 21  and 30
const randNum30 = Math.floor(Math.random() * 30 + 21)
console.log('Number between 1 and 10: ' + randNum10)
console.log('Number between 21 and 30: ' + randNum30)
// Usagae of for loop
// Generate 9 arandom number betweeen 1  and 10
for (let i = 0; i < 9; i++) {
  const randNum10 = Math.floor(Math.random() * 10 + 1)
  console.log('Number between 1 and 10: ' + randNum10)
}
// Generate 9 arandom number betweeen 21  and 30
for (let i = 0; i < 9; i++) {
  const randNum30 = Math.floor(Math.random() * 30 + 21)
  if (randNum30 <= 21 || randNum30 >= 30) {
    i--
    continue
  }
  console.log(i + 1 + ':Number between 21 and 30: ' + randNum30)
}

const myNum2 = '23.534VFG'
console.log('Floating Number: ' + Number.parseFloat(myNum2))
console.clear()
console.log('Master Mobile/Web App development')
console.log(isNaN(myNum2))
const myNum3 = '23.534'
console.log('Floating Number: ' + Number.parseFloat(myNum3))
console.log(isNaN(myNum3))
console.log(isNaN(Number.parseFloat(myNum3)))
const number4 = Number.parseFloat(myNum3)
console.log(isNaN(number4))
const mySon = 'Magezi'
console.log(mySon)
console.log(mySon.length)
console.log(isNaN(mySon))

// * Write code that will return arandom letter from your name
const myName = 'Kisakye Paul'
const nameIndex = Math.floor(Math.random() * myName.length + 1)
const myNameLetter = myName.charAt(nameIndex)

console.log('My Name random letter is:' + myNameLetter)

// Logic statement, if else, switch statemet,ternary operator

const passMark = 40
const studentMark = 52
console.log(studentMark ?? 'Your did not enter the mark,Try Again!')
let grade
if (studentMark >= 90) {
  grade = 'A'
} else if (studentMark >= 80) {
  grade = 'B'
} else if (studentMark >= 70) {
  grade = 'C'
} else if (studentMark >= 60) {
  grade = 'D'
} else if (studentMark >= passMark) {
  grade = 'E'
} else {
  grade = 'F'
}
console.log('Your grade is:' + grade)

switch (true) {
  case studentMark >= 90:
    grade = 'A'
    console.log('Your performance exceeded expectations')

    break

  case studentMark >= 80:
    grade = 'B'
    console.log('Your performance is good')
    break

  case studentMark >= 70:
    grade = 'C'
    console.log('Your performance is average')

    break

  case studentMark >= 60:
    grade = 'D'
    console.log('Your performance is below average')
    break

  case studentMark >= passMark:
    grade = 'E'
    console.log('Your performance is passing')
    break

  default:
    grade = 'F'
    console.log('Your performance is failing')
}

// Color switch selection
const colorItems = ['green', 'Blue', 'Orange', 'Red', 'Pink', 'Purple']
const index = Math.floor(Math.random() * colorItems.length)
console.log(colorItems[index])

// Ternary Operator

const myGrade =
  studentMark >= 90
    ? (grade = 'A')
    : studentMark >= 80
    ? (grade = 'B')
    : studentMark >= 70
    ? (grade = 'C')
    : studentMark >= 60
    ? (grade = 'E')
    : studentMark >= passMark
    ? (grade = 'F')
    : "You didn't enter your mark,Try Again!"
console.log('You scored:' + myGrade)

// Loops: while,do while, for loop, foreach

let count = 0
while (count <= 10) {
  console.log(count)
  count++
}
const userName = 'Mukisa'
let lettercount = 0
while (true) {
  for (let i = 0; i <= userName.length; i++) {
    const userLetter = userName.charAt(
      Math.floor(Math.random() * userName.length + 1) // ** This is a random letter generator from th e name, to use linear method just use charAt(i)
    )
    if (userLetter == 's') {
      break
    }
    console.log(userLetter)
    lettercount++
  }

  console.log('Letter iteration  summed to:' + lettercount)
  break
}

// Array data manipulations
const fruits = [
  'Mango',
  'Apple',
  'Banana',
  'Orange',
  'Pineapple',
  'Watermelon',
  'Avocado'
]
const users = ['Paul', 'John', 'Mary', 'Peter', 'Sarah', 'David', 'Grace']
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Black']

const numbers = [10, 20, 30, 40, 50, 30, 60, 70]

// Two dimension array

const myArray001 = [users, letters]
const myArray002 = [colors, numbers]
const myArray003 = [fruits, myArray001, myArray002]
console.log(myArray002[0][4])
console.log(myArray002[1][3])

// Three dimension array
const myArray004 = [myArray003, myArray002, myArray001]
console.log(myArray004[0][1][1][2])
console.log(myArray004[0][2][0][5])
console.log(myArray004[1][0][4])
console.log(myArray004[2][1][6])

//Array data  manipulation methods: unshift,shift, pop, push, splice, slice, indexOf, lastIndexOf, includes, find, findIndex, filter, map, reduce, forEach
numbers.push(80)
colors.pop()
console.log(numbers)
console.log(colors)
// unshift and shift
letters.unshift('Z', 'Y', 'X')
console.log(letters)
const removedColors = colors.shift()
console.log(removedColors)
// * splice in Action : can add, remove and replace elements in an array
console.log(users)
console.log(users.splice(1, 1)) // removed John from the array
console.log(users)
console.log(letters.splice(3, 0, 'M', 'J')) //Added new items in the array
console.log(letters)
console.log(numbers.splice(6, 1, 100))
console.log(numbers) // replaced an item in the array
// slice in Action: can g3copy a portion of an array into a new array
const newArray = colors.slice(3)
console.log(newArray)
console.log(colorItems.indexOf('Blue'))
console.log(numbers.indexOf(30))
console.log(numbers.lastIndexOf(30))
console.log(colors.includes('cyan'))
const myNumArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
const find50 = myNumArray.find(num => num === 50)
console.log(find50)
const findIndex50 = myNumArray.findIndex(num => num === 50)
console.log(findIndex50)

console.clear()

// Array and object data manipulation methods: filter, map, reduce, forEach

const arryNumbers = [10, 20, 30, 40, 50, 30, 60, 2, 4, 7, 9, 4, 54, 92, 70]
console.log('Checking if acertain array is an instance of Array family')
console.log(arryNumbers instanceof Array)
// Filter
// ?Filter if value is greater than "40"
const moreFortyValue = arryNumbers.filter(n => n > 40)
console.log('Array value greater than 40 are:' + moreFortyValue)
// Map
// ?Multiply by 2
const numberResult = moreFortyValue.map(n => n * 3)
console.log('Each value is multiplied by 3: ' + numberResult)

// Reduce
// ? Sum all the numbers
const totalSum = numberResult.reduce((acc, curr) => acc + curr, 0)
console.log('Total sum of the array is: ' + totalSum)

// Sorting the array asceding order
const ascendOrder = [...numberResult].sort((a, b) => a - b)
console.log('Asceding Array order is:' + ascendOrder)

// Sorting the array descending order
const descendOrder = [...numberResult].sort((a, b) => b - a)
console.log('Descending Array order is:', descendOrder)

// Foreach
arryNumbers.forEach((n, i) => {
  console.log(i + 1 + '. My value is: ' + n)
})

// Final touch on loops and array manipulations

const usernamePro = 'Paulyukom'
let counter = 0

while (counter <= usernamePro.length) {
  const myLetter = usernamePro[counter]
  if (counter === 2) {
    counter++
    continue
  }
  if (myLetter === 'm') {
    break
  }
  console.log('Am here er:' + myLetter)

  counter++
}

console.log('\n\n--------------Final touch on for loops--------------')
// For loop(for general iterations), for in(Specifically used for object it return keys/indexes), for of(Fore arrays return values), foreach( for array datat , it returns index,+values and array as callback)

// ** For loop
const arryNumberMin = [10, 20, 30, 40, 50, 30, 60, 2, 4, 7, 9, 4, 54, 92, 70]
console.log('\n\n-------For loop--------')
for (let i = 0; i < arryNumberMin.length; i++) {
  console.log(arryNumberMin[i])
}
// ** For in loop
console.log('\n\n-------For in loop--------')
for (const index in arryNumberMin) {
  console.log(`${index}: value is: ${arryNumbers[index]}`)
}
// ** For of loop
console.log('\n\n-------For of loop--------')
for (const value of arryNumberMin) {
  console.log(`Value is: ${value}`)
}

console.log('\n\n-------For each loop--------')
// ** For each loop
arryNumberMin.forEach((n, i) => {
  console.log(`${i}: value is: ${n}`)
})
// My object data manipulations
const musicalInstruments = {
  guitorName: 'Guitar',
  type: 'String',
  brand: 'Fender',
  price: 1000
}
// Object destructuring
const { guitorName, type, brand, price } = musicalInstruments
// const{guitorName:myGuitor,brand:gBrand}=musicalInstruments; // Optional renaming of the object properties
// Delete a key from the object
delete musicalInstruments.price // delete price key entry from the object

// Object Inheriance
const myMusicObj = Object.create(musicalInstruments)
myMusicObj.Array = ['Guitar', 'Piano', 'Drums', 'Violin']
myMusicObj.play = function () {
  console.log('I can play the following musical instruments:' + this.Array)
}
myMusicObj.play()

console.log(Object.keys(musicalInstruments))
console.log(Object.values(musicalInstruments))
const manfacDate = new Date()
musicalInstruments.manufacturerDate = manfacDate.toDateString()
console.log(musicalInstruments)
for (const key in musicalInstruments) {
  console.log(`${key}: ${musicalInstruments[key]}`)
}

// Object methods: Object.keys(), Object.values(), Object.entries(), Object.assign(), Object.freeze(), Object.seal(), Object.hasOwnProperty()

const person = {
  name: 'Paul',
  age: 30,
  country: 'Uganda'
}
const contact = {
  email: 'paul@example.com',
  phone: '0700000000'
}
console.log('\n\n DEALING WITH OBJECT METHODS')
console.log('Object 001:' + person)
console.log('Object 002:' + contact)

console.log(person.country)

console.log(Object.keys(person))
console.log(Object.values(contact))
console.log(Object.assign(person, contact))
// Alternative object assignment
console.log(Object.assign(person, { currentYear: 2026 }))

console.log(Object.freeze(contact))
contact.email = 'kisakyepaul73@gmail.com' //Attempting to modify a locked object, its impossible now.
console.log(contact.email)
console.log(Object.seal(person))
person.age = 70 // modificatin allowed.
person.id = 'AB001' // not allowed because its anew entry in the person object
console.log(contact.hasOwnProperty('phone')) // true
console.log(Object.hasOwn(person, 'countryCode')) //false

console.log('\n\n')
console.log('Final modified objects:Person & contact')
console.log(Object.entries(person))
console.log(Object.entries(contact))
console.log('\n\n')

// Mastering array methods: map,filter,find,sort and reduce.
const products = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 2500000,
    stock: 5,
    active: true
  },
  {
    id: 2,
    name: 'Phone',
    category: 'Electronics',
    price: 1200000,
    stock: 12,
    active: true
  },
  {
    id: 3,
    name: 'Office Chair',
    category: 'Furniture',
    price: 450000,
    stock: 8,
    active: true
  },
  {
    id: 4,
    name: 'Desk',
    category: 'Furniture',
    price: 800000,
    stock: 0,
    active: false
  },
  {
    id: 5,
    name: 'Keyboard',
    category: 'Electronics',
    price: 150000,
    stock: 20,
    active: true
  }
]

//  Data manipulations
// ? Show only products that are in stock
//? Showing  a real-world use of filter() in: Search, Product catalogs, User lists, Admin dashboards,Tables,Reports, Notifications
//? Sort products by price (Lowest price)
//? Sort by highest price
//? Sort alphabetically
const alphabetical = [...products].sort((a, b) => a.name.localeCompare(b.name))

// ?Show me active electronics products, sorted by cheapest price.
// ? Find the names of active products only: use Combine filter() + map()
//? Find the total value of only active products that are in stock:
// const totalValue = products
//   .filter(product => product.active && product.stock > 0)
//   .reduce((total, product) => {
//     return total + product.price * product.stock
//   }, 0)

// ?Solve this dashboard needs: Total products,Active products,Out-of-stock products,Find a particular product(use id),Product names,Total inventory value,Sort cheapest first
//Solve the above all here: These are not "school examples."

// These are patterns you'll actually use in:

// E-commerce
// FinFlow-style financial applications
// Admin dashboards
// CRM systems
// Inventory systems
// Reporting systems
// React applications
// API data processing

// One more task: consider the shopping cart below, calculate the total price of the items in the cart, and display the total in a formatted currency style (e.g., $2,850.00). Use array methods to achieve this.
// * Task: Find one product,Get active products,Get only product names,Sort by price,Calculate inventory value
const ShoppingCartProducts = [
  { id: 1, name: 'Laptop', price: 2500000, stock: 5, active: true },
  { id: 2, name: 'Phone', price: 1200000, stock: 12, active: true },
  { id: 3, name: 'Chair', price: 450000, stock: 8, active: true },
  { id: 4, name: 'Desk', price: 800000, stock: 0, active: false }
]
const cart = [
  {
    name: 'Laptop',
    price: 2500000,
    quantity: 1
  },
  {
    name: 'Mouse',
    price: 100000,
    quantity: 2
  },
  {
    name: 'Keyboard',
    price: 150000,
    quantity: 1
  }
]
// We need Laptop     2,500,000
// Mouse        200,000
// Keyboard     150,000
// ---------------------
// TOTAL      2,850,000

// Example: Get product names
const usersFromAPI = [
  {
    id: 1,
    first_name: 'Paul',
    last_name: 'Kisakye'
  },
  {
    id: 2,
    first_name: 'John',
    last_name: 'Smith'
  }
]

// ? map():- Transform API data: This is extremely common in professional applications. return the user id and the full name,
// ?Using find methos:  Find where product id is 3

//? Find role where the username email is "paul@gmail.com" of currently logged in user
const minUusers = [
  { id: 1, email: 'paul@gmail.com', role: 'admin' },
  { id: 2, email: 'john@gmail.com', role: 'staff' },
  { id: 3, email: 'mary@gmail.com', role: 'customer' }
]

console.log('\n\n')
// Reversing the array

const transactions = ['January', 'February', 'March', 'April']
// Reverse method
const reverseArry3 = [...transactions].reverse() // this creates acopy of the original array, no-mutation is experienced here, original array remain un changed

// toReversed: - professional modern js way
const Last_4_Transaction = transactions.toReversed() // this does not mutates the original array/ array objects

console.log('Original array is:' + transactions)
console.log('Reversed array is:' + reverseArry3)
console.log('Last (4) transactions:' + Last_4_Transaction)
const reverseArry = transactions.reverse() // this muttats the opriginal array
console.log('Reversed array is:' + reverseArry)

// *Search data
// Yes. The key is to stop thinking of includes(), find(), filter(), some(), etc. as isolated JavaScript tricks. In real applications, they are data-management tools.

// For example, imagine a real system with 10,000 customers, products, invoices, payments, or transactions. You constantly need to ask:

// Does this value exist?
// Does this customer exist?
// Find this exact record.
// Find all matching records.
// Does at least one record match?
// Does every record satisfy a rule?
// Search by name/email/reference.
// Remove duplicates.
// Check whether selected IDs exist.
// Process large collections without accidentally missing records.

// *Let's build the professional mental model.
