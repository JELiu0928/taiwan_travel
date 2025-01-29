import React, { useState ,useContext, useRef, useEffect } from 'react'
import styles from './areaCard.module.scss'
import {regions,regionsAndCities} from '../../data/regions'
import RegionContext from '../../store/CommonContext'
import useMedia, { LAYOUT }  from '../../hook/useMedia'
import { useLocation, useNavigate } from 'react-router-dom'

const AreaCard = (props) => {
    const {selectedArea,setSelectedArea,
        selectedCity,setSelectedCity,
        cityName,setCityName} = useContext(RegionContext)
    // setSelectedArea()
    const layout = useMedia()
    // const [selectedArea,setSelectedArea] = useState('north')
    const location = useLocation()
    // console.log('useLocation',aaa)
    const navigate = useNavigate()
    // console.log('navigate',navigate)
    const handleSelectArea = (area,name)=> {
        console.log('我是area',area,'和name=',name)
        props.onSelectArea({area:area,name:name})
        console.log('===>',regionsAndCities[area][0].city)
        let firstCity = regionsAndCities[area][0].city
        let firstCityName = regionsAndCities[area][0].name
        navigate(`/city?area=${area}&city=${firstCity}`)
        setCityName({EN:firstCity,ZH:firstCityName})
       
    }
    const areaCardRefs = useRef([]) //儲存多個ref
    
    useEffect(()=>{
     
        const handleOneSecondShow = ()=>{
            for(let i = 0 ; i < areaCardRefs.current.length;i++){
                if(areaCardRefs.current[i]){
                    // console.log(areaCardRefs.current[i].style)
                    areaCardRefs.current[i].style.setProperty('--delay',`${i * 0.2}s`)
                }
            }
        }
           handleOneSecondShow()
    },[])

    
    // handleOneSecondShow()

    return (
        <>
        
        <div className={styles.areaCard__outer}>
            {regions.map((item,i)=> {
                // console.log(item)
                // ${styles["cityCard--active"]}
                return ( 
                    layout === LAYOUT.PHONE && location.pathname !== "/" ? 
                    (
                        <li className={`${styles["areaCard-capsule"]} `} 
                            onClick={()=>handleSelectArea(item.area,item.name)} key={i}>
                            <button className={`${selectedArea.area === item.area ? styles["areaCard--active"] : ''}`}>{item.name}</button>
                        </li>
                    ):(
                        <button onClick={()=>handleSelectArea(item.area,item.name) }
                                className={`${styles.areaCard} ${selectedArea === item.area ? styles["areaCard--active"] : ''}`} 
                                key={i} 
                                ref={(elem)=>areaCardRefs.current[i] = elem}
                                data-areaname={item.area}>
                            <div className={styles.areaCard__circle}>
                                <img src={item.img} alt="" className={styles.areaCard__icon} />
                            </div>
                            <span>{item.name}</span>
                        </button> 
                        )
                )
            })}
                
        </div>
        
        </>
    )
}

export default AreaCard