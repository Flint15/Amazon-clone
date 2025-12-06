export let orders = JSON
  .parse(localStorage.getItem('orders')) || []

export function addOrder(order) {
  orders.unshift(order)
  saveToStorage()
}

export function getOrder(orderId) {
  const order = orders.find(order => order.id === orderId)
  return order
}

export function getProductOrderData(orderId, productId) {
  const deliveryProductDetail = getOrder(orderId).products
    .find(product => product.productId === productId)
  
  return deliveryProductDetail
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders))
}