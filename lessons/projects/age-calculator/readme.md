const CalculateTodaysDate = (today = new Date())=>{
const year = String(today.getFullYear + 1).padStart(2,0)
const month = String(today.getFullMonth).padStart(2,0)
const day = String(today.getFullDate).padStart(2,0)
return `${year}-${month}-${day}`

}
You want to build a professional birthday countdown calculator that can:

1. Get today's date automatically.
2. Accept a person's date of birth.
3. Determine whether their birthday has already occurred this year.
4. Display the upcoming birthday date.
5. Calculate the remaining months and days until the next birthday.
6. Show whether the birthday is today, upcoming, or has already passed this year.
7. Correctly handle leap years and birthdays on 29 February.

There are a few JavaScript mistakes in your original function:

- `getFullYear` must be called as `getFullYear()`.
- `getFullMonth` should be `getMonth() + 1` (months start at 0).
- `getFullDate` should be `getDate()`.
- Use `padStart(2, '0')` to add leading zeros.
- Adding `1` to the year is not necessary when formatting today's date.

## 1. Correct your today's date function

```
const calculateTodaysDate = (today = new Date()) => {
  const year = String(today.getFullYear()).padStart(4, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

console.log(calculateTodaysDate())
```

Output example:

```
2026-11-04
```

## 2. Professional birthday countdown calculator

This implementation uses JavaScript's native `Date` object and handles date validation, leap years, birthday status and countdown calculations.

```

// 1. Format a date as YYYY-MM-DD
const calculateTodaysDate = (today = new Date()) => {
  const year = String(today.getFullYear()).padStart(4, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// 2. Create a date using local calendar values
const createDate = (year, month, day) => {
  return new Date(year, month - 1, day)
}

// 3. Check whether a year is a leap year
const isLeapYear = year => {
  return year % 4 === 0 &&
    (year % 100 !== 0 || year % 400 === 0)
}

// 4. Calculate the number of days between two dates
const calculateDaysDifference = (startDate, endDate) => {
  const start = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  )

  const end = Date.UTC(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  )

  return Math.round((end - start) / 86400000)
}

// 5. Add calendar months without overflowing the target month
const addMonths = (date, months) => {
  const target = new Date(
    date.getFullYear(),
    date.getMonth() + months,
    1
  )

  const lastDay = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    0
  ).getDate()

  target.setDate(Math.min(date.getDate(), lastDay))

  return target
}

// 6. Calculate remaining months and days
const calculateRemainingTime = (today, upcomingBirthday) => {
  let months =
    (upcomingBirthday.getFullYear() - today.getFullYear()) * 12 +
    (upcomingBirthday.getMonth() - today.getMonth())

  let anchorDate = addMonths(today, months)

  if (anchorDate > upcomingBirthday) {
    months--
    anchorDate = addMonths(today, months)
  }

  const days = calculateDaysDifference(
    anchorDate,
    upcomingBirthday
  )

  return { months, days }
}

// 7. Main birthday calculator
const calculateBirthdayInfo = (dateOfBirth, today = new Date()) => {

  // Validate the supplied date
  if (!dateOfBirth) {
    throw new Error('Date of birth is required.')
  }

  const dobParts = dateOfBirth.split('-').map(Number)

  if (
    dobParts.length !== 3 ||
    dobParts.some(part => !Number.isInteger(part))
  ) {
    throw new Error('Please provide a valid date in YYYY-MM-DD format.')
  }

  const [birthYear, birthMonth, birthDay] = dobParts

  const birthDate = createDate(birthYear, birthMonth, birthDay)

  if (
    birthYear < 1 ||
    birthMonth < 1 ||
    birthMonth > 12 ||
    birthDay < 1 ||
    birthDate.getFullYear() !== birthYear ||
    birthDate.getMonth() + 1 !== birthMonth ||
    birthDate.getDate() !== birthDay
  ) {
    throw new Error('Invalid date of birth.')
  }

  // Normalize today's date to midnight
  const currentDate = createDate(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  )

  if (birthDate > currentDate) {
    throw new Error('Date of birth cannot be in the future.')
  }

  const currentYear = currentDate.getFullYear()

  // Handle February 29 birthdays in non-leap years.
  // This implementation celebrates them on February 28.
  const birthdayForYear = year => {
    const day =
      birthMonth === 2 &&
      birthDay === 29 &&
      !isLeapYear(year)
        ? 28
        : birthDay

    return createDate(year, birthMonth, day)
  }

  // Birthday in the current year
  const birthdayThisYear = birthdayForYear(currentYear)

  // Determine birthday status
  const birthdayIsToday =
    calculateDaysDifference(currentDate, birthdayThisYear) === 0

  const birthdayHasPassed =
    currentDate > birthdayThisYear

  // Determine the next birthday
  const upcomingBirthday = birthdayHasPassed
    ? birthdayForYear(currentYear + 1)
    : birthdayThisYear

  // Calculate countdown
  const remainingDays = calculateDaysDifference(
    currentDate,
    upcomingBirthday
  )

  const { months, days } = calculateRemainingTime(
    currentDate,
    upcomingBirthday
  )

  // Calculate current age
  let age = currentYear - birthYear

  const birthdayForAge = birthdayForYear(currentYear)

  if (currentDate < birthdayForAge) {
    age--
  }

  // Format upcoming birthday
  const formattedBirthday = upcomingBirthday.toLocaleDateString(
    'en-UG',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  )

  return {
    dateOfBirth,
    today: calculateTodaysDate(currentDate),
    age,

    birthdayIsToday,
    birthdayHasPassed,

    upcomingBirthday: calculateTodaysDate(upcomingBirthday),
    formattedBirthday,

    remainingDays,
    remainingMonths: months,
    remainingExtraDays: days,

    status: birthdayIsToday
      ? 'Birthday is today!'
      : birthdayHasPassed
        ? 'Birthday has passed this year.'
        : 'Birthday is upcoming.'
  }
}

```

## 3. How to use it

```
try {
  const birthday = calculateBirthdayInfo(
    '1998-12-25'
  )

  console.log('Age:', birthday.age)

  console.log('Status:', birthday.status)

  console.log('Upcoming birthday:', birthday.formattedBirthday)

  console.log('Remaining days:', birthday.remainingDays)

  console.log(
    `Time remaining: ${birthday.remainingMonths} months and ${birthday.remainingExtraDays} days`
  )

} catch (error) {
  console.error(error.message)
}
```

Assuming today is 4 November 2026, the result will be:

```
Age: 27
Status: Birthday is upcoming.
Upcoming birthday: 25 December 2026
Remaining days: 51
Time remaining: 1 months and 21 days
```

## 4. Understanding the returned results

| Property             | Meaning                                 |
| -------------------- | --------------------------------------- |
| `age`                | Person's current age                    |
| `birthdayIsToday`    | Whether today is their birthday         |
| `birthdayHasPassed`  | Whether this year's birthday has passed |
| `upcomingBirthday`   | Next birthday in YYYY-MM-DD             |
| `formattedBirthday`  | Readable upcoming birthday              |
| `remainingDays`      | Total days until birthday               |
| `remainingMonths`    | Complete calendar months remaining      |
| `remainingExtraDays` | Additional days after complete months   |
| `status`             | Birthday status message                 |

## 5. Important real-world scenarios

| Today's date | Date of birth | Expected result                      |
| ------------ | ------------- | ------------------------------------ |
| 04 Nov 2026  | 25 Dec 1998   | Upcoming: 1 month, 21 days           |
| 04 Nov 2026  | 10 Nov 1998   | Upcoming: 6 days                     |
| 04 Nov 2026  | 04 Nov 1998   | Birthday is today                    |
| 04 Nov 2026  | 15 Oct 1998   | Passed; next birthday is 15 Oct 2027 |
| 04 Nov 2026  | 29 Feb 2000   | Next birthday is 28 Feb 2027         |

Important: For February 29 birthdays, this implementation uses February 28 in non-leap years. You can change that business rule if your application prefers March 1.

My recommendation for your JavaScript learning: Master the distinction between `getDate()`, `getDay()`, `getMonth()` and `getFullYear()`. These are particularly important when developing HR systems, payroll applications, employee records, customer profiles and age-validation systems.
