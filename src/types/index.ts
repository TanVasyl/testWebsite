import ingredients from '../ingredients';

export enum loading { 
    'pending' , 
    'succeeded',  
    'failed'
}
export type MealsItem = {
    id: number;
    title: string;
    url: string;
    price: number;
    count: number;
}
export interface MealsState  {
    loading: loading,
    meals: MealsItem[]
}
export interface CartItem {
    cart: MealsItem[]
}
export interface IRegistrProps{
    registr: boolean,
    setRegistr: React.SetStateAction<any>
}
export interface IMealsProps{
    cart:MealsItem ,
    setCart?: React.SetStateAction<any>

}
export interface ICustomProps{
    custom: typeof ingredients ,
    setCustom?: React.SetStateAction<any>
}
export type FormInputs = {
    yourName: string;
    password: string;
}
export interface userLogin {
    user: {
        id: number,
        name:string
    },
    isAuth: boolean
}
export type HeaderTitle = {
    value: string, 
    href:string, 
    id: number 
}