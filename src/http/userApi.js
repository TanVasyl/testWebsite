import { $authHost,$host } from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (login, password) => {
    console.log(login,password);
    const {data} = await $host.post('api/user/registration', {login, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const loginUser = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}