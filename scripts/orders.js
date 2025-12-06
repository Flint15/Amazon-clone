import { addToCart, calculateCartQuantity } from "../data/cart.js";
import { getMonthDay } from "../data/deliveryOptions.js";
import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import formatCurrency from "./utils/money.js";

function renderPage() {
  updateCartDisplay()
  renderOrders()
}
renderPage()

function updateCartDisplay() {
  const cartQuantity = calculateCartQuantity()

  document.querySelector('.js-cart-quantity')
    .innerText = cartQuantity
}

function renderOrders() {
  const ordersContainer = document
    .querySelector('.js-orders-grid')
  let html = ''
  
  orders.forEach(order => {
    html += createOrderHTML(order)
  })

  ordersContainer.innerHTML = html

  addListeners()
}

function addListeners() {
  document.querySelectorAll('.js-again-button')
    .forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.dataset.againButtonProductId
        addToCart(productId, 1)
        updateCartDisplay()

        button.innerHTML = 'Added'
        setTimeout(() => {
          button.innerHTML = `
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          `
        }, 1000)
      })
    })
}

function createOrderHTML(order) {
  let html = `
    <div class="order-container">  
      <div class="order-header">
        ${renderOrderHeader(order)}
      </div>

      <div class="order-details-grid">
        ${renderOrderDetails(order)}
      </div>
    </div>
  `
  return html
}

function renderOrderHeader(order) {
  let html

  let {id, orderTime, totalCostCents} = order
  orderTime = getMonthDay(orderTime)
  totalCostCents = formatCurrency(totalCostCents)

  html = `
    <div class="order-header-left-section">
      <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>${orderTime}</div>
      </div>
      <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>$${totalCostCents}</div>
      </div>
    </div>

    <div class="order-header-right-section">
      <div class="order-header-label">Order ID:</div>
      <div>${id}</div>
    </div>
  `

  return html
}

function renderOrderDetails(order) {
  let html = ''
  console.log(order)
  order.products.forEach(product => {
    let {productId, estimatedDeliveryTime, quantity} = product
    const {image, name} = getProduct(productId)
    const arrivingOn = getMonthDay(estimatedDeliveryTime)

    html += `
      <div class="product-image-container">
        <img src="${image}" alt="${name}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${arrivingOn}
        </div>
        <div class="product-quantity">
          Quantity: ${quantity}
        </div>
        <button class="
          buy-again-button button-primary
          js-again-button"
          data-again-button-product-id="${productId}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}?productId=${productId}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `
  })

  return html
}