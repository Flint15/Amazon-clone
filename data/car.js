class Car {
  #brand
  #model
  
  speed = 0

  isTrunkOpen = false

  constructor(carDetails) {
    this.#brand = carDetails.brand
    this.#model = carDetails.model
  }

  get brand() {return this.#brand}
  get model() {return this.#model}

  displayInfo() {
    console.log(`
      ${this.#brand} ${this.#model}, 
      Speed: ${this.speed} km/h
      Trunk is ${this.isTrunkOpen ? 'open' : 'closed'}
      `)
  }

  go() {
    if (this.isTrunkOpen) {
      console.log('Trunk is open!')
      return
    }

    this.speed += 5
    if (this.speed > 200) {
      this.speed = 200
    }
  }

  brake() {
    this.speed -= 5
    if (this.speed < 0) {
      this.speed = 0
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true
      console.log(`Trunk in ${this.#model} was opened`)
      return
    }
    console.log('Trunk can\'t be open when car is moving!')
  }

  closeTrunk() {
    this.isTrunkOpen = false
    console.log('Trunk was closed.')
  }
}

class RaceCar extends Car {
  acceleration
  
  constructor(carDetails) {
    super(carDetails)
    this.acceleration = carDetails.acceleration
  }

  displayInfo() {
    console.log(`
      ${this.brand} ${this.model},
      Acceleration capability - ${this.acceleration} 
      Speed: ${this.speed} km/h
      `)
  }

  go() {
    this.speed += this.acceleration

    if (this.speed > 300) {
      this.speed = 300
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk')
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk')
  }
}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
})
const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
})

car1.displayInfo()
car2.displayInfo()

car1.openTrunk()
car1.go()
car1.closeTrunk()
car1.go()
car1.displayInfo()

car2.openTrunk()
car2.go()
car2.closeTrunk()
car2.go()
car2.go()
car2.displayInfo()

const car3 = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20 
})

car3.displayInfo()

car3.openTrunk()
car3.brake()
car3.go()
car3.go()
car3.go()

car3.displayInfo()