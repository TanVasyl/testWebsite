import * as  React from "react";
import { useForm } from "react-hook-form";
import { FormInputs } from "./registr";


interface IPerson {
    id:number,
    name:string,
    message:string
}

function Login() {
    const [person, setPerson] = React.useState<IPerson>({
        id:null,
        name: '',
        message: ''
    })

  
    const loginUser = (name:string, password:string) => {
        fetch('http://localhost:5000/auth/' ,  {
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
         setPerson({
            id: data.id,
            name: data.name,
            message: data.message
         })
          
         
            return console.log(data);
        })
        .catch((error) => {
            console.log(error)
        })
    }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = (data:any) => {
    loginUser(data.yourName, data.password)
    reset()
  }


  return (
    <>
      <p className="title">Login Form</p>
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
           <div className="res" style = {{
                background:'white',
                border: '1px solid red'
           }}>  
                <div>{person.name}</div>
                <div>{person.message}</div>
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
            <button className='submit_button' type='submit'>Авторизоваться</button>
        </form> 

    </>
  );
}
export default Login;