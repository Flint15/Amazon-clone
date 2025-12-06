import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

export function getTodayDate() {
  return dayjs().format('MMMM D')
}

export function getDay(date) {
  return Number(dayjs(date).format('D'))
}

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption

  deliveryOptions.forEach(option => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option
    }
  })

  return deliveryOption || deliveryOptions[0]
}

export function calculateDeliveryDate(deliveryOption) {
  let today = dayjs()

  const deliveryDate = today
    .add(deliveryOption.deliveryDays, 'day')

  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  )

  return dateString
}

export function getMonthDay(date) {
  return dayjs(date).format('MMMM D')
}

export function getDeliveryDate(date) {
  return dayjs(date).format('dddd, MMMM D')
}

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]