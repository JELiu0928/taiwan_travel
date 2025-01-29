import React, { useContext, useEffect, useRef, useState} from 'react'
import styles from './cityChoose.module.scss'
import {regionsAndCities ,regions} from '../data/regions'
import RegionContext from '../store/CommonContext'
import useMedia, { LAYOUT } from '../hook/useMedia'
import { useLocation, useNavigate } from 'react-router-dom'
const CityChoose = (props) => {
    const {selectedArea,setSelectedArea,
        cityName,setCityName} = useContext(RegionContext)
    const layout = useMedia()
    const location = useLocation()
    const navigate = useNavigate()
    const URLparams = new URLSearchParams(location.search)
    const URLCityEN = URLparams.get('city')
    const URLArea = URLparams.get('area')
    const areaName = regions.find((area)=> area.area === URLArea).name //找區域中文
    const citiesArr = regionsAndCities[selectedArea.area]
    const cityZH = regionsAndCities[URLArea].find((city)=> city.city === URLCityEN).name //找城市中文
    // console.log('中文',cityZH)
    useEffect(()=>{
        if(URLCityEN){   
            props.onGetCityName({EN:URLCityEN,ZH:cityZH})
            setSelectedArea({ area: URLArea, name: areaName})
        }

    },[URLCityEN,URLArea])
    // 選擇城市，
    const cityClickHandler = (item)=>{
        props.onGetCityName({EN:item.city,ZH:item.name})
        props.setIsSelectShowing(false)
        // 改url
        navigate(`/city?area=${selectedArea.area}&city=${item.city}`)
    }
    // const slideLeftRef = useRef([])
    // console.log(slideLeftRef.current && slideLeftRef.current)

    return (
        <>
        {/* <div > */}
            <ul className={styles.cityChoose} 
                style={layout !== LAYOUT.PHONE ? {"gridTemplateColumns": `repeat(${citiesArr && citiesArr.length},1fr)`} : {"gridTemplateColumns": `repeat(3,1fr)`}}>
                {   
                    citiesArr && citiesArr.map((item,i)=>{
                        // return <li className={styles["cityChoose__area"]} onClick={()=>{setSelectedCity(item.city)}} key={i}>
                        // ref={(elem)=>slideLeftRef.current[i] = elem}
                        return <li className={styles["cityChoose__area"]} 
                                    onClick={()=> {cityClickHandler(item)}} key={i}>
                                    <button 
                                        className={props.cityName.EN === item.city ? styles["cityChoose__area--active"] : '' } 
                                        >{item.name}</button>
                                </li>
                    })
                    }
                {/* <li className={`${styles["cityChoose__area"]} `}>
                    <button className={styles["cityChoose__area--active"]}>台北市</button>
                </li> */}
                
            </ul>
        {/* </div> */}
        </>
    )
}

export default CityChoose