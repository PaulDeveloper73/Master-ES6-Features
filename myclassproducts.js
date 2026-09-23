const computedID = 'RegId'
export default class Products {
  constructor (name, price, id) {
    this[computedID] = id // dynmic property key which can be canges at any time with afecting the value.
    this.name = name
    this.price = price
  }

  displayProduct () {
    console.log('Product: ' + this.name)
    console.log('Price: ' + this.price)
  }

  calculateTax (salesTax) {
    const tax = (salesTax / 10) * this.price
    const total = (this.price + tax).toFixed(2)

    console.log(`Tax (${salesTax}%): ${tax}`)
    console.log(`Total product price with tax: ${total}`)
  }
}

class MinProduct extends Products {
  constructor (name, price, supplier = 'Unkown') {
    super(name, price)
    this.supplier = supplier
  }
  displayMinInfo () {
    console.log(
      `The product: ${this.name}, costs: ${this.price} and was supplied by:${this.supplier}`
    )
  }
}

const TAX_PERCENTAGE = 0.5
// Main product object
const productObj = new Products('Bible', 1000.56)
const productObj2 = new Products('Chapati', 5000.45)

productObj2.displayProduct()
productObj2.calculateTax(TAX_PERCENTAGE)

// Minpoduct object
const minProductObg = new MinProduct('Apple', 450)
minProductObg.calculateTax(TAX_PERCENTAGE)
minProductObg.displayMinInfo()
