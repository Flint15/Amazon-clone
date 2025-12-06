import {addToCart, calculateCartQuantity} from '../data/cart.js'
import {products, loadProductsFetch} from '../data/products.js'
import {renderAmazonHeader} from './header.js'

const url = new URLSearchParams(location.search)
const parameter = url.get('search')
  ? url.get('search').toLowerCase()
  : false

loadProductsFetch(renderAmazonPage)

function renderAmazonPage() {
  renderAmazonHeader()
  renderProductsGrid()
}

function renderProductsGrid() {
  const productsQuantity = {}
  products.forEach(product => {
    productsQuantity[product.id] = 1
  })

  document.querySelector('.js-products-grid')
    .innerHTML = htmlAccamulation()

  updateCartQuantity()
  addEventListeners(productsQuantity)
}

function htmlAccamulation() {
  let productsHTML = ''
  let filteredProducts = products
  
  if(parameter) {
    filteredProducts = products.filter(product => {
      if (
        product.name.toLowerCase().includes(parameter)
        ||
        product.keywords.includes(parameter)
      ) {
        return true
      }
    })
    if (filteredProducts.length === 0) {
      console.log('123')
      document.querySelector('.js-products-grid')
        return `
          <div class="no-product-page">
            There aren't products like this bruh ;(
          </div>
        `
    }
  }

  filteredProducts.forEach(product => {
    productsHTML += createProductHTML(product)
  })

  return productsHTML
}

function createProductHTML(product) {
  return `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="
          js-select-element"
          data-select-id="${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary
        js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
    `
}
  
function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity()
    
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity
  }

function addEventListeners(productsQuantity) {
  document.querySelectorAll('.js-add-to-cart')
    .forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId
        const orderQuantity = productsQuantity[productId]

        addToCart(productId, orderQuantity)
        updateCartQuantity()
      })
    })
  
  document.querySelectorAll('.js-select-element')
    .forEach(element => {
      element.addEventListener('change', event => {
        const productId = element.dataset.selectId
        const orderQuantity = element.value

        productsQuantity[productId] = Number(orderQuantity)
      })
    })
}