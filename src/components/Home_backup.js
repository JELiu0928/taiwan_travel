import React, { useContext, useEffect,useRef,useState } from 'react'
import styles from './home.module.scss'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass,faPlay} from '@fortawesome/free-solid-svg-icons'
import AreaCard from './UI/AreaCard'
import CommonCard from './UI/CommonCard'
import FoodCard from './UI/FoodCard'
import RegionContext from '../store/CommonContext'
import {regionsAndCities} from '../data/regions'

import { useLocation, useNavigate } from 'react-router-dom'
import activityDatas from '../data/activity01.json'
import foodDatas from '../data/food01.json'
import accommodationDatas from '../data/accommodation01.json'
import useMedia, { LAYOUT }  from '../hook/useMedia'
import useTouchSlide from '../hook/useTouchSlide'

const Home = () => {
    const {selectedArea,setSelectedArea,filterAndRandomData,fetchAndRandomDatas} = useContext(RegionContext)
    const navigate = useNavigate()
    const SelectAreaHandler =(area)=>{
        console.log('area=======>',area)
        setSelectedArea(area)
        let firstCity = regionsAndCities[area.area][0].city
        console.log(firstCity)
        navigate(`/city?area=${area.area}&city=${firstCity}`)
    }
    const location = useLocation()
    const [randomActivity,setRandomActivity] = useState([])     
    const [randomFood,setRandomFood] = useState([]) 
    const [randomAccommodation,setRandomAccommodation] = useState([]) 

    const layout = useMedia()
    // console.log("我是layout",layout,)
   
   
    useEffect(()=>{
        
        if(location.pathname == '/'){
            setSelectedArea('')
        }

        // 活動
        // JSON
        if(activityDatas){
            filterAndRandomData(activityDatas,setRandomActivity,0,6)
        }
        // 線上API(node版)
        // fetchAndRandomDatas("http://localhost:3010/activity",setRandomActivity,0,6)
        // 線上API (直接fetch)
        // fetchAndRandomDatas("https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24top=100&%24skip=300&%24format=JSON",
        //     setRandomActivity,0,10)
        
        // JSON
        if(foodDatas){
            filterAndRandomData(foodDatas,setRandomFood,0,10)
        }
        // 線上API (node版)
        // fetchAndRandomDatas("http://localhost:3010/food",setRandomFood,0,10)
        // 線上API (直接fetch)
        // fetchAndRandomDatas("https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?%24top=50&%24skip=1500&%24format=JSON",
        //     setRandomFood,0,10)

        // 住宿
        // JSON
        if(accommodationDatas){
            filterAndRandomData(accommodationDatas,setRandomAccommodation,0,4)
        }
        // 線上API
        // fetchAndRandomDatas("http://localhost:3010/accommodation",setRandomAccommodation,0,10)
        // fetchAndRandomDatas("https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel?%24top=50&%24skip=1100&%24format=JSON",
        //     setRandomAccommodation,0,4)
        
      
    },[activityDatas])
    const foodRef = useRef()
    const moveLeft = ()=>{
        // let foodCards = document.querySelector(`.${styles["tasty__foodCard-container"]}`);
        // let foodCards = document.querySelector(`.${styles["tasty__foodCard-container--wrap"]}`);
        // console.log(foodCards)
        if(foodRef){
            let cardWidth = foodRef.current.children[0].offsetWidth + 20
            console.log(cardWidth)
            foodRef.current.scrollBy({
                left: -cardWidth
            })

        }
    }
    const moveRight = ()=>{
        // let foodCards = document.querySelector(`.${styles["tasty__foodCard-container"]}`);
        let foodCards = document.querySelector(`.${styles["tasty__foodCard-container--wrap"]}`);
        console.log(foodCards)
        if(foodRef){
            let cardWidth = foodRef.current.children[0].offsetWidth + 20
            // console.log(cardWidth)
            foodRef.current.scrollBy({
                left: +cardWidth
            })

        }
    }
    // useTouchSlide(
    //     foodRef,
    //     moveLeft,
    //     moveRight
    // )
    const activityRef = useRef(null)
    const tastyRef = useRef(null)
    const accommodationRef = useRef(null)
    const [lastscroll,setLastScroll] = useState(0)
    const [showRef,setShowRef] = useState(false)
   
    useEffect(()=>{
        const observerOptions = {threshold:0} //閾值(0-1)
        // Intersection Observer ： web API，交點觀察，預設視窗口與目標物的交點
        const observer = new IntersectionObserver ((entries)=>{
            entries.forEach((entry)=>{
                console.log(entry)  
                // 相交(isIntersecting為true)時
                if(entry.isIntersecting){
                    if(entry.target.classList.contains(styles['slide-up'])){
                        entry.target.classList.add(styles['slide-up--show'])
                    }else if(entry.target.classList.contains(styles['slide-left'])){
                        entry.target.classList.add(styles['slide-left--show'])
                    }
                }
            })
        },observerOptions)
        // observer.observe告訴觀測者指定目標元素是誰
        activityRef.current && observer.observe(activityRef.current)
        tastyRef.current && observer.observe(tastyRef.current)
        accommodationRef.current && observer.observe(accommodationRef.current)

      
    },[])
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
                <div className={` ${styles["cityChoose__text"]}`}>
                    <h3 className={`${styles["common__text-main"]}`}>縣市快選</h3>
                    <span className={`${styles["common__text-sub"]} ${styles["cityChoose__text-sub"]}`}>Choose Cities</span>
                </div>
                <div className={styles.cityChoose__cityCard}>
                    <AreaCard onSelectArea={(area)=>SelectAreaHandler(area)}/>
                </div>
                <img className={styles.cityChoose__icon} src="/img/city_person.png" alt="icon" />
            </div>
            {/* <div className={`${styles["cityChoose__decoration"]} ${styles["cityChoose__decoration-1"]}`}></div> */}
            {/* <div className={`${styles["cityChoose__decoration"]} ${styles["cityChoose__decoration-2"]}`}></div> */}
        </section>
        <section className={styles['slide-up']} ref={activityRef} 
            style={showRef ? { transform:'translateY(0rem)', opacity: 1}:{}}>
                {
                    layout === LAYOUT.BIG_DESKTOP ? (<>
                     <div className={styles.activity}>
                        <div className={styles.activity__card}>
                            {
                                randomActivity && randomActivity.slice(0,3).map((item,i)=>(
                                    <CommonCard data={item} key={i} type={"activity"}/>
                                ))
                            }  
                        </div>
                        <div className={styles.activity__text}>
                            <h3 className={`${styles["common__text-main"]} `}>多久沒有</h3>
                            <h3 className={`${styles["common__text-main"]} `}>出門走走了呢？</h3>
                            <span className={`${styles["common__text-sub"]} ${styles["common__text--getout"]}`}>Let’s get out</span>
                            <div className={styles["activity__btn--wrap"]}>
                                <button className={styles.activity__btn}>更多FUNNY</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.activity__card}>
                        {
                            randomActivity && randomActivity.slice(3,6).map((item,i)=>(
                                <CommonCard data={item} key={i} type={"activity"}/>
                            ))
                        }  
                    </div>
                        </>):(
                            <div className={styles.activity}>
                                <div className={styles.activity__text}>
                                    <h3 className={`${styles["common__text-main"]} `}>多久沒有出門走走了呢？</h3>
                                    <span className={`${styles["common__text-sub"]} ${styles["common__text--getout"]}`}>Let’s get out</span>
                                </div>
                                <div className={styles.activity__card}>
                                    {
                                        randomActivity && randomActivity.slice(0,6).map((item,i)=>(
                                            <CommonCard data={item} key={i} type={"activity"}/>
                                        ))
                                    }  
                                </div>
                                <button className={styles.activity__btn}>更多FUNNY</button>
                            </div>
                        )
                }

        </section>
        <section className={styles.tasty__outer } >
            <div className={`${styles.tasty} ${styles['slide-left']}`} ref={tastyRef}>
                <div className={styles.tasty__text}>
                    <h3 className={`${styles["common__text-main"]} `}>餐飲美食</h3>
                    <span className={`${styles["common__text-sub"]} `}>Tasty</span>
                    {
                        (layout !== LAYOUT.PHONE && layout !== LAYOUT.SMALL_TAB) ? <button className={styles.tasty__btn}>更多美味</button> : ""
                    }
                </div>
                <div>
                    <div className={styles["tasty__foodCard-outer"]}>
                        <div className={styles["tasty__foodCard-container"]}>
                            <div className={styles["tasty__foodCard-container--wrap"]} ref={foodRef}>
                            {
                                randomFood.map((item,i)=> <FoodCard data={item} foodData={item} key={i}/>)
                            }
                            </div>
                        </div>
                        <button onClick={moveLeft}
                            className={`${styles["tasty__foodCard--leftBtn"]} ${styles["tasty__foodCard--btn"]}`}>
                            <FontAwesomeIcon icon={faPlay}/>
                        </button>
                        <button onClick={moveRight}
                            className={`${styles["tasty__foodCard--rightBtn"]} ${styles["tasty__foodCard--btn"]}`}>
                            <FontAwesomeIcon icon={faPlay}/>
                        </button>
                    </div>
                </div>
                {
                   ( layout === LAYOUT.PHONE || layout === LAYOUT.SMALL_TAB) ? <button className={styles.tasty__btn}>更多美味</button> : ""
                }
            </div>
        </section>
        <section className={`${styles.accommodation} ${styles['slide-up']}`} ref={accommodationRef}>
            <div className={`${styles.accommodation__text}`}>
                <h3 className={`${styles["common__text-main"]} `}>精選住宿</h3>
                <span className={`${styles["common__text-sub"]} `}>accommodation</span>
            </div>
            <div className={styles.accommodation__card}>
                {   
                    randomAccommodation.map((item,i)=> <CommonCard data={item} accommodationData={item} key={i} type={"accommodation"}/>)
                }              
            </div>
           
            <div >
                <button className={styles.accommodation__btn}>更多住宿</button>
            </div>
        </section>
        </>
   
    )
}

export default Home;
