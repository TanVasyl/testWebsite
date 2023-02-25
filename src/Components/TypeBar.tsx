import * as React from "react"; 
import axios from 'axios';
import { useTypeSelector } from '../hooks/useSelector';
import { useAppDispatch } from '../reducers/store';
import { Link } from "react-router-dom";
import { fetTypeItems, selected } from "../reducers/slice/typeSlice";
import { fetchType } from "../http/foodTypeApi";

const TypeBar:React.FC = () => {
    const dispatch = useAppDispatch()
    const {type, selectedType} = useTypeSelector(state => state.typeSlice)
    // React.useEffect(() => {
    //     dispatch(fetchTypeItems())
    // },[])
    React.useEffect(() => {
        fetchType().then(data => dispatch(fetTypeItems(data)))
    },[])
    const selectType = (id:number) => {
        dispatch(selected(id))
    }
    const styleSelected = (id:number) => {
        if(selectedType === id) {
            return {"border": "1px solid black"}
        } else {
            return {"border": 0}
        }
    }
    return (
        <div className="type__bar"> 
            {type.map((type) => {
                return ( 
                    <span
                    style={styleSelected(type.id)}
                    key={type.id}
                    onClick={() => selectType(type.id)}
                    >
                        <Link   style={{'color':'black'}} to={'/'}>{type.name}</Link>
                    </span>
                )
            })}
        </div>
    )
}


export default TypeBar;