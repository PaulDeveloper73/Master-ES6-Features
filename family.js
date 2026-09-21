const familyData = {
  id: '001',
  child_name: 'Joshua',
  dob: '2023-12-01',
  mother: 'Teddy',
  father: 'Paul',
  canSpeak: true,
  canWalk: true,
  canRun: true,
  walk () {
    console.log(this)
  },
  playMovie () {}
}
// Acces the data
familyData['child_name']
familyData['child_company_ name'] = 'Ionic Solutions Ltd'
// familyData destructuring
const { id, child_name, dob, mother, father } = familyData

const childWalk = familyData.walk()
// console.log(childWalk)
const brotherWalk = familyData.walk.bind(familyData)
console.log(brotherWalk)

// Data manipulation methods
// 1. Filter
const userData = [
  { id: '001', child_name: 'Magezi', dob: '2023', mother: 'Teddy' },
  { id: '002', child_name: 'Elivis', dob: '2023', mother: 'Precious' },
  { id: '003', child_name: 'Git', dob: '2020', mother: 'Moreen' }
]
const sameDOB = userData.filter(year => year.dob == 2023)
console.log(sameDOB)
