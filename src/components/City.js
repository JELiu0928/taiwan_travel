import React, { useEffect,useContext,useState} from 'react'
import Header from './Header';
import styles from './city.module.scss'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'

import CityCard from './UI/CityCard';
import AreaChoose from './AreaChoose';
import CommonCard from './UI/CommonCard';
import FoodCard from './UI/FoodCard';
import Footer from './Footer';
import RegionContext from '../store/RegionContext'

import activityData from '../data/activity01.json'
import foodData from '../data/food01.json'
import accommodationData from '../data/accommodation01.json'
import attractionDatas from '../data/attraction.json'
const City = () => {
    const {selectedArea,setSelectedArea} = useContext(RegionContext)
    
    const [attractionData,setAttractionData] = useState([]) 
    // console.log('attractionDatas:', attractionDatas);
    // console.log('attractionDatas type:', typeof attractionDatas.value);

    
    useEffect(()=>{
        let newAttractionData = [...attractionDatas.value]
        newAttractionData.sort(()=> Math.random() - 0.5) // 將一個array作亂數排序
        // console.log('newAttractionData',newAttractionData)
        setAttractionData(newAttractionData.slice(0,6)) //取六筆
        // console.log('attractionData',attractionData)



        // console.log('activityData',activityData)
        // fetch(`http://localhost:3010/attraction`)
        // .then(res=>res.json())
        // .then((data)=>{
        //     console.log('我是data',data)
        //     // setAttractionData(data.value)
            
        //     // let newAttractionData = [...data.value]
        //     // newAttractionData.sort(()=> Math.random() - 0.5) // 將一個array作亂數排序
        //     // setAttractionData(newAttractionData.slice(0,6)) //取六筆
        //     // console.log('activity',attractionData)
        // }).catch((e) => {
        //     console.log('我是err',e)
        // });
    },[])
    const moveLeft = ()=>{
        let attractionCard = document.querySelector(`.${styles["city__attraction-card"]}`);
        // let cartWidth2 = [...document.querySelector(`.${styles["city__attraction-card"]}`).children]
        // console.log(cartWidth2[cartWidth2.length-1])
        if(attractionCard){
            let cartWidth = attractionCard.children[0].offsetWidth + 25
            attractionCard.scrollBy({
                left:cartWidth
            })
            console.log('scrollWidth',attractionCard.scrollWidth)
            console.log('clientWidth',attractionCard.clientWidth)
            console.log('offsetWidth',attractionCard.offsetWidth)
        }
        console.log('clientWidth',attractionCard.clientWidth)
    }
    let moveRight = ()=>{
        const attractionCard = document.querySelector(`.${styles["city__attraction-card"]}`);
        if(attractionCard){
            let cartWidth = attractionCard.children[0].offsetWidth + 25
            attractionCard.scrollBy({
                left:-cartWidth
            })
            console.log(cartWidth)
        }
    }
    const SelectAreaHandler = (area)=>{
        setSelectedArea(area)
    }
    return (
        <>
        <Header/>
        <section className={styles.city}>
            <div className={styles.city__banner}>
                <img src="/img/banner_city.jpg" alt="" />
            </div>
            <div className={styles.city__cityChoose}>
                <div className={`${styles["common__text--city"]} ${styles["common__text--cityChoose"]}`}>
                    <h3 className={`${styles["common__text-main"]} `}>縣市快選</h3>
                </div>
                <div className={styles.city__cityCard}>
                    <CityCard onSelectArea={SelectAreaHandler}/>
                    <div className={styles["city__cityCard-choose"]}>
                        <AreaChoose/>
                    </div>
                </div>
                <div>
                       
                </div>
            </div>
        </section>
        <section className={styles.container}>
            <h2 className={styles["city__attraction-text"]}>
                <span>台北市</span>
                <span>景點介紹</span>
            </h2>
            <div className={styles.city__attraction}>
                <div className={styles["city__attraction-card"]}>
                    {
                        attractionData && attractionData.map((item,i)=>{
                            return <CommonCard attractionData={item} key={i} type={"attraction"}/>
                        })
                    }
                </div>
                <button 
                    onClick={moveLeft}
                    className={`${styles["city__attraction--leftBtn"]} ${styles["city__attraction--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <button 
                    onClick={moveRight}
                    className={`${styles["city__attraction--rightBtn"]} ${styles["city__attraction--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <div className={styles["city__attraction-cardState"]}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

        </section>
        <section className={styles.container}>
            <h2 className={styles["city__attraction-text"]}>
                <span>台北市</span>
                <span>特色活動</span>
            </h2>
            <div className={styles.city__activiry}>
                <div className={styles["city__activiry-card"]}>
                    <CommonCard/>
                    <CommonCard/>
                    <CommonCard/>
                    <CommonCard/>
                    <CommonCard/>
                    <CommonCard/>
                </div>
                <button 
                    onClick={moveLeft}
                    className={`${styles["city__activiry--leftBtn"]} ${styles["city__activiry--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <button 
                    onClick={moveRight}
                    className={`${styles["city__activiry--rightBtn"]} ${styles["city__activiry--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <div className={styles["city__activiry-cardState"]}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </section>
        <section className={styles["city__food-outer"]}>
            <h2 className={styles["city__food-text"]}>
                <span>台北市</span>
                <span>餐飲美食</span>
            </h2>
            <div className={styles.city__food}>
                <div className={styles["city__food-card"]}>
                    <FoodCard/>
                    <FoodCard/>
                    <FoodCard/>
                    <FoodCard/>
                    <FoodCard/>
                    <FoodCard/>
                    <FoodCard/>
                </div>
                <button 
                    onClick={moveLeft}
                    className={`${styles["city__food--leftBtn"]} ${styles["city__food--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <button 
                    onClick={moveRight}
                    className={`${styles["city__food--rightBtn"]} ${styles["city__food--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <div className={styles["city__food-cardState"]}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </section>
        <section className={styles.container}>
            <h2 className={styles["city__accommodation-text"]}>
                <span>台北市</span>
                <span>優質住宿</span>
            </h2>
            <div className={styles.city__accommodation}>
                <div className={styles["city__accommodation-card"]}>
                    <CommonCard/>
                    <CommonCard/>
                    <CommonCard/>
                    <CommonCard/>
                    <CommonCard/>
                    <CommonCard/>
                </div>
                <button 
                    onClick={moveLeft}
                    className={`${styles["city__accommodation--leftBtn"]} ${styles["city__accommodation--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <button 
                    onClick={moveRight}
                    className={`${styles["city__accommodation--rightBtn"]} ${styles["city__accommodation--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <div className={styles["city__accommodation-cardState"]}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </section>
        <Footer/>
        </>

    )
}

export default City;