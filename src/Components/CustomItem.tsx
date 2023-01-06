import * as React from "react";
import { useState } from "react";


const CustomItem: React.FC = () => {
    console.log('Render CustomItem');
    
    const [customCart,setCastomCart] = useState(JSON.parse( localStorage.getItem('custom')) || [])
    return (
        <div className="test">
            {customCart.map((item:any) => {
            const {meat,chees, sauses,tomato,cucumber,onion} = item
                return (
                <div  className="content">
                    <div className="meat">{meat}</div>
                    <div className="sauses">{sauses}</div>
                    <div className="chees">{chees}</div>
                    <div className="tomato">{tomato}</div>
                    <div className="cucumber">{cucumber}</div>
                    <div className="onion">{(onion === true) ? 'Добавить лук' : 'Без лука'}</div>
                </div>
                )
            })}
        </div>
    )
}

export default CustomItem