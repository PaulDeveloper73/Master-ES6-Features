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
