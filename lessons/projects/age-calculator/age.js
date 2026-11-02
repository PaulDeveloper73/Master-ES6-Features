// ============================================================
// AGE CALCULATOR
// Professional Age Calculation and Validation
// ============================================================

// ============================================================
// 1. DOM ELEMENTS
// ============================================================

const ageCalculatorForm = document.querySelector('#age-calculator-form')

const dateOfBirthInput = document.querySelector('#date-of-birth')

const calculateAgeBtn = document.querySelector('#calculate-age-btn')

const resetAgeBtn = document.querySelector('#reset-age-btn')

const ageErrorMessage = document.querySelector('#age-error-message')

const ageYears = document.querySelector('#age-years')

const ageMonths = document.querySelector('#age-months')

const ageDays = document.querySelector('#age-days')

const ageTotalDays = document.querySelector('#age-total-days')

const calculationDate = document.querySelector('#calculation-date')

// ============================================================
// 2. DATE HELPER FUNCTIONS
// ============================================================

/**
 * Converts a Date object into a UTC timestamp representing
 * the date in the user's local calendar.
 *
 * This avoids timezone and daylight-saving calculation errors.
 */

const getCalendarTimestamp = date => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new Error('Invalid date supplied.')
  }

  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * Returns today's date in YYYY-MM-DD format.
 */

const getTodayDate = (today = new Date()) => {
  const year = today.getFullYear()

  const month = String(today.getMonth() + 1).padStart(2, '0')

  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// ============================================================
// 3. VALIDATE DATE OF BIRTH
// ============================================================

/**
 * Validates the user's date of birth.
 *
 * Checks:
 * 1. Date is provided.
 * 2. Date follows YYYY-MM-DD.
 * 3. Date actually exists.
 * 4. Date is not in the future.
 */

const validateDateOfBirth = (dateOfBirth, today = new Date()) => {
  if (typeof dateOfBirth !== 'string' || !dateOfBirth.trim()) {
    throw new Error('Please enter your date of birth.')
  }

  // Check the required date format.
  const datePattern = /^\d{4}-\d{2}-\d{2}$/

  if (!datePattern.test(dateOfBirth)) {
    throw new Error('Please enter a valid date of birth.')
  }

  // Convert the date string into a Date object.
  const birthDate = new Date(`${dateOfBirth}T00:00:00.000Z`)

  // Check whether the date is valid.
  if (
    Number.isNaN(birthDate.getTime()) ||
    birthDate.toISOString().slice(0, 10) !== dateOfBirth
  ) {
    throw new Error('The date of birth you entered is invalid.')
  }

  // Normalize today's date using the local calendar.
  const currentDate = getCalendarTimestamp(today)

  // Compare calendar dates, not current hours or minutes.
  if (birthDate.getTime() > currentDate) {
    throw new Error('Date of birth cannot be in the future.')
  }

  return birthDate
}

// ============================================================
// 4. CALCULATE COMPLETE AGE
// ============================================================

/**
 * Calculates:
 * - Completed years
 * - Remaining months
 * - Remaining days
 * - Total days lived
 *
 * @param {string} dateOfBirth - YYYY-MM-DD
 * @param {Date} today - Current date (optional)
 *
 * @returns {Object} Complete age breakdown
 */

function calculateAge (dateOfBirth, today = new Date()) {
  // Validate the supplied date.
  const birthDate = validateDateOfBirth(dateOfBirth, today)

  // Get normalized calendar timestamps.
  const birthTimestamp = birthDate.getTime()

  const currentTimestamp = getCalendarTimestamp(today)

  // Extract birth date components.
  const birthYear = birthDate.getUTCFullYear()

  const birthMonth = birthDate.getUTCMonth()

  const birthDay = birthDate.getUTCDate()

  // Extract current date components.
  const currentDate = new Date(currentTimestamp)

  const currentYear = currentDate.getUTCFullYear()

  const currentMonth = currentDate.getUTCMonth()

  const currentDay = currentDate.getUTCDate()

  // --------------------------------------------------------
  // STEP 1: Calculate preliminary years, months and days.
  // --------------------------------------------------------

  let years = currentYear - birthYear

  let months = currentMonth - birthMonth

  let days = currentDay - birthDay

  // --------------------------------------------------------
  // STEP 2: Adjust negative days.
  // --------------------------------------------------------

  if (days < 0) {
    // Borrow the number of days in the previous month.
    const previousMonthDays = new Date(
      Date.UTC(currentYear, currentMonth, 0)
    ).getUTCDate()

    days += previousMonthDays

    months--
  }

  // --------------------------------------------------------
  // STEP 3: Adjust negative months.
  // --------------------------------------------------------

  if (months < 0) {
    months += 12

    years--
  }

  // --------------------------------------------------------
  // STEP 4: Calculate total days lived.
  // --------------------------------------------------------

  const millisecondsPerDay = 1000 * 60 * 60 * 24

  const totalDays = Math.floor(
    (currentTimestamp - birthTimestamp) / millisecondsPerDay
  )

  // --------------------------------------------------------
  // STEP 5: Return complete age information.
  // --------------------------------------------------------

  return {
    years,
    months,
    days,
    totalDays
  }
}

// ============================================================
// 5. DISPLAY VALIDATION ERRORS
// ============================================================

/**
 * Displays an error message to the user.
 */

const showAgeError = message => {
  ageErrorMessage.textContent = message

  ageErrorMessage.classList.remove('hidden')

  dateOfBirthInput.setAttribute('aria-invalid', 'true')

  dateOfBirthInput.classList.add(
    'border-red-500',
    'focus:border-red-500',
    'focus:ring-red-100'
  )
}

/**
 * Clears validation errors.
 */

const clearAgeError = () => {
  ageErrorMessage.textContent = ''

  ageErrorMessage.classList.add('hidden')

  dateOfBirthInput.removeAttribute('aria-invalid')

  dateOfBirthInput.classList.remove(
    'border-red-500',
    'focus:border-red-500',
    'focus:ring-red-100'
  )
}

// ============================================================
// 6. RESET AGE RESULTS
// ============================================================

/**
 * Resets all calculated results to their default values.
 */

const clearAgeResults = () => {
  ageYears.textContent = '--'

  ageMonths.textContent = '--'

  ageDays.textContent = '--'

  ageTotalDays.textContent = '--'

  calculationDate.textContent = 'Awaiting calculation'
}

// ============================================================
// 7. DISPLAY CALCULATED AGE
// ============================================================

/**
 * Displays the calculated age inside the result panel.
 */

const displayAgeResults = result => {
  const { years, months, days, totalDays } = result

  // Display completed years.
  ageYears.textContent = years.toLocaleString('en-UG')

  // Display remaining months.
  ageMonths.textContent = months.toLocaleString('en-UG')

  // Display remaining days.
  ageDays.textContent = days.toLocaleString('en-UG')

  // Display total days lived.
  ageTotalDays.textContent = totalDays.toLocaleString('en-UG')

  // Display calculation date.
  calculationDate.textContent = new Intl.DateTimeFormat('en-UG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date())
}

// ============================================================
// 8. HANDLE AGE CALCULATOR FORM SUBMISSION
// ============================================================

/**
 * Handles form submission and calculates the user's age.
 */

const handleAgeCalculation = event => {
  // Prevent the browser from refreshing the page.
  event.preventDefault()

  // Remove previous validation errors.
  clearAgeError()

  try {
    // Get the user's date of birth.
    const dateOfBirth = dateOfBirthInput.value.trim()

    // Calculate complete age.
    const ageResult = calculateAge(dateOfBirth)

    // Display calculated results.
    displayAgeResults(ageResult)

    console.log('Age calculation successful:', ageResult)
  } catch (error) {
    // Clear any previous results.
    clearAgeResults()

    // Display meaningful error feedback.
    showAgeError(error.message)

    console.error('Age calculation failed:', error.message)
  }
}

// ============================================================
// 9. HANDLE FORM RESET
// ============================================================

/**
 * Clears the form, validation errors and previous results.
 */

const handleAgeReset = () => {
  clearAgeError()

  clearAgeResults()

  dateOfBirthInput.focus()
}

// ============================================================
// 10. INITIALIZE AGE CALCULATOR
// ============================================================

/**
 * Initializes the age calculator when the page loads.
 */

const initAgeCalculator = () => {
  // Set the date picker maximum to today's date.
  dateOfBirthInput.max = getTodayDate()

  // Listen for form submission.
  ageCalculatorForm.addEventListener('submit', handleAgeCalculation)

  // Listen for form reset.
  ageCalculatorForm.addEventListener('reset', handleAgeReset)

  // Clear validation errors when the user changes the date.
  dateOfBirthInput.addEventListener('change', clearAgeError)

  console.log('Age Calculator initialized successfully.')
}

// ============================================================
// 11. START APPLICATION
// ============================================================

window.addEventListener('DOMContentLoaded', initAgeCalculator)
