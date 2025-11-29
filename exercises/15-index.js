import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import Love from './15f-index.js'

const today = dayjs()
console.log(Love(today.add(8, 'day')))