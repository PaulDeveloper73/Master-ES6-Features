// Email username and domain extraction
console.log('<--- Email username & domain extraction --->')
const email = 'kisakyepaul73@gmail.com'

const username = email.slice(0, email.indexOf('@'))
const domain = email.slice(email.indexOf('@') + 1)
console.log(username)
console.log(domain)
console.log(username.toUpperCase())
console.log(username.toLowerCase())
