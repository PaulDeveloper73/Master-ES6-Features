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
// Length of set and the array
console.log('Length of myArr: ' + myArr.length)
console.log('Length of mySet: ' + mySet.size)

// May map for student data// it help to store two values in one key and value pair
const studentData = new Map()
studentData.set('name', 'John Doe')
studentData.set('age', 25)
studentData.set('course', 'React JS')
console.log(studentData)
console.log(studentData.get('name'))
console.log(studentData.get('age'))
console.log(studentData.get('course'))
console.log(studentData.size)
studentData.delete('age')
console.log(studentData)
console.log(studentData.size)
// studentData.clear()
console.log(studentData)
console.log(studentData.has('name'))
studentData.set('name', 'Magezi Joshua')
studentData.set('DOB', 30)
console.log([...studentData])
