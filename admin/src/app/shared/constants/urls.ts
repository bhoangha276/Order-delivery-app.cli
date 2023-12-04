const OPENSHIFT = 'https://order-delivery-app-srv.vercel.app'
const NETWORK = 'http://192.168.1.214:8000'
const LOCAL = 'http://127.0.0.1:8000'

const BASE_URL = OPENSHIFT || NETWORK || LOCAL
const API_V1 = 'api/v1'

export const ACCOUNTS_URL = `${BASE_URL}/${API_V1}/auth`
export const ACCOUNTS_BY_FILTER_URL = `${BASE_URL}/${API_V1}/auth/filter`
export const ACCOUNTS_SIGNUP_URL = `${BASE_URL}/${API_V1}/auth/signup`
export const ACCOUNTS_LOGIN_URL = `${BASE_URL}/${API_V1}/auth/login`

export const USERS_URL = `${BASE_URL}/${API_V1}/users`
export const USERS_BY_FILTER_URL = `${BASE_URL}/${API_V1}/users/filter`

export const EMPLOYEES_URL = `${BASE_URL}/${API_V1}/employees`
export const EMPLOYEES_BY_FILTER_URL = `${BASE_URL}/${API_V1}/employees/filter`

export const FOODS_URL = `${BASE_URL}/${API_V1}/products`
export const FOODS_BY_FILTER_URL = `${BASE_URL}/${API_V1}/products/filter`

export const ORDERS_URL = `${BASE_URL}/${API_V1}/orders`
export const ORDERS_BY_FILTER_URL = `${BASE_URL}/${API_V1}/orders/filter`

// API VNPAY
const VNPAY_URL = 'http://127.0.0.1:8888'

export const PAYMENT_URL = `${VNPAY_URL}/create_payment_url`
