import MyCompany from './mycompany.js'
//Class Inheritance

export default class Mincompany extends MyCompany {
  constructor (name, location) {
    super(name)
    this.location = location
  }
  calculateprofits () {}
  calculateCompanytax () {}
}
