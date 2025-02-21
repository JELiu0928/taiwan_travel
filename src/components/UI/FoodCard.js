import React from 'react'
import styles from './foodCard.module.scss'
import useMedia ,{LAYOUT} from '../../hook/useMedia'
import { useLocation } from 'react-router-dom'
const sizeStyles = {
    large: { width: '23.1rem',minWidth: '23.1rem', height: '35.5rem' },
    medium: { width: '25rem', minWidth: '25rem', height: '25rem' },
    small: { width: '23.1rem', minWidth: '23.1rem',height: '23.1rem' },
    // small: { width: '25rem', minWidth: '25rem', height: '25rem' },
    xsmall: { width: '18rem', minWidth: '18rem', height: '18rem' },
    // xsmall: { width: '150px', height: '200px' },
    'home-small': { width: '20rem',minWidth: '20rem', minHeight: '28rem'},

};

const FoodCard = (props) => {
    const {foodData :datas,size = 'large',type} = props
    let cardSize = sizeStyles[size] || sizeStyles.large; // 默認為 'medium'
    // const filteredData = datas.filter((item)=> item.Images && item.Image.length > 0)
    const layout = useMedia()
    // console.log(layout)
    if(type === 'city-food'){
        if(layout === LAYOUT.SMALL_TAB){
            // console.log('cityfood 222')
            cardSize = sizeStyles.medium
            // console.log(cardSize)
        }else if(layout === LAYOUT.PHONE){
            // console.log('cityfood 222')
            cardSize = sizeStyles.xsmall
            // console.log(cardSize)
        }else{
            cardSize = sizeStyles.small
        }

    }
    if(type === 'home-food'){
        if(layout === LAYOUT.PHONE ){
            cardSize = sizeStyles['home-small']
            // console.log('home-food')
        }
    }


    
    const location = useLocation()
    // console.log('home',props)

   
    return (
        <>
        <div className={styles.foodCard} style={cardSize}>
            {/* style={layout === LAYOUT.PHONE ? {width: "16.8rem", height: "20rem"} : {}}> */}
            <img src={datas && datas.Picture ? datas.Picture.PictureUrl1 : "/img/food.jpg"} alt="" />
            <div className={styles.foodCard__mask}>
                <div className={styles.foodCard__text}>
                    <span className={styles["foodCard__text--title"]}>{datas && datas.RestaurantName}</span>
                    <span className={styles["foodCard__text--category"]}>{datas && datas.Class ? datas.Class: '其他'}</span>
                </div>
                <span className={styles.foodCard__city}>{datas && datas.City}</span>
            </div>
        </div>
        </>
    )
}

export default FoodCard