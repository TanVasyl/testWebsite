import ingredients from '../ingredients';

export enum loading { 
    'pending' , 
    'succeeded',  
    'failed'
}
export type MealsItem = {
    id: number;
    name: string;
    Image: string;
    price: number;
    count: number;
}
export type TypeItem = {
        id:number,
        name:string
}
export interface MealsState  {
    loading: loading,
    meals: MealsItem[]
}
export interface TypeState {
    type: TypeItem[],
    selectedType: number
}
export interface CartItem {
    cart: MealsItem[],
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
    login: string;
    password: string;
}
export interface userLogin {
    user: {
        id: number,
        login:string
    },
    _isAuth: boolean
}
export type HeaderTitle = {
    value: string, 
    href:string, 
    id: number 
}