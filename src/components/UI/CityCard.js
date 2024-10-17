import React, { useState ,useContext } from 'react'
import styles from './cityCard.module.scss'
import {regions} from '../../data/regions'
import RegionContext from '../../store/CommonContext'
import useMedia, { LAYOUT }  from '../../hook/useMedia'
import { useLocation } from 'react-router-dom'

const CityCard = (props) => {
    const {selectedArea,setSelectedArea,selectedCity,setSelectedCity} = useContext(RegionContext)
    // setSelectedArea()
    const layout = useMedia()
    // const [selectedArea,setSelectedArea] = useState('north')
    const location = useLocation()
    // console.log('useLocation',aaa)
    const handleSelectArea = (area,name)=> {
        // console.log('我是area',area)
        props.onSelectArea({area:area,name:name})
    }
    return (
        <>
        
        <div className={styles.cityCard__outer}>
            {regions.map((item,i)=> {
                // console.log(item)
                // ${styles["cityCard--active"]}
                return ( 
                    layout === LAYOUT.PHONE && location.pathname !== "/" ? 
                    (
                        <li className={`${styles["cityCard-capsule"]} `} 
                            onClick={()=>handleSelectArea(item.area,item.name)} key={i}>
                            <button className={`${selectedArea.area === item.area ? styles["cityCard--active"] : ''}`}>{item.name}</button>
                        </li>
                    ):(
                        <button onClick={()=>handleSelectArea(item.area,item.name) }
                                className={`${styles.cityCard} ${selectedArea === item.area ? styles["cityCard--active"] : ''}`} 
                                key={i} 
                                data-areaname={item.area}>
                            <div className={styles.cityCard__circle}>
                                <img src={item.img} alt="" className={styles.cityCard__icon} />
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

export default CityCard