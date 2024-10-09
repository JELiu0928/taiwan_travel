import { useState } from "react";
import RegionContext from './RegionContext'
const RegionProvider = (prop)=>{
    const [selectedArea,setSelectedArea] = useState('north')
    const [selectedCity,setSelectedCity] = useState('Taipei')

    return (
        <RegionContext.Provider value={{selectedArea,setSelectedArea,selectedCity,setSelectedCity}}>
            {prop.children}
        </RegionContext.Provider>
    )
}
export default RegionProvider;

