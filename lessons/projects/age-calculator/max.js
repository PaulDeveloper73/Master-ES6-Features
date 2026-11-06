export const initializeAgeCalculator = () => {
  const form = document.querySelector('form')
  const result = document.querySelector('#result')
  form.addEventListener('submit', e => {
    e.preventDefault()
    const dateOfBirth = document.querySelector('#dob')
    const name = document.querySelector('#name')
    const dobValue = dateOfBirth.value
    const nameValue = name.value
    result.classList.remove('hidden')
    result.textContent = `${nameValue}: ${dobValue}`
    const todaysDate = getTodayDate()
    console.log(`Today's date is: ${todaysDate}`)
    const age = calculateAge(dobValue)
    displayResult(age)
    // const age = calculateAge(dobValue)
    // displayResult(age)
  })
  // const age = calculateAge(dobValue)
  // displayResult(age)
}

export const calculateAge = dob => {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
  const monthDiff = today.getUTCMonth() - birthDate.getUTCMonth()
  const dayDiff = today.getUTCDate() - birthDate.getUTCDate()
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--
  }
  return age
}

const manageAlertDisplay = (message, isError = false) => {
  const alertMsg = document.querySelector('#alertMsg')
  alertMsg.textContent = message
  alertMsg.classList.remove('hidden')
}
const getTodayDate = (today = new Date()) => {
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
const displayResult = age => {
  const result = document.querySelector('#result')
  result.textContent = `${age}`
}
