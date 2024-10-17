import React, { useContext, useRef, useState } from 'react'
import styles from './areaChoose.module.scss'
import {regionsAndCities} from '../data/regions'
import RegionContext from '../store/CommonContext'
import useMedia, { LAYOUT } from '../hook/useMedia'
const AreaChoose = (props) => {
    const {selectedArea,setSelectedArea,selectedCity,setSelectedCity} = useContext(RegionContext)
    const layout = useMedia()

    // const [selectedCity,setSelectedCity] = useState('Taipei')
    const citiesArr = regionsAndCities[selectedArea.area]
    // console.log("縣市",citiesArr.length)
    // console.log(citiesArr)
    // console.log('cityNameRef',cityNameRef.current)
    // const getCityName = ()=>{
    //     props.onGetCityName(cityNameRef.current.innerHTML)
    // }
    const cityClickHandler = (item)=>{
        setSelectedCity(item.city)
        props.onGetCityName({EN:item.city,ZH:item.name})
        // props.onGetCityZHName(item.name)
        props.setIsSelsctShowing(false)
    }
    return (
        <>
        {/* <div > */}
            <ul className={styles.areaChoose} 
                style={layout !== LAYOUT.PHONE ? {"grid-template-columns": `repeat(${citiesArr && citiesArr.length},1fr)`} : {"grid-template-columns": `repeat(3,1fr)`}}>
                {   
                    citiesArr && citiesArr.map((item,i)=>{
                        // return <li className={styles["areaChoose__area"]} onClick={()=>{setSelectedCity(item.city)}} key={i}>
                        return <li className={styles["areaChoose__area"]} onClick={()=> {cityClickHandler(item)}} key={i}>
                                    <button 
                                        className={selectedCity === item.city ? styles["areaChoose__area--active"] : '' } 
                                        >{item.name}</button>
                                </li>
                    })
                    }
                {/* <li className={`${styles["areaChoose__area"]} `}>
                    <button className={styles["areaChoose__area--active"]}>台北市</button>
                </li> */}
                
            </ul>
        {/* </div> */}
        </>
    )
}

export default AreaChoose