// Padend and padstart
const phoneNo = '0774185123'
const trucatedNo = phoneNo.slice(0, 4)
const trucatedNo2 = phoneNo.slice(8, 13)
console.log(trucatedNo.padEnd(10, 'x'))

console.log(trucatedNo2.padStart(10, 'x'))

// My object
const myHome = {
  location: 'Kampala',
  division: 'Central',
  district: 'Wakiso',
  dining_Table: function () {},
  isTvOn: false,
  show_tags: ['Winner classic', 'Winner classic 2', 'Winner classic 3'],
  Children: {
    first_born: 'Magezi Joshua',
    second_born: 'magezi Elivis',
    third_born: 'Kisakye Precious',
    fourth_born: 'Teddy Kisakye'
  }
}
//My array
const myArr = [1, 2, 3, 4, , , , 7, 8, 9, 10]
console.log(myArr.includes(undefined))
const display = myArr.filter(item => item == undefined)
console.log(display)
console.log(myArr[3])
console.log(myArr.lastIndexOf(2))
const displayEvenNumber = myArr.filter(item => item % 2 == 0)
console.log(displayEvenNumber)
