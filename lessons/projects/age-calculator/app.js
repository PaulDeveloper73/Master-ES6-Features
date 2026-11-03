// * Age calculator app
// What you are practising:
// - Strings and date values.
// - Variables and arithmetic.
// - Boolean expressions and if.
// - Validation and exceptions.
// - Functions and return values.
// A professional age calculator does not simply subtract the birth year from the current year. It also checks whether the birthday has occurred this year.

// Test cases: birthday already passed, birthday still upcoming, today's birthday, invalid date such as 2025-02-30, and a future birth date.

// This example uses UTC date components for predictable calendar-day comparisons. A production system must define how it handles time zones and birthdays on February 29.
console.log('Loading data...')

const initApp = () => {
  console.log('App initialized')
  const dateOfBirth = document.querySelector('#date-of-birth')
  //   add an event listener to the date of birth input field
  dateOfBirth.addEventListener('change', e => {
    e.preventDefault()
    const dobValue = dateOfBirth.value
    const age = calculateAge(dobValue)
    displayAge(age)
  })
}
const calculateAge = dob => {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  const dayDiff = today.getDate() - birthDate.getDate()

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--
  }

  return age
}

const displayAge = age => {
  const result = document.querySelector('#age-years')
  result.textContent = `${age}`
}

window.addEventListener('DOMContentLoaded', initApp())
