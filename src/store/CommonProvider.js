import { useState } from "react";
import CommonContext from './CommonContext'
import activityJsonData from '../data/activityJsonData.json'
import accommodationJsonData from '../data/accommodationJsonData.json'
import foodJsonData from '../data/foodJsonData.json'
const CommonProvider = (prop)=>{
    const [selectedArea,setSelectedArea] = useState({ area: 'north', name: '北部' })
    // const [selectedCity,setSelectedCity] = useState('Taipei')
    const [cityName,setCityName] = useState({EN:"Taipei",ZH:"台北市"}) 
    function filterJSONAndRandomData(datas,setState,databegin,dataend,cityNameZH = null){
        let filterDatas = datas.filter((item)=> Object.keys(item.Picture).length !== 0)
        // let filterDatas = [...datas]
        // console.log('cityNameZH===',cityNameZH)
        filterDatas = filterDatas.filter(item => {
            if (item.ActivityName) {
                return !item.ActivityName.includes('轉知');
            }
            return true;
        })
        if(cityNameZH){

            filterDatas = filterDatas?.filter((item) => item.City === cityNameZH || item.Address?.includes(cityNameZH) );
        }
        // console.log('過濾後data',filterDatas)
        let newData = [...filterDatas]
        newData.sort(()=>Math.random() - 0.5)
        setState(newData.slice(databegin,dataend))
    }
    // fetch資料回來過濾沒有照片的資料
    function fetchAndRandomDatas(fetchUrl,setState,databegin,dataend,jsonData,cityNameZH){
        fetch(fetchUrl)
        .then(res=>{
            // console.log('fetch',res)
            if(!res.ok){
                // return res.text()
                throw new Error(`錯誤：${res.status}`);
            }
            return res.json()
        })
        .then(datas=>{
            // console.log('我是fetchAndRandomDatas ===== ',datas)
            let filterDatas = datas.filter((item)=> Object.keys(item.Picture).length !== 0)
            // console.log('過濾',filterDatas)
            // let newData = [...datas]
            let newData = [...filterDatas]
            newData.sort(()=>Math.random() - 0.5)
            setState(newData.slice(databegin,dataend))
        }).catch(error=> {
            // console.log('fetch err ====',error.message)
           
            // console.log(error.slice(-3))
            if(error.message.includes('429')){
                console.log('429錯誤!!')
                filterJSONAndRandomData(jsonData,setState,databegin,dataend,cityNameZH)
            }
        })
    }
    // function searchKeyword(keyword){
    //     if(keyword.trim() == '') return
    //     console.log("搜尋結果", keyword);
        
    //     const categories = [
    //         { data: activityJsonData, setState: setRandomActivity, key: "ActivityName", count: 6 },
    //         { data: foodJsonData, setState: setRandomFood, key: "RestaurantName", count: 10 },
    //         // { data: scenicJsonData, setState: setRandomScenicSpot, key: "ScenicSpotName", count: 6 },
    //         { data: accommodationJsonData, setState: setRandomAccommodation, key: "HotelName", count: 4 },
    //     ];
       
    //     categories.forEach(({ data, setState, key, count }) => {
    //         if (!data) return; // 避免資料未載入
    
    //         // 過濾有圖片的資料
    //         let filterDatas = data.filter(item => Object.keys(item.Picture).length !== 0);
    
    //         // 過濾符合關鍵字的資料
    //         filterDatas = filterDatas.filter(item => item[key] && item[key].includes(keyword));
    
    //         // 如果沒有找到資料，就不更新狀態
    //         if (filterDatas.length === 0) {
    //             console.log(`類別 ${key} 沒有符合關鍵字的資料`);
    //             return;
    //         }
    
    //         // 隨機排序後取指定筆數
    //         let newData = [...filterDatas].sort(() => Math.random() - 0.5).slice(0, count);
    
    //         // 更新狀態
    //         setState(newData);
    //     });
       
    // }
    const [spanIndexActive,setSpanIndexActive] = useState(0)
    const [offsetpiece,setOffsetpiece] = useState(2)

    return (
        <CommonContext.Provider value={{
                                        selectedArea,setSelectedArea,
                                        // selectedCity,setSelectedCity,
                                        cityName,setCityName,
                                        filterJSONAndRandomData,
                                        spanIndexActive,setSpanIndexActive,
                                        fetchAndRandomDatas,
                                        offsetpiece,setOffsetpiece,
                                        // searchKeyword
                                    }}>
            {prop.children}
        </CommonContext.Provider>
    )
}
export default CommonProvider;

