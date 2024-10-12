import React, { useContext, useEffect,useState } from 'react'
import styles from './home.module.scss'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faAngleLeft, faAngleRight,faPlay} from '@fortawesome/free-solid-svg-icons'
import CityCard from './UI/CityCard'
import CommonCard from './UI/CommonCard'
import FoodCard from './UI/FoodCard'
import RegionContext from '../store/CommonContext'
import { useLocation, useNavigate } from 'react-router-dom'
import activityDatas from '../data/activity01.json'
import foodDatas from '../data/food01.json'
import accommodationDatas from '../data/accommodation01.json'
// import second from '../data/'

const Home = () => {
    const {selectedArea,setSelectedArea,filterAndRandomData} = useContext(RegionContext)
    const navigate = useNavigate()
    const SelectAreaHandler =(area)=>{
        setSelectedArea(area)
        navigate('/city')
    }
    const location = useLocation()
    const [randomActivity,setRandomActivity] = useState([]) //隨機取3筆顯示
    const [attraction,setAttraction] = useState([]) 
    
    const [randomFood,setRandomFood] = useState([]) //隨機取3筆顯示
    const [randomAccommodation,setRandomAccommodation] = useState([]) //隨機取3筆顯示

    useEffect(()=>{
        // console.log('activityData',activityData)
        if(location.pathname == '/'){
            setSelectedArea('')
        }
        console.log('函數',filterAndRandomData)
        // console.log(location)
        // https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/Taichung?%24top=50&%24format=JSON
        // https://www.shubo.io/javascript-random-shuffle/#%E7%A5%9E%E5%A5%87%E7%9A%84-javascript-%E4%BA%82%E6%95%B8%E6%8E%92%E5%BA%8F%E6%BC%94%E7%AE%97%E6%B3%95
        // 活動
        if(activityDatas){
            filterAndRandomData(activityDatas,setRandomActivity,0,6)

        }
        // let newActivityData = [...activityDatas]
        // newActivityData.sort(()=> Math.random() - 0.5) // 將一個array作亂數排序
        // setRandomActivity(newActivityData.slice(0,6)) //取六筆
        // console.log('activityData',activityData)
        
        if(foodDatas){
            filterAndRandomData(foodDatas,setRandomFood,0,10)
        }
        // 餐廳
        // let newFoodData = [...foodData]
        // newFoodData.sort(()=>Math.random() - 0.5)
        // setRandomFood(newFoodData.slice(0,10))
        // console.log('foodData',foodData)
        if(accommodationDatas){
            filterAndRandomData(accommodationDatas,setRandomAccommodation,0,4)
        }
        // 住宿
        // let newAccommodationData = [...accommodationDatas]
        // newAccommodationData.sort(()=>Math.random() - 0.5)
        // setRandomAccommodation(newAccommodationData.slice(0,4))
        // console.log('accommodationData',accommodationData)

        
        // let baseUrl = "https://tdx.transportdata.tw/api/basic"
        // let randomSkip = Math.floor(Math.random() * 100) //隨機跳過
        // console.log(randomSkip)

        // fetch(`http://localhost:3010/attraction`)
        // .then(res=>res.json())
        // .then((data)=>{
        //     console.log('我是data',data)
        //     setAttraction(data.value)
            
        //     let newAttractionData = [...attraction]
        //     newAttractionData.sort(()=> Math.random() - 0.5) // 將一個array作亂數排序
        //     setAttraction(newAttractionData.slice(0,6)) //取六筆
        //     // console.log('activity',attraction)
        // }).catch((e) => {
        //     console.log('我是err',e)
        // });
    },[activityDatas,attraction])
    const moveLeft = ()=>{
        // let foodCards = document.querySelector(`.${styles["tasty__foodCard-container"]}`);
        let foodCards = document.querySelector(`.${styles["tasty__foodCard-container--wrap"]}`);
        console.log(foodCards)
        if(foodCards){
            let cardWidth = foodCards.children[0].offsetWidth + 20
            console.log(cardWidth)
            foodCards.scrollBy({
                left: cardWidth
            })

        }
    }
    const moveRight = ()=>{
        // let foodCards = document.querySelector(`.${styles["tasty__foodCard-container"]}`);
        let foodCards = document.querySelector(`.${styles["tasty__foodCard-container--wrap"]}`);
        console.log(foodCards)
        if(foodCards){
            let cardWidth = foodCards.children[0].offsetWidth + 20
            // console.log(cardWidth)
            foodCards.scrollBy({
                left: -cardWidth
            })

        }
    }
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
                <CityCard onSelectArea={SelectAreaHandler}/>
                <img className={styles.cityChoose__icon} src="/img/city_person.png" alt="icon" />
            </div>
            <div className={`${styles["cityChoose__decoration"]} ${styles["cityChoose__decoration-1"]}`}></div>
            <div className={`${styles["cityChoose__decoration"]} ${styles["cityChoose__decoration-2"]}`}></div>
        </section>
        <section>
            <div className={styles.festival}>
                {
                    randomActivity && randomActivity.slice(0,3).map((item,i)=>(
                        <CommonCard data={item} key={i} type={"activity"}/>
                    ))
                }  
                {/* {
                    randomActivity && randomActivity.slice(0,3).map((item,i)=>(
                        <CommonCard activityData={item} key={i} type={"activity"}/>
                    ))
                }              */}
                <div className={styles.festival__text}>
                    <h3 className={`${styles["common__text-main"]} `}>多久沒有</h3>
                    <h3 className={`${styles["common__text-main"]} `}>出門走走了呢？</h3>
                    <span className={`${styles["common__text-sub"]} ${styles["common__text--getout"]}`}>Let’s get out</span>
                    <button className={styles.festival__btn}>更多FUNNY</button>
                </div>
            </div>
            <div className={styles.festival}>
                {/* {   randomActivity && randomActivity.slice(3,6).map((item,i)=>(
                        <CommonCard activityData={item} key={i} type={"activity"}/>
                    ))
                } */}
            </div>
        </section>
        <section className={styles.tasty__outer}>
            <div className={styles.tasty}>
                <div className={styles.tasty__text}>
                    <h3 className={`${styles["common__text-main"]} `}>餐飲美食</h3>
                    <span className={`${styles["common__text-sub"]} `}>Tasty</span>
                    <button className={styles.tasty__btn}>更多美味</button>
                </div>
                <div>
                    <div className={styles["tasty__foodCard-outer"]}>
                        <div className={styles["tasty__foodCard-container"]}>
                            <div className={styles["tasty__foodCard-container--wrap"]}>

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
            </div>
        </section>
        <section className={styles.accommodation}>
            <div className={`${styles.common__text} ${styles["common__text--accommodation"]}`}>
                <h3 className={`${styles["common__text-main"]} `}>精選住宿</h3>
                <span className={`${styles["common__text-sub"]} `}>accommodation</span>
            </div>
            <div className={styles.accommodation__card}>
                {   
                    randomAccommodation.map((item,i)=> <CommonCard data={item} accommodationData={item} key={i} type={"accommodation"}/>)
                }              
            </div>
            <div >
                <button className={styles.accommodation__btn}>更多美味</button>
            </div>
        </section>
        </>
   
    )
}

export default Home;
