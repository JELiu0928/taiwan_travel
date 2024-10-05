import React from 'react'
import styles from './home.module.scss'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import CityCard from './UI/CityCard'
import CommonCard from './UI/CommonCard'
import FoodCard from './UI/FoodCard'

const Home = () => {
    return (
        <>

        <section className={styles.banner}>
            <h2 className={styles["banner__main-text"]} >想去哪裡玩？</h2>
            <p className={styles["banner__sub-text"]}>這裡共有上千個活動及美食等著你去一同體驗</p>
            <div className={styles.banner__search}>
                <input type="text" placeholder='12/22新北耶誕嘉年華' className={styles["banner__search-input"]}/>
                <button className={styles["banner__search-btn"]}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles["banner__search-icon"]}/>
                    <span>搜尋</span>   
                </button>
            </div>
        </section>
        <section >
            <div className={styles.cityChoose}>
                <div className={`${styles["common__text--city"]}`}>
                    <h3 className={`${styles["common__text-main"]} `}>縣市快選</h3>
                    <span className={styles["common__text-sub"]}>Choose Cities</span>
                </div>
                <CityCard/>
                <img className={styles.cityChoose__icon} src="/img/city_person.png" alt="icon" />
            </div>
            <div className={`${styles["cityChoose__decoration"]} ${styles["cityChoose__decoration-1"]}`}></div>
            <div className={`${styles["cityChoose__decoration"]} ${styles["cityChoose__decoration-2"]}`}></div>
        </section>

        <section className={styles.festival222}>
            <div className={styles.festival}>
                <CommonCard/>
                <div className={styles.festival__text}>
                    <h3 className={`${styles["common__text-main"]} `}>多久沒有</h3>
                    <h3 className={`${styles["common__text-main"]} `}>出門走走了呢？</h3>
                    <span className={`${styles["common__text-sub"]} ${styles["common__text--getout"]}`}>Let’s get out</span>
                    <button className={styles.festival__btn}>更多FUNNY</button>
                </div>
            </div>
            <div>
                <CommonCard />
            </div>
        </section>
        <section className={styles.tasty__outer}>
            <div className={styles.tasty}>
                <div className={styles.common__text}>
                    <h3 className={`${styles["common__text-main"]} `}>餐影美食</h3>
                    <span className={`${styles["common__text-sub"]} `}>Tasty</span>
                    <button className={styles.festival__btn}>更多美味</button>
                </div>
                <div>
                    <div className={styles.tasty__foodCard}>
                        <FoodCard/>
                    </div>
                </div>
            </div>
        </section>
        <section className={styles.accommodation}>
            aaa
        </section>
        </>
   
    )
}

export default Home;
