const simpleCalculator = (firstNumber, operator, secondNumber) => {
  if (
    !Number(firstNumber) ||
    !Number(secondNumber) ||
    !Number.isFinite(firstNumber) ||
    !Number.isFinite(secondNumber)
  ) {
    throw new Error('Please enter number!, Try Agian!!')
  }
  let result = ''
  switch (operator) {
    case '+':
      result = firstNumber + secondNumber
      break
    case '-':
      result = firstNumber - secondNumber
      break
    case '*':
      result = firstNumber * secondNumber
      break
    case '/':
      result = firstNumber / secondNumber
      break
    case '%':
      result = firstNumber % secondNumber
      break
    case '**':
      result = firstNumber ** secondNumber
      break

    default:
      console.log('Unknown operator used!')
      break
  }
  return result
}

try {
  console.log(simpleCalculator(20, '+', '70')) //90
} catch (err) {
  console.error('An error occurred!')
}
