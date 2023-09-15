import axios from 'axios'

// export const API_URL = 'https://protected-mountain-35851-f22d2a82ae2c.herokuapp.com/api'
export const API_URL = 'https://localhost:5000/api'

const $api = axios.create({
    withCredentials:true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api