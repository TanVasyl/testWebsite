import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_PORT
})
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_PORT
})

const authIterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}
$authHost.interceptors.request.use(authIterceptor)

export {
    $host,
    $authHost
}