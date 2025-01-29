import { useState } from "react";
import CommonContext from './CommonContext'
const CommonProvider = (prop)=>{
    const [selectedArea,setSelectedArea] = useState({ area: 'north', name: '北部' })
    const [selectedCity,setSelectedCity] = useState('Taipei')
    const [cityName,setCityName] = useState({EN:"Taipei",ZH:"台北市"}) 
    function filterAndRandomData(datas,setState,databegin,dataend){
        let filterDatas = datas.filter((item)=> Object.keys(item.Picture).length !== 0)
        filterDatas = filterDatas.filter(item => {
            // 假設資料包含活動名稱是透過 ActivityName 鍵來識別
            if (item.ActivityName) {
                // 只過濾 ActivityName 含有"轉知"的資料
                return !item.ActivityName.includes('轉知');
            }
            // 如果不是Activity類型，則不做過濾
            return true;
        });
       
        let newData = [...filterDatas]
        newData.sort(()=>Math.random() - 0.5)
        setState(newData.slice(databegin,dataend))
    }
    // fetch資料回來過濾沒有照片的資料
    function fetchAndRandomDatas(fetchUrl,setState,databegin,dataend){
        fetch(fetchUrl)
        .then(res=>{
            if(!res.ok){
                return res.text()
            }
            return res.json()
        })
        .then(datas=>{
            // console.log('我是fetchAndRandomDatas ===== ',datas)
            // filterAndRandomData(data,setRandomActivity,0,6)

            let filterDatas = datas.filter((item)=> Object.keys(item.Picture).length !== 0)
            // console.log('過濾',filterDatas)
            let newData = [...filterDatas]
            newData.sort(()=>Math.random() - 0.5)
            setState(newData.slice(databegin,dataend))
        }).catch(error=> {
            console.log(error)
           
        })
    }
    const [spanIndexActive,setSpanIndexActive] = useState(0)
    const [offsetpiece,setOffsetpiece] = useState(2)

    return (
        <CommonContext.Provider value={{selectedArea,setSelectedArea,
                                        // selectedCity,setSelectedCity,
                                        cityName,setCityName,
                                        filterAndRandomData,
                                        spanIndexActive,setSpanIndexActive,
                                        fetchAndRandomDatas,
                                        offsetpiece,setOffsetpiece
                                        }}>
            {prop.children}
        </CommonContext.Provider>
    )
}
export default CommonProvider;

