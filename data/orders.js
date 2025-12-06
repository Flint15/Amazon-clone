import { getProduct } from "./products.js"

export let orderInfos = JSON
  .parse(localStorage.getItem('orderInfos')) || {}

export let orders = JSON
  .parse(localStorage.getItem('orders')) || []

export function addOrder(order) {
  orders.unshift(order)
  saveToStorage()
}

export function saveOrderInfos(orderDate, totalCost, orderId, order) {
  orderInfos = {orderDate, totalCost, orderId, order}
  
  console.log(orders)
  console.log(orderInfos)
  
  saveOrderInfosToStorage()
}

export function updateOrderInfos(productId) {
  console.log(orderInfos)
  const addedProduct = getProduct(productId)
  console.log(addedProduct)
}

function saveOrderInfosToStorage() {
  localStorage.setItem('orderInfos', JSON.stringify(orderInfos))
}

export function clearOrdersList() {
  orders = []
  clearOrdersListStorage()
}

function clearOrdersListStorage() {
  localStorage.setItem('orders', JSON.stringify([]))
}


function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders))
}