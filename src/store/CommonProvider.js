import { useState } from "react";
import CommonContext from './CommonContext'
const CommonProvider = (prop)=>{
    const [selectedArea,setSelectedArea] = useState('north')
    const [selectedCity,setSelectedCity] = useState('Taipei')
    function filterAndRandomData(datas,setState,databegin,datapiece){
        let filterDatas = datas.filter((item)=> Object.keys(item.Picture).length !== 0)
        // console.log('過濾',filterDatas)
        let newData = [...filterDatas]
        newData.sort(()=>Math.random() - 0.5)
        setState(newData.slice(databegin,datapiece))
    }
    return (
        <CommonContext.Provider value={{selectedArea,setSelectedArea,selectedCity,setSelectedCity,filterAndRandomData}}>
            {prop.children}
        </CommonContext.Provider>
    )
}
export default CommonProvider;

