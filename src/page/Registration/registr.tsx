import * as React from 'react';
import { Argument} from 'webpack';
import { useState, useEffect, useCallback } from 'react';
import './registr.css'
import { IRegistrProps } from '../App';
import {SubmitHandler, useForm} from 'react-hook-form'

type FormInputs = {
    yourName: string;
    password: string;
  };

export default function RegistrationUser({registr,setRegistr}:IRegistrProps) {
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
    const onSubmit:SubmitHandler<FormInputs> = (data:any) => {
         console.log("Вы зарегистрировались,", "Ваш логин :" ,data.yourName,"Ваш пароль :", data.password);
         alert("Вы зарегистрировались");
         reset()
    }
    return(
        <div className={registr ?"form_registr active":"form_register"} >
            <div className={registr ?"form_content active":"form_content"}>
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