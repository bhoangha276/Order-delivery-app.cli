const OPENSHIFT = 'https://order-delivery-app-srv.vercel.app/api/v1'
const NETWORK = 'http://192.168.1.214:8000/api/v1'
const LOCAL = 'http://127.0.0.1:8000/api/v1'

const BASE_URL = OPENSHIFT || NETWORK || LOCAL

export const FOODS_URL = `${BASE_URL}/product`
export const FOODS_BY_ID_URL = `${BASE_URL}/product`
export const FOODS_BY_FILTER_URL = `${BASE_URL}/product/filter`
