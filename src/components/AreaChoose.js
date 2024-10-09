import React, { useContext, useState } from 'react'
import styles from './areaChoose.module.scss'
import {regionsAndCities} from '../data/regions'
import RegionContext from '../store/RegionContext'
const AreaChoose = () => {
    const {selectedArea,setSelectedArea,selectedCity,setSelectedCity} = useContext(RegionContext)
    // const [area,setArea] = useState('north')
    // const [selectedCity,setSelectedCity] = useState('Taipei')
    const citiesArr = regionsAndCities[selectedArea]
    // console.log(citiesArr)

    return (
        <>
        {/* <div > */}
            <ul className={styles.areaChoose}>
                {   
                    citiesArr.map((item,i)=>{
                        return <li className={styles["areaChoose__area"]} onClick={()=>{setSelectedCity(item.city)}} key={i}>
                                    <button className={selectedCity === item.city ? styles["areaChoose__area--active"] : '' }>{item.name}</button>
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