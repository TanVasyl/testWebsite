import * as React from 'react';
import { Argument} from 'webpack';
import { useState, useEffect } from 'react';
import './main.css'
import ingredients from '../../ingredients';
import { ICustomProps } from '../App';

// Страница находится в разработке
export default function Main ({custom,setCustom}:ICustomProps) {   
    

    const test = () => {
        console.log(custom)
    }
    // const HandleChangeMeat = (event:any) => {
    //     event.preventDefault()
    //     setMeat(event.target.value)
    // }

    const selectSection = ingredients.map((item)=> {
        
        const { meat, chees, sauses, onion, tomato, cucumber} = item


            const Change = (event:any) => {
               
                setCustom(() => {
                    return ingredients.map((elem:any)=> {
                            return {
                                ...elem,
                                meat: {
                                    name:event.target.value,
                                }
                            }
                    })
                })
                console.log(custom)
            }


        return (
            <div className="select_item">

                <div className='container'>
                    <select onChange={Change} >
                        {meat.map((elem:any) =>
                            <option  key={elem.id} >{elem.name}</option>
                    )}
                    </select>
               </div>

                <div className='container'> 

                    <select  onChange={Change}  >
                        {chees.map((elem:any) =>
                             <option key={elem.id} >{elem.name}</option>
                        )}
                    </select>
               </div>

               <div className='container'>
                    <select >
                        {sauses.map((elem:any) =>
                            <option key={elem.id} >{elem.name}</option>
                        )}
                    </select>
               </div>

                    <div className="variant_item">

                        <div className="variant">

                            <p className='selection_text'>Кол-во помидоров</p>
                                <div className='number'>
                                    <button className='number-min'>-</button>
                                    {tomato}
                                    <button className='number-min' >+</button>
                                </div>

                            <p className='selection_text'>Кол-во огурцов</p>
                                <div className='number'>
                                    <button className='number-min'>-</button>
                                    <input type="number" defaultValue={cucumber}/>
                                    <button className='number-min' >+</button>
                                </div>
                        </div>

                        <div className="checkbox">

                            <p className='selection__text'>Лук(да/нет)</p>
                                <input type ='checkbox' checked={onion} />
                        </div>
                    </div>

            </div>
        )

    })

    return    (

    <div className='main_page'>
     
        <div className="selection">
            {selectSection}
        </div>

        <div className="test">
            <button onClick={test}>Test</button>
        </div>
    </div>
    )

};


 {/* {!hasOrder && <div className='form_apps'>
            <div className='selection'>
                
                <div className="container">
                    <h3 className=''>Выберите котлету</h3>
                        <select onChange={HandleChangeMeat}>
                            {Meat.map(elem =>
                            <option key={elem.id} value={elem.id}>{elem.name}</option>)}
                        </select>
                </div>

                <div className="container">
                    <h3>Выберите сыр </h3>
                        <select onChange={HandleChangeCheese}>
                            {Chees.map(elem =>
                            <option key={elem.id} value={elem.id}>{elem.name}</option>)}
                        </select>
                </div>

                <div className="container">
                    <h3>Выберите соус</h3>
                        <select onChange={HandleChangeSauce}>
                            {Sauses.map(elem =>
                            <option key={elem.id} value={elem.id}>{elem.name}</option>)}
                        </select>
                  
                </div>


                <div className="variant">

                    <p className='selection_text'>Кол-во помидоров</p>
                        <div className='number'>
                            <button className='number-min' onClick={handleDeTomato}>-</button>
                                <input type="number" value={countTomato} readOnly/>
                            <button className='number-min' onClick={handleInTomato}>+</button>
                        </div>

                    <p className='selection_text'>Кол-во огурцов</p>
                        <div className='number'>
                            <button className='number-min' onClick={handleDeCucumber}>-</button>
                            <input type="number" value={countCucumber} readOnly/>
                            <button className='number-min' onClick={handleInCucumber}>+</button>
                        </div>
                </div>

                <div className="checkbox">

                    <p className='selection__text'>Лук(да/нет)</p>
                        <input type ='checkbox' name='onion' checked={onion} onChange={handleOnionChange} />
                </div>

           <button type='submit'className='order_button' onClick={hendleSumbit}>Заказать!</button>

        </div>
            </div>}
                {hasOrder && <div className='modal_window'>
                    
                    <div className="content_part">
                        <img src={pathBack} alt='Картинка бургера' className='image-decoration'/>
                            <h3>Ваш заказ готовиться</h3>
                            <h2>Детали заказа</h2>
                                <p>Котлета: {Meat.find(elem => elem.id === meat) ?.name}</p>
                                <p>Сыр: {Chees.find(elem => elem.id === cheese) ?.name}</p>
                                <p>Соус: {Sauses.find(elem => elem.id === sauce) ?.name}</p>
                                <p>Количество помидоров: {countTomato}</p>
                                <p>Количество огурцов: {countCucumber}</p>
                                <p>Лук: {onion ? 'Добавить' : 'Без лука'}</p>
                            <button className='order_button' onClick={hendleSumbit}>Вернутся к форме заказа</button>
                    </div>
                </div>}
                   */}


                       // const [meat, setMeat] = useState(Meat[0].id);
    // const [cheese, setCheese] = useState(Chees[0].id);
    // const [sauce, setSauce] = useState(Sauses[0].id);
    // const [onion, setOnion] = useState(true);
    // const [countTomato, setCountTomato] = useState(2)
    // const [countCucumber, setCountCucumber] = useState(2)
    // const [hasOrder, setHasOrder] = useState(false)




    // const HandleChangeMeat = (event:any) => {
    //     event.preventDefault()
    //     setMeat(event.target.value)
    // }
    // const HandleChangeCheese = (event:any) => {
    //     event.preventDefault()
    //     setCheese(event.target.value)
    // }
    // const HandleChangeSauce = (event:any) => {
    //     event.preventDefault()
    //     setSauce(event.target.value)
    // }

    // const handleInTomato = (event:any) => {
    //     event.preventDefault()
    //     setCountTomato(prevValue => prevValue >= 4 ? 4 : prevValue + 1)
    // }
    // const handleDeTomato = (event:any) => {
    //     event.preventDefault()
    //     setCountTomato(prevValue => prevValue <= 0 ? 0 : prevValue - 1)
    // }

    // const handleInCucumber = (event:any) => {
    //     event.preventDefault()
    //     setCountCucumber(prevValue => prevValue >= 4 ? 4 : prevValue + 1)
    // }
    // const handleDeCucumber = (event:any) => {
    //     event.preventDefault()
    //     setCountCucumber(prevValue => prevValue <= 0 ? 0 : prevValue - 1)
    // }
    // const handleOnionChange = (event:any) => {
    //     setOnion(!onion)
    // }

    // const hendleSumbit = (event:any) => {
    //     setHasOrder(!hasOrder)
    // }


    
//Добавить в корзине кнопку 'Добавить', которая обнуляет локалсторэдж и корзину+
//Перебрать логику страницы "Конструктор", 
    //Сделать кнопку из конструктора кнопкой Добавить
    //попробовать присвоить уникальный id 
    //и добавление в общую корзину
//Если получится, то закончить стилистику
//Кнопки удалить выбраный товар из корзины и очистить корзину


//Скинуть Севе
//Добавить типы

