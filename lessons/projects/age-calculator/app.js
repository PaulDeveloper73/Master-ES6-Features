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
  const alertMsg = document.querySelector('#alertMsg')
  //   add an event listener to the date of birth input field
  dateOfBirth.addEventListener('change', e => {
    e.preventDefault()
    manageAlertDisplay('', false)
    console.log(e.target.value)
    // return
    const dobValue = dateOfBirth.value
    const age = calculateAge(dobValue)
    displayAge(age)
  })
}
const calculateAge = dob => {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
  const monthDiff = today.getUTCMonth() - birthDate.getUTCMonth()
  const dayDiff = today.getUTCDate() - birthDate.getUTCDate()
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(dob) ||
    Number.isNaN(birthDate.getTime()) ||
    birthDate.toISOString().slice(0, 10) !== dob
  ) {
    manageAlertDisplay('Enter a valid date of birth (MM-DD-YYYY).', true)
    throw new Error('Enter a valid date of birth (MM-DD-YYYY).')
  }

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) || age < 0) {
    manageAlertDisplay('Your birthday has not occurred yet this year.', true)
    console.log('Your birthday has not yet occurred this year.')
    throw new Error('Enter a valid date of birth (MM-DD-YYYY).')
  }

  return age
}
const manageAlertDisplay = (message, isError = false) => {
  const alertMsg = document.querySelector('#alertMsg')
  alertMsg.textContent = message
  alertMsg.classList.remove('hidden')
}

const displayAge = age => {
  const result = document.querySelector('#age-years')
  result.textContent = `${age}`
}
console.log(calculateAge('1992-06-26')) // Test case: birthday already passed
// console.log(calculateAge('2027-02-28')) // Test case: invalid date
console.log(calculateAge('2023-06-26')) // Test case: birthday still upcoming
window.addEventListener('DOMContentLoaded', initApp())
