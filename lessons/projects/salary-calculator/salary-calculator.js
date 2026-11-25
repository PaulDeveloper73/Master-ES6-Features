// // Project 5 — Salary calculator
// Purpose: calculate gross salary, deductions and take-home pay.

// For this learning exercise, assume the employee receives basic salary and allowances,
// then has a deduction applied to gross salary.
// This is a simplified example, not an official Ugandan payroll or tax calculation.

const calculateSalary = (basicSalary, deductionRate, allownances) => {
  if (
    !Number.isFinite(basicSalary) ||
    !Number.isFinite(deductionRate) ||
    !Number.isFinite(allownances)
  ) {
    throw new Error('Please enter valid numbers!')
  }
  if (basicSalary < 0) {
    throw new Error('Basic Salary should be greater than zero!')
  }
  if (deductionRate < 0 || deductionRate > 1) {
    throw new Error('Basic Salary should be between zeo and 1')
  }
  const grossSalary = basicSalary + allownances
  const deductionAmount = grossSalary * deductionRate
  const netSalary = grossSalary - deductionAmount

  return {
    basicSalary,
    allownances,
    grossSalary,
    deductionRate,
    netSalary,
    deductionAmount
  }
}

const data = calculateSalary(200000, 0.3, 15000)

console.log('Salary details are here:')
console.log(data)
