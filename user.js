export default class User {
  constructor (name, email) {
    this.name = name
    this.email = email
    this.getUserDetails = function () {
      return `Name: ${this.name}, Email: ${this.email}`
    }
  }
}

export const getUserEmail = user => {
  return user.email
}
export const getUserName = user => {
  return user.name
}
