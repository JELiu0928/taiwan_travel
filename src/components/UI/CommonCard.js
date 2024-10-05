import React from 'react'
import styles from './CommonCard.module.scss'

const CommonCard = () => {
    return (
        <div className={styles.commonCard__outer}>
            <div className={styles.commonCard}>
                <div className={styles.commonCard__img}>
                    <img src="/img/test.jpg" alt="" />
                </div>
                <div className={styles.commonCard__text}>
                    <h3 className={styles["commonCard__text-main"]}>2021大溪豆干節</h3>
                    <span className={styles["commonCard__text-sub"]}>桃園市政府觀光旅遊局</span>
                </div                       >
                <div className={styles["commonCard__tag-zone"]}>
                    <div className={styles["commonCard__tag-zone--keyword"]}>
                        <span>年度</span>
                        <span>藝文</span>
                    </div>
                    <span className={styles["commonCard__tag-zone--city"]}>
                        桃園市
                    </span>
                </div>
            </div>          
            <div className={styles.commonCard}>
                <div className={styles.commonCard__img}>
                    <img src="/img/test.jpg" alt="" />
                </div>
                <div className={styles.commonCard__text}>
                    <h3 className={styles["commonCard__text-main"]}>2021大溪豆干節</h3>
                    <span className={styles["commonCard__text-sub"]}>桃園市政府觀光旅遊局</span>
                </div>
                <div className={styles["commonCard__tag-zone"]}>
                    <div className={styles["commonCard__tag-zone--keyword"]}>
                        <span>年度</span>
                        <span>藝文</span>
                    </div>
                    <span className={styles["commonCard__tag-zone--city"]}>
                        桃園市
                    </span>
                </div>

            </div>

            <div className={styles.commonCard}>
                <div className={styles.commonCard__img}>
                    <img src="/img/test.jpg" alt="" />
                </div>
                <div className={styles.commonCard__text}>
                    <h3 className={styles["commonCard__text-main"]}>2021大溪豆干節</h3>
                    <span className={styles["commonCard__text-sub"]}>桃園市政府觀光旅遊局</span>
                </div>
                <div className={styles["commonCard__tag-zone"]}>
                    <div className={styles["commonCard__tag-zone--keyword"]}>
                        <span>年度</span>
                        <span>藝文</span>
                    </div>
                    <span className={styles["commonCard__tag-zone--city"]}>
                        桃園市
                    </span>
                </div>

            </div>  
        </div>
    )
}

export default CommonCard;
