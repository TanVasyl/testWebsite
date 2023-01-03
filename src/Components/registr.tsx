import * as React from 'react';
import {SubmitHandler,  useForm} from 'react-hook-form'
import { FormInputs} from '../types'
import Login from './login';


const createUser = (name:string, password:string) => { 
    fetch('http://localhost:5000/registr/' ,  {
        method:'POST',
        headers:{
        'content-type':'application/json'
        },
        body: JSON.stringify({
        user: name,
        password: password
        })
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error)
    })
}

const RegistrationUser:React.FC = () =>{
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
         console.log("Вы зарегистрировались,", "Ваш логин :" ,data.yourName,"Ваш пароль :", data.password);
         createUser(data.yourName, data.password)
         alert("Вы зарегистрировались");
         reset()
    }
   
    return(
    <div className={"form_registr active"} >
    <div className={"form_content active"}>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='login'>
            <label>Логин : </label>
                <input className='input_name'
                {...register('yourName', {
                required: "Поле не может быть пустым",
                pattern: /^[а-яА-ЯёЁa-zA-Z]+$/,
                minLength: {
                value: 3,
                message: "Имя должно быть не меньше 3 символов"
                }
                })}
                />
                <div className='error'>
                {errors?.yourName && <p style={{color:'blue'}}>{errors?.yourName?.message || 'Допустимы только буквы'}</p>}
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
            <button className='submit_button' type='submit'>Зарегистрироваться</button>
        </form> 
    </div>
    </div>
    )
}
export default RegistrationUser;