const myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 4, 6, 9, 11, 23, 34, 1, 2]
const mySet = new Set(myArr)
console.log(myArr)
console.log(mySet)
console.log(mySet.add([7, 3, 4]))
console.log(mySet.delete(3))
console.log(mySet.delete(25))
console.log(mySet)
// mySet.clear()
console.log(mySet)

// Array data manipulaion
const uniqueValues = [...new Set(myArr)]
console.log(uniqueValues)
console.log(myArr.unshift(302))
console.log(myArr.shift())
console.log(myArr.unshift(4, 50))
console.log(myArr)
//Final set
console.log('----------My Final Set--------------')
console.log([...new Set(myArr)])
