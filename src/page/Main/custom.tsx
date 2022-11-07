import * as React from 'react';
import { Argument} from 'webpack';
import { useState } from 'react';
import './custom.css'
import ingredients from '../../ingredients';
import { ICustomProps } from '../App';


//Продолжаю работу над разделом


export default interface It1Props {
    castomCart: typeof ingredients,
    setCastomCart: React.SetStateAction<any>
}
export default function Main () {   
    const [customCart, setCustomCart] = useState([{
        meat:ingredients[0].meat[0].name,
        chees:ingredients[0].chees[0].name,
        sauses:ingredients[0].sauses[0].name,
        tomato:ingredients[0].tomato,
        cucumber:ingredients[0].cucumber,
        onion:ingredients[0].onion,
    }])
    const addCart = () => {
        localStorage.setItem('custom', JSON.stringify(customCart))
    }
    const meatChange = (event:any) => {
        setCustomCart(() => {
            return customCart.map((elem) => {
                return {
                    ...elem,
                    meat:event.target.value
                }
            })
        })  
    }
    const cheesChange = (event:any) => {
        setCustomCart(() => {
            return customCart.map((elem) => {
                return {
                    ...elem,
                    chees:event.target.value
                }
            })
        })  
    }
    const sausesChange = (event:any) => {
        setCustomCart(() => {
            return customCart.map((elem) => {
                return {
                    ...elem,
                    sauses:event.target.value
                }
            })
        })  
    }
    const onionChange = (event:any) => {
        setCustomCart(() => {
            return customCart.map((elem) => {
                return {
                    ...elem,
                    onion: true
                }
            })
        })  
    }
    const increaseTomato = () => {
        setCustomCart(() => {
            return customCart.map((elem) => {
                return {
                    ...elem,
                    tomato: elem.tomato+1
                }
            })
        })  
    }
    const dencreaseTomato = () => {
        setCustomCart(() => {
            return customCart.map((elem) => {
                return {
                    ...elem,
                    tomato: (elem.tomato >= 1) ? elem.tomato-1 : 0
                }
            })
        })  
    }
    const increaseCuc = () => {
        setCustomCart(() => {
            return customCart.map((elem) => {
                return {
                    ...elem,
                    cucumber: elem.cucumber+1
                }
            })
        })  
    }
    const decreaseCuc = () => {
        setCustomCart(() => {
            return customCart.map((elem) => {
                return {
                    ...elem,
                    cucumber: (elem.cucumber >= 1) ? elem.cucumber-1 : 0
                }
            })
        })  
    }
    const meatSelect = ingredients.map((elem)=> {
        const {meat} = elem
        return (
            meat.map((item) => {
            const {id,name} = item 
                return (
                <option key={id}>{name}</option>
                )
            })
        )
    })
    const cheesSelect = ingredients.map((elem)=> {
        const {chees} = elem
        return (
            chees.map((item) => {
            const {id,name} = item 
                return (
                <option key={id}>{name}</option>
                )
            })
        )
    })
    const sausesSelect = ingredients.map((elem)=> {
        const {sauses} = elem
        return (
            sauses.map((item) => {
            const {id,name} = item 
                return (
                <option key={id}>{name}</option>
                )
            })
        )
    })
    const countIngr = customCart.map((elem) => {
        const {cucumber, tomato, onion} = elem
        return (
            <div className="count_content">
                <div className="tomato_container">
                    <button onClick={dencreaseTomato} >-</button>
                    <p>Количество томатов :{tomato}</p>
                    <button onClick={increaseTomato}>+</button>
                </div>
                <div className="cucumber_container">
                    <button onClick={decreaseCuc} >-</button>
                    <p>Количество огурцов :{cucumber}</p>
                    <button onClick={increaseCuc}>+</button>
                </div>
                <div className="onion_container">
                  Лук:  <input onChange={onionChange} type="checkbox" />
                </div>
            </div>
        )
    })
    return    (
    <div className='main_page'>
        <div className="selection">
            <select onChange={meatChange}>
                {meatSelect}
            </select>
            <select onChange={cheesChange}>
                {cheesSelect}
            </select>
            <select onChange={sausesChange}>
                {sausesSelect}
            </select>
            <div className="countIngreditent">
             {countIngr}
            </div>
        </div>
        <div className="addCart">
            <button onClick={addCart}>Добавить в корзину</button>
        </div>
    </div>
    )

}