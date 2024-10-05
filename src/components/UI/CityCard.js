import React from 'react'
import styles from './CityCard.module.scss'
const CityCard = (props) => {
    const CityArr = ["/img/north.png","/img/central.png","/img/south.png","/img/east.png","/img/islands.png"]
    return (
        <>
        
        <div className={styles.cityCard__outer}>
            {CityArr.map((item,i)=> {
                return (
                    <div className={styles.cityCard}>
                        <div className={styles.cityCard__circle}>
                            <img src={CityArr[i]} alt="" className={styles.cityCard__icon} />
                        </div>
                        <span>{"北部"}</span>
                    </div>
                    
                )
            })}
                
        </div>
        
        </>
    )
}

export default CityCard