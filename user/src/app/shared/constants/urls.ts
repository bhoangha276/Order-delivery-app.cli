const APP_OPENSHIFT = 'https://hfoodhub-api.vercel.app'
const APP_NETWORK = 'http://192.168.1.214:8000'
const APP_LOCAL = 'http://127.0.0.1:8000'

const BASE_URL = APP_OPENSHIFT || APP_NETWORK || APP_LOCAL
const API_V1 = 'api/v1'

export const FOODS_URL = `${BASE_URL}/${API_V1}/products`
export const FOODS_BY_ID_URL = `${BASE_URL}/${API_V1}/products`
export const FOODS_BY_NAME_URL = `${BASE_URL}/${API_V1}/products/filter`
export const FOODS_BY_TAG_URL = `${BASE_URL}/${API_V1}/products/filter`

export const ORDERS_URL = `${BASE_URL}/${API_V1}/orders`

export const ACCOUNT_LOGIN = `${BASE_URL}/${API_V1}/auth/login`
export const ACCOUNT_SIGNUP = `${BASE_URL}/${API_V1}/auth/signup`

// API VNPAY
const VNP_OPENSHIFT = 'https://online-payment-vnpay.vercel.app'
const VNP_NETWORK = 'http://192.168.1.214:8888'
const VNP_LOCAL = 'http://127.0.0.1:8888'
const VNP_URL = VNP_OPENSHIFT || VNP_NETWORK || VNP_LOCAL

export const VNP_PAYMENT_URL = `${VNP_URL}/order/create_payment_url`

// API Chatbot

const CHATBOT_OPENSHIFT = ''
const CHATBOT_NETWORK = ''
const CHATBOT_LOCAL = 'http://127.0.0.1:8008'

const CHATBOT_URL = CHATBOT_OPENSHIFT || CHATBOT_NETWORK || CHATBOT_LOCAL

export const CHATBOT_QUESTION_URL = `${CHATBOT_URL}/predict`
