import MyCompany from './mycompany.js'
import Mincompany from './mincompany.js'
// Class object initialisation
const mainCompany = new MyCompany('Ionic Solutions Ltd')
console.log(mainCompany.name)
const minCompany = new Mincompany('Ionic Solutions Ltd', 'Kampala')
minCompany.isRegistered = false
minCompany.currentActivities = () =>
  console.log('We are currently developing a mobile application for a client')

console.log(minCompany.name)
console.log(minCompany.location)
console.log(minCompany.isRegistered)
minCompany.currentActivities()
minCompany.location = 'Kampala Road Crane Chamber'
console.log(minCompany.location)
