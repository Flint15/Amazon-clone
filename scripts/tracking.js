import { calculateCartQuantity } from "../data/cart.js"
import { getDeliveryDate, getDay, getTodayDate } from "../data/deliveryOptions.js"
import { getOrder, getProductOrderData } from "../data/orders.js"
import { getProduct } from "../data/products.js"
import { renderAmazonHeader } from "./header.js"

const url = new URL(window.location.href)
const orderId = url.searchParams.get('orderId')
const productId = url.searchParams.get('productId')

renderTrackingPage()

function renderTrackingPage() {
  renderAmazonHeader()

  const orderTrackingContainer = document
    .querySelector('.js-order-tracking')

  const orderProductData = getProductOrderData(orderId, productId)
  const product = getProduct(productId)

  const progress = Number(calculateProgress(orderProductData))

  orderTrackingContainer.innerHTML = createHTML(orderProductData, product, progress)
  const statusBar = document
    .querySelector('.js-progress-bar')
  statusBar.style.width = `${progress}%`
}

function calculateProgress(orderProductData) {
  const currentTime = getDay(getTodayDate())
  const orderTime = getDay(getOrder(orderId).orderTime)
  const deliveryTime = getDay(orderProductData.estimatedDeliveryTime)

  let calculatedProgress  = ((
    (currentTime - orderTime) / (deliveryTime - orderTime)
  ) * 100).toFixed(1)

  return calculatedProgress === '0.0' ? '1.0' : calculatedProgress
}

function createHTML(orderProductData, product, progress) {
  return `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${getDeliveryDate(orderProductData.estimatedDeliveryTime)}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${orderProductData.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="
        progress-label 
        ${progress < 50 ? 'current-status' : ''}
        ">
        Preparing
      </div>
      <div class="
        progress-label 
        ${progress >= 50 && progress < 100 ? 'current-status' : ''}
        ">
        Shipped
      </div>
      <div class="
        progress-label 
        ${progress >= 100 ? 'current-status' : ''}
        ">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar js-progress-bar"></div>
    </div>
  `
}