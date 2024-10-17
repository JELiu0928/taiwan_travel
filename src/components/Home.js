import React, { useContext, useEffect,useRef,useState } from 'react'
import styles from './home.module.scss'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass,faPlay} from '@fortawesome/free-solid-svg-icons'
import CityCard from './UI/CityCard'
import CommonCard from './UI/CommonCard'
import FoodCard from './UI/FoodCard'
import RegionContext from '../store/CommonContext'
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
        setSelectedArea(area)
        navigate('/city')
    }
    const location = useLocation()
    const [randomActivity,setRandomActivity] = useState([]) 
    const [attraction,setAttraction] = useState([]) 
    
    const [randomFood,setRandomFood] = useState([]) 
    const [randomAccommodation,setRandomAccommodation] = useState([]) 

    const layout = useMedia()
    // console.log("我是layout",layout,)
    const fetchDatas = (fetchUrl,setRandomState)=>{
        fetch(fetchUrl)
        .then(res=>res.json())
        .then(data=>{
            console.log('我是activity_data',data)
            filterAndRandomData(data,setRandomActivity,0,6)
        })
    }
   
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

        
        // JSON
        if(foodDatas){
            filterAndRandomData(foodDatas,setRandomFood,0,10)
        }
        // 線上API (node版)
        // fetchAndRandomDatas("http://localhost:3010/food",setRandomFood,0,10)
        // 線上API (直接fetch)
        fetchAndRandomDatas("https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?%24top=50&%24skip=2000&%24format=JSON",
            setRandomFood,0,10)

        // 住宿
        // JSON
        if(accommodationDatas){
            filterAndRandomData(accommodationDatas,setRandomAccommodation,0,4)
        }
        // 線上API
        // fetchAndRandomDatas("http://localhost:3010/accommodation",setRandomAccommodation,0,10)

        
      
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
                    <CityCard onSelectArea={SelectAreaHandler}/>
                </div>
                <img className={styles.cityChoose__icon} src="/img/city_person.png" alt="icon" />
            </div>
            <div className={`${styles["cityChoose__decoration"]} ${styles["cityChoose__decoration-1"]}`}></div>
            <div className={`${styles["cityChoose__decoration"]} ${styles["cityChoose__decoration-2"]}`}></div>
        </section>
        <section>
            {/* <div className={styles.activity}> */}
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
                            randomActivity && randomActivity.slice(0,3).map((item,i)=>(
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
        <section className={styles.tasty__outer}>
            <div className={styles.tasty}>
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
        <section className={styles.accommodation}>
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
