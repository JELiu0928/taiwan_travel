import React, { useState ,useContext } from 'react'
import styles from './cityCard.module.scss'
import {regions} from '../../data/regions'
import RegionContext from '../../store/CommonContext'

const CityCard = (props) => {
    const {selectedArea,setSelectedArea,selectedCity,setSelectedCity} = useContext(RegionContext)
    // setSelectedArea()

    // const [selectedArea,setSelectedArea] = useState('north')
 
    return (
        <>
        
        <div className={styles.cityCard__outer}>
            {regions.map((item,i)=> {
                // console.log(item)
                // ${styles["cityCard--active"]}
                return (
                    <button onClick={()=>  props.onSelectArea(item.area) }
                        className={`${styles.cityCard} ${selectedArea === item.area ? styles["cityCard--active"] : ''}`} 
                        key={i} 
                        data-areaname={item.area}>
                        <div className={styles.cityCard__circle}>
                            <img src={item.img} alt="" className={styles.cityCard__icon} />
                        </div>
                        <span>{item.name}</span>
                    </button>
                    
                )
            })}
                
        </div>
        
        </>
    )
}

export default CityCard