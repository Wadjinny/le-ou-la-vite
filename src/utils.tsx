const API_PORT = import.meta.env.VITE_FRONT_PORT
const API_HOST = import.meta.env.VITE_API_HOST
const ENV = import.meta.env.VITE_ENV
let FRONT_URL = ''
let API_URL = ''
if(ENV === 'PROD'){
    API_URL = `https://${API_HOST}/api`
    FRONT_URL = `https://${API_HOST}`
} else {
    API_URL = `http://${API_HOST}:${API_PORT}/api`
    FRONT_URL = `http://${API_HOST}:${API_PORT}`
}
export { API_URL, FRONT_URL }
