const API_PORT = import.meta.env.VITE_FRONT_PORT
const API_HOST = import.meta.env.VITE_API_HOST
const ENV = import.meta.env.VITE_ENV
let API_URL = ''
if(ENV === 'PROD'){
    API_URL = `https://${API_HOST}/api`
} else {
    API_URL = `http://${API_HOST}:${API_PORT}/api`
}
export { API_URL }
