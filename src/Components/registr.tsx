import * as React from 'react';
import {SubmitHandler,  useForm} from 'react-hook-form'
import { Link } from 'react-router-dom';
import { FormInputs} from '../types'
import { registration } from "../http/userApi";
import Login from './login';


const RegistrationUser:React.FC = () =>{
    
const createUser = async (login:string, password:string ) => {
   try {
    const response = await registration(login, password)
   } catch (error) {
    alert(error.response.data.message)
   }
}
    const {
        register,
        formState: {
            errors,
        },
        reset,
        handleSubmit
    } = useForm<FormInputs>({
        mode: 'onChange'
    })
    const onSubmit:SubmitHandler<FormInputs> = (data) => {
         createUser(data.login, data.password)
         reset()
    }
   
    return(
    <div className={"form_registr active"} >
    <div className={"form_content active"}>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='login'>
            <label>Логин : </label>
                <input className='input_name'
                {...register('login', {
                required: "Поле не может быть пустым",
                pattern: /^[а-яА-ЯёЁa-zA-Z]+$/,
                minLength: {
                value: 3,
                message: "Имя должно быть не меньше 3 символов"
                }
                })}
                />
                <div className='error'>
                {errors?.login && <p style={{color:'blue'}}>{errors?.login?.message || 'Допустимы только буквы'}</p>}
                </div>
            </div>
            <div className="password">
            <label>Пароль : </label>
                <input className='input_password'
                {...register('password', {
                required: "Поле не может быть пустым",
                minLength: {
                value: 5,
                message: "Пароль должен быть не меньше 5 символов"
                },
                })} type='password'
                />
                <div className='error'>
                {errors?.password && <p style={{color:'blue'}}>{errors?.password?.message || 'Error' }</p>}
                </div>
            </div>
            <div>
                <button className='submit_button' type='submit'>Зарегистрироваться</button>
                <span>Есть аккаунт? <Link to='/api/login'> Авторизируйся</Link></span>
            </div>
        </form> 
    </div>
    </div>
    )
}
export default RegistrationUser;