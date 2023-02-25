import * as  React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, } from 'react-redux';
import { useTypeSelector } from "../hooks/useSelector";
import { loginUser } from "../http/userApi";
import { authentication } from "../reducers/slice/authUserSlice";
import { FormInputs} from '../types'
import { useNavigate } from "react-router-dom";
import { FOOD_ROUTER } from "../utils/consts";

const Login:React.FC = React.memo(() => {
  console.log('Render login');
  const navigate = useNavigate()
  const {user,_isAuth} = useTypeSelector(state => state.authUser)
  const dispatch = useDispatch()
  const login = async (login:string, password:string ) => {
    try {
      const response = await loginUser(login, password)
      dispatch(authentication(response))
      navigate(FOOD_ROUTER)
      console.log(response);
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = (data:FormInputs) => {
    login(data.login, data.password)
    reset()
  }
  return (
    <>
      <p className="title">Login Form</p>
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
           <div className="res" style = {{
                background:'white',
                border: '1px solid red'
           }}>  
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
})
export default Login;



// const loginUser = (name:string, password:string) => {
//     fetch('http://localhost:5000/auth/' ,  {
//         method:'POST',
//         headers:{
//             'content-type':'application/json'
//         },
//         body: JSON.stringify({
//             login: name,
//             password: password
//         })
//     })
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         dispatch(responseUser(data))
//     })
//     .catch((error) => {
//         console.log(error)
//     }) 
// }