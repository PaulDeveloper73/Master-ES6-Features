import User, { getUserEmail, getUserName } from './user.js'
const userdata = new User('John Doe', 'john.doe@example.com')

console.log(userdata.email)
console.log(userdata.name)

console.log('<------------ Extract user Details from function ------------> ')
console.log(userdata.getUserDetails())
console.log('Other way')
console.log('Student email is: ' + getUserEmail(userdata))
console.log('Student name is: ' + getUserName(userdata))
