const vehicle = {
  wheel: 4,
  color: ['red', 'green', 'blue', 'orange', 'black'],
  brand: 'Toyota',
  horsePower: '50000cc',
  manufactered_year: 2021,
  engine: function () {
    return console.log(`Vooo,   capacity is: ${this.horsePower}`)
  }
}
console.log(vehicle.wheel)
console.log(vehicle.engine())
//new object
const car = Object.create(vehicle)
console.log(car.brand)
car.horsePower = '9000CC'
car.engine = () => {
  return console.log(`Sheeee,   capacity is: ${car.horsePower}`)
}
car.engine()
// delete object property
// delete vehicle.color
console.log(vehicle)
// add another color for car object
car.color.push('Pink')
const myCarColors = car.color.map(color => color.toUpperCase())
console.log(myCarColors)
console.log(vehicle.color)
// object destructuring
const { horsePower: carCC, wheeel: myCarWheels } = vehicle
console.log(carCC)
// const bodaBoda = Object.assign({}, car, { isLatestModel: true })
const bodaBoda2 = Object.assign({}, car, { isLatestModel: true })
console.log(car)
// console.log(bodaBoda)
console.log(bodaBoda2)
