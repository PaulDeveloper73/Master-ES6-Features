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
