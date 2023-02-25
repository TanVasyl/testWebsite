import { $authHost,$host } from "./index";


export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type )
    return data
}
export const fetchType = async () => {
    const {data} = await $host.get('api/type',)
    return data
}
export const fetchOneMeals = async (id) => {
    const {data} = await $host.get('api/food/' + id)
    return data
}
