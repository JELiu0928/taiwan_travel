import React from 'react'
import styles from './foodCard.module.scss'
import useMedia ,{LAYOUT} from '../../hook/useMedia'
import { useLocation } from 'react-router-dom'
const FoodCard = (props) => {
    const {foodData :datas} = props
    // const filteredData = datas.filter((item)=> item.Images && item.Image.length > 0)
    const layout = useMedia()
    const location = useLocation()
    // console.log(location)
    return (
        <>
        <div className={styles.foodCard} 
        // >
            style={layout === LAYOUT.PHONE && location.pathname ==='/city'? {width: "16.8rem", height: "20rem"} : {}}>
            <img src={datas && datas.Picture ? datas.Picture.PictureUrl1 : "/img/food.jpg"} alt="" />
            <div className={styles.foodCard__mask}>
                <div className={styles.foodCard__text}>
                    <span className={styles["foodCard__text--title"]}>{datas && datas.RestaurantName}</span>
                    <span className={styles["foodCard__text--category"]}>{datas && datas.Class}</span>
                </div>
                <span className={styles.foodCard__city}>{datas && datas.City}</span>
            </div>
        </div>
        
        
        
        </>
    )
}

export default FoodCard