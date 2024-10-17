import { useState } from "react";
import CommonContext from './CommonContext'
const CommonProvider = (prop)=>{
    const [selectedArea,setSelectedArea] = useState({ area: 'north', name: '北部' })
    const [selectedCity,setSelectedCity] = useState('Taipei')
    function filterAndRandomData(datas,setState,databegin,datapiece){
        let filterDatas = datas.filter((item)=> Object.keys(item.Picture).length !== 0)
        // console.log('過濾',filterDatas)
        let newData = [...filterDatas]
        newData.sort(()=>Math.random() - 0.5)
        setState(newData.slice(databegin,datapiece))
    }
    // fetch資料回來過濾沒有照片的資料
    function fetchAndRandomDatas(fetchUrl,setState,databegin,datapiece){
        fetch(fetchUrl)
        .then(res=>{
            if(!res.ok){
                return res.text()
            }
            return res.json()
        })
        .then(datas=>{
            // console.log('我是activity_data',data)
            // filterAndRandomData(data,setRandomActivity,0,6)


            let filterDatas = datas.filter((item)=> Object.keys(item.Picture).length !== 0)
            // console.log('過濾',filterDatas)
            let newData = [...filterDatas]
            newData.sort(()=>Math.random() - 0.5)
            setState(newData.slice(databegin,datapiece))
        }).catch(error=> {
            console.log(error)
           
        })
    }
    const [spanIndexActive,setSpanIndexActive] = useState(0)
    const [offsetpiece,setOffsetpiece] = useState(2)

    return (
        <CommonContext.Provider value={{selectedArea,setSelectedArea,
                                        selectedCity,setSelectedCity,
                                        filterAndRandomData,
                                        fetchAndRandomDatas,
                                        spanIndexActive,setSpanIndexActive,
                                        offsetpiece,setOffsetpiece
                                        }}>
            {prop.children}
        </CommonContext.Provider>
    )
}
export default CommonProvider;

