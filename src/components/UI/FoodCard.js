import React from 'react'
import styles from './FoodCard.module.scss'

const FoodCard = () => {
    return (
        <>
        <div className={styles.foodCard}>
            <img src="/img/food.jpg" alt="" />
            <div className={styles.foodCard__mask}>
                <div className={styles.foodCard__text}>
                    <span className={styles["foodCard__text--title"]}>長角96</span>
                    <span className={styles["foodCard__text--category"]}>異國料理</span>
                </div>
                <span className={styles.foodCard__city}>新北市</span>
            </div>
        </div>
        <div className={styles.foodCard}>
            <img src="/img/food.jpg" alt="" />
            <div className={styles.foodCard__mask}>
                <div className={styles.foodCard__text}>
                    <span className={styles["foodCard__text--title"]}>長角96</span>
                    <span className={styles["foodCard__text--category"]}>異國料理</span>
                </div>
                <span className={styles.foodCard__city}>新北市</span>
            </div>
        </div>
        <div className={styles.foodCard}>
            <img src="/img/food.jpg" alt="" />
            <div className={styles.foodCard__mask}>
                <div className={styles.foodCard__text}>
                    <span className={styles["foodCard__text--title"]}>長角96</span>
                    <span className={styles["foodCard__text--category"]}>異國料理</span>
                </div>
                <span className={styles.foodCard__city}>新北市</span>
            </div>
        </div>
        <div className={styles.foodCard}>
            <img src="/img/food.jpg" alt="" />
            <div className={styles.foodCard__mask}>
                <div className={styles.foodCard__text}>
                    <span className={styles["foodCard__text--title"]}>長角96</span>
                    <span className={styles["foodCard__text--category"]}>異國料理</span>
                </div>
                <span className={styles.foodCard__city}>新北市</span>
            </div>
        </div>
        <div className={styles.foodCard}>
            <img src="/img/food.jpg" alt="" />
            <div className={styles.foodCard__mask}>
                <div className={styles.foodCard__text}>
                    <span className={styles["foodCard__text--title"]}>長角96</span>
                    <span className={styles["foodCard__text--category"]}>異國料理</span>
                </div>
                <span className={styles.foodCard__city}>新北市</span>
            </div>
        </div>
        </>
    )
}

export default FoodCard