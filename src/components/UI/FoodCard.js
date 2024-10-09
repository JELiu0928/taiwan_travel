import React from 'react'
import styles from './FoodCard.module.scss'

const FoodCard = (props) => {
    const {foodData :datas} = props

    return (
        <>
        <div className={styles.foodCard}>
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