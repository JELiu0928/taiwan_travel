import React, { useContext, useRef, useState } from 'react'
import styles from './areaChoose.module.scss'
import {regionsAndCities} from '../data/regions'
import RegionContext from '../store/CommonContext'
const AreaChoose = (props) => {
    const {selectedArea,setSelectedArea,selectedCity,setSelectedCity} = useContext(RegionContext)
    // const [area,setArea] = useState('north')
    // const [selectedCity,setSelectedCity] = useState('Taipei')
    const citiesArr = regionsAndCities[selectedArea]
    // console.log(citiesArr)
    let cityNameRef = useRef()
    // console.log('cityNameRef',cityNameRef.current)
    // const getCityName = ()=>{
    //     props.onGetCityName(cityNameRef.current.innerHTML)
    // }
    const cityClickHandler = (item)=>{
        setSelectedCity(item.city)
        props.onGetCityENName(item.city)
        props.onGetCityZHName(item.name)
    }
    return (
        <>
        {/* <div > */}
            <ul className={styles.areaChoose}>
                {   
                    citiesArr.map((item,i)=>{
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