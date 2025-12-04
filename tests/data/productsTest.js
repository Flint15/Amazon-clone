import {
  Product,
  Clothing,
  Appliance
} from '../../data/products.js'

const product = {
  id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  image: "images/products/intermediate-composite-basketball.jpg",
  name: "Intermediate Size Basketball",
  rating: {
    stars: 4,
    count: 127
  },
  priceCents: 2095,
  keywords: [
    "sports",
    "basketballs"
  ]
}

const clothing = {
  id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
  image: "images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
  name: "Plain Hooded Fleece Sweatshirt",
  rating: {
    stars: 4.5,
    count: 317
  },
  priceCents: 2400,
  keywords: [
    "hoodies",
    "sweaters",
    "apparel"
  ]
}

const appliance = {
  id: "54e0eccd-8f36-462b-b68a-8182611d9add",
  image: "images/products/black-2-slot-toaster.jpg",
  name: "2 Slot Toaster - Black",
  rating: {
    stars: 5,
    count: 2197
  },
  priceCents: 1899,
  keywords: [
    "toaster",
    "kitchen",
    "appliances"
  ],
  type: 'appliance',
  instructionsLink: "images/appliance-instructions.png",
  warrantyLink: "images/appliance-warranty.png"
}

describe('test suite: Product class', () => {
  it('Create class instances', () => {
    const product1 = new Product(product)
    
    expect(product1.name).toEqual('Intermediate Size Basketball')
    expect(product1.extraInfoHTML()).toEqual(``)
    expect(product1.getStarsUrl())
      .toEqual(`images/ratings/rating-${product1.rating.stars * 10}.png`)
  })
})

describe('test suite: Clothing class', () => {
  it('Create class instances', () => {
    const clothing1 = new Clothing(clothing)

    expect(clothing1.type).toEqual('clothing')
    expect(clothing1.extraInfoHTML()).toEqual(`
      <a href="${clothing1.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `)
    expect(clothing1.getStarsUrl())
      .toEqual(`images/ratings/rating-${clothing1.rating.stars * 10}.png`)
  })
})

describe('test suite: Appliance class', () => {
  it('Create class instances', () => {
    const appliance1 = new Appliance(appliance)

    expect(appliance1.type).toEqual('appliance')
    expect(appliance1.extraInfoHTML()).toEqual(`
      <a href="${appliance1.instructionsLink}" target="_blank">
        Instructions
      </a>
      <a href="${appliance1.warrantyLink}" target="_blank">
        Warranty
      </a>
    `)
    expect(appliance1.getStarsUrl())
      .toEqual(`images/ratings/rating-${appliance1.rating.stars * 10}.png`)
  })
})