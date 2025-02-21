import React, { useEffect,useContext,useState, useRef} from 'react'
import Header from './Header';
import styles from './city.module.scss'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay,faCaretDown} from '@fortawesome/free-solid-svg-icons'

import AreaCard from './UI/AreaCard';
import CityChoose from './CityChoose';
import CommonCard from './UI/CommonCard';
import CommonCardLong from './UI/CommonCardLong';
import FoodCard from './UI/FoodCard';
import Footer from './Footer';

import CommonContext from '../store/CommonContext'
import useMedia, { LAYOUT } from '../hook/useMedia'
import useTouchSlide from '../hook/useTouchSlide' //原本自寫的輪播，改Swiper.js
import CardIndicator from './UI/CardIndicator';

// Json Data
import attractionJsonData from '../data/attractionJsonData.json'
import activityJsonData from '../data/activityJsonData.json'
import accommodationJsonData from '../data/accommodationJsonData.json'
import foodJsonData from '../data/foodJsonData.json'

//  Swiper 
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid,Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import 'swiper/css/grid';
import "swiper/css/navigation";
import "swiper/css/pagination";

const City = () => {
    const {selectedArea,setSelectedArea,
        filterJSONAndRandomData,spanIndexActive,
        setSpanIndexActive,
        cityName,setCityName,
        fetchAndRandomDatas} = useContext(CommonContext)
    const layout = useMedia()
    const [cityActivityData,setCityActivityData] = useState([]) 
    const [cityAttractionData,setCityAttractionData] = useState([]) 
    const [cityFoodData,setCityFoodData] = useState([]) 
    const [cityAccommodationData,setCityAccommodationData] = useState([]) 
    // const [cityName,setCityName] = useState({EN:"Taipei",ZH:"台北市"}) 
    const [isSelsctShowing,setIsSelectShowing] = useState(false)
    

    // 台北景點
    // https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity/Taipei?%24top=50&%24format=JSON
    // 台中住宿
    // https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/Taichung?%24top=50&%24format=JSON
   
    useEffect(()=>{
        // JSON版
        // if(attractionTaoyuan){
        //     filterJSONAndRandomData(attraction,setCityAttractionData,0,12)
        // }
        // 線上API (直接fetch)：新北、台中，彰化、雲林、嘉義縣、桃園、高雄正常，台北沒地址很多縣市沒圖片，台南、屏東、金門連江嘉義市沒資料
        fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/${cityName.EN}?%24top=100&%24skip=100&%24format=JSON`,
            setCityAttractionData,0,12,attractionJsonData,cityName.ZH)
        // console.log('cityAttractionData',cityAttractionData)
        // JSON版
        // if(activityJsonData){
        //     filterJSONAndRandomData(activityJsonData,setCityActivityData,0,12)
        //     // console.log('活動資料',cityActivityData)
        // }

        //https://tdx.transportdata.tw/api-service/swagger/basic/cd0226cf-6292-4c35-8a0d-b595f0b15352#/Tourism/TourismApi_Activity_2246
        // 線上API (直接fetch)：高雄只有一筆有圖片
        fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity/${cityName.EN}?%24top=200&%24skip=0&%24format=JSON`,
            setCityActivityData,0,12,activityJsonData,cityName.ZH)
         // fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity/${cityName.EN}?%24top=200&%24skip=0&%24format=JSON`,
        //     setCityActivityData,0,12)

         // JSON版
        // if(foodTaichung){
        //     filterJSONAndRandomData(foodTaichung,setCityFoodData,0,14)
        // }
        // 線上API (直接fetch)：待測試
        fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${cityName.EN}?%24top=100&%24format=JSON`,
            setCityFoodData,0,14,foodJsonData,cityName.ZH)
        // fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${cityName.EN}?%24top=100&%24format=JSON`,
        //     setCityAccommodationData,0,14)

        // JSON版
        // if(accommodationTaichung){
        //     filterJSONAndRandomData(accommodationTaichung,setCityAccommodationData,0,12)
        // }
        // 線上API (直接fetch)：待測試
        // fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/${cityName.EN}?%24top=100&%24skip=500&%24format=JSON`,
        //     setCityAccommodationData,0,12)
        fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/${cityName.EN}?%24top=100&%24skip=500&%24format=JSON`,
            setCityAccommodationData,0,12,accommodationJsonData,cityName.ZH)
  
        
    },[cityName])
    

    const SelectAreaHandler = (area)=>{
        setSelectedArea(area)
    }
    const foodRef = useRef()

    // 景點
    const attractionRef = useRef()
 
    // 活動
    const activityRef = useRef()
   
    // 住宿
    const accommodationRef = useRef()

    const handleSelectShow = ()=>{
        setIsSelectShowing((prevValue)=>!prevValue)
       
    }
    const slideUpRef = useRef([]);
    // slideUpRef && console.log('陣列',slideUpRef)
    useEffect(()=>{
        const observerOption = {threshold:.2}
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                // console.log(entry)
                if(entry.isIntersecting){
                    // console.log(entry.target)
                    entry.target.classList.add(styles['slide-up--show'])
                }
            })
        },observerOption)
        slideUpRef.current.forEach((itemRef)=>{
            observer.observe(itemRef)
        })
        console.log('cityAttractionData?.length ===',cityAttractionData.length)
    },[cityAttractionData,cityActivityData,cityFoodData,cityAccommodationData])
    const addToslideUpRef = (elem)=>{
        if(elem && !slideUpRef.current.includes(elem)){
            slideUpRef.current.push(elem)
        }
    }
    const chooseCity = useRef(null)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const swiperRef = useRef(null);

    // 監聽視窗大小變化
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth); // 更新寬度
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 在寬度變化時觸發更新 Swiper
    useEffect(() => {
        // console.log('current',swiperRef.current)
        if (swiperRef.current) {
            // console.log('update');
            swiperRef.current.swiper.update(); // 強制更新 Swiper
        }
        // console.log(windowWidth);
    }, [windowWidth]); // 每次 windowWidth 變化時更新
    return (
        <>
        <Header/>
        <section className={styles.city} >
            <div className={styles.city__banner}>
                <img src="/img/banner_city.jpg" alt="" />
            </div>
            <div className={styles.city__cityChoose}>
                {layout === LAYOUT.PHONE ? "" : (
                    <div className={`${styles["common__text--city"]} `}>
                        <h3 className={`${styles["common__text-main"]} `}>縣市快選</h3>
                    </div>)
                }
                {layout === LAYOUT.PHONE ? (<>
                    <div className={styles["city__cityCard-select"]}
                        onClick={handleSelectShow}  >
                        <div>{selectedArea.name}</div>
                        <div className={styles["city__cityCard-select__area"]}>
                            <span>{cityName.ZH}</span>
                            <span><FontAwesomeIcon icon={faCaretDown} /></span>
                        </div>
                    </div>
                    
                    <div className={styles.city__cityCard} style={isSelsctShowing ? { 
                        transform: "scaleY(1)",
                        opacity:1,
                        height: "370px",
                        pointerEvents: "auto"
                        } : {pointerEvents: "none"}}>
                    
                        <AreaCard onSelectArea={SelectAreaHandler}/>
                        {/* <CityChoose onGetCityENName={setCityENName} onGetCityZHName={setCityZHName}/> */}
                        <hr />
                        <div className={styles["city__cityCard-chooseCity"]} ref={chooseCity}>
                            {/* <CityChoose onGetCityENName={setCityENName} onGetCityZHName={setCityZHName}/> */}
                            <CityChoose onGetCityName={setCityName} cityName={cityName} setIsSelectShowing={setIsSelectShowing}/>
                        </div>
                    </div>
                </>
                ): 
                <div className={styles.city__cityCard} >
                    <AreaCard onSelectArea={SelectAreaHandler}/>
                    <div className={styles["city__cityCard-chooseCity"]}>
                        <CityChoose onGetCityName={setCityName} cityName={cityName} setIsSelectShowing={setIsSelectShowing}/>
                    </div>
                </div>
                }
            </div>
        </section>
     
        <section className={`${styles.container} ${styles['slide-up']}`} ref={addToslideUpRef}>
            <div className={styles.city__attraction}>
                <h2 className={styles["city__attraction-text"]}>
                    <span>{cityName.ZH}</span>
                    <span>景點介紹</span>
                </h2>
                {cityAttractionData?.length > 0 ? (<>
                    <div className={styles["city__attraction-card--container"]} >
                            <div className={styles["city__attraction-card"]} ref={attractionRef} data-card-type="common" >
                            <Swiper
                                modules={[Grid, Navigation, Pagination]}
                                navigation={{
                                    prevEl: `.prev-attraction`,
                                    nextEl: `.next-attraction`,
                                }}
                                breakpoints={{
                                    1300: {
                                        slidesPerView: 4,
                                        spaceBetween:25 
                                    },
                                    1000: {
                                        slidesPerView: 3, 
                                        spaceBetween:25 
                                    },
                                    480: {
                                        slidesPerView: 2,  
                                        spaceBetween:15 
                                    },
                                    0: {
                                        slidesPerView: 2,  
                                        spaceBetween:10 
                                    },
                                }}
                                pagination={{
                                    el: `.attraction--pagination`,
                                    clickable: true, 
                                    type: 'bullets',
                                }}
                                slidesPerGroup={1}    
                                >
                                {
                                    cityAttractionData.map((item,i)=>(
                                        <SwiperSlide key={i} >
                                            <CommonCardLong cityData={item} data={item} key={i} type={"attraction"} size={'city-large'} />
                                        </SwiperSlide>
                                    )) 
                                }
                            </Swiper>
                        </div>
                    </div>
                    <button className={`prev-attraction ${styles["city__attraction--leftBtn"]} ${styles["city__attraction--btn"]}`}>
                        <FontAwesomeIcon icon={faPlay} /></button>
                    <button className={`next-attraction ${styles["city__attraction--rightBtn"]} ${styles["city__attraction--btn"]}`}>
                        <FontAwesomeIcon icon={faPlay}/></button>
                    <div className={`attraction--pagination ${styles["city__attraction--pagination"]}`}></div>
                    </>):(
                    <div className={styles["city__noData"]} >
                        <img src="../../img/no-data_.png" alt=""  style={{display:'block',width:300}}/>
                    </div>
                )
            }
            </div>
        </section>
        <section  className={`${styles.container} ${styles['slide-up']}`} ref={addToslideUpRef}>
            <div className={styles["city__activity"]}>
                <h2 className={styles["city__attraction-text"]}>
                    <span>{cityName.ZH}</span>
                    <span>特色活動</span>
                </h2>
            {  cityActivityData?.length > 0 ? (<>
                <div className={styles["city__activity-card--container"]}>
                    <div className={styles["city__activity-card"]} ref={activityRef} data-card-type="common" >
                        {
                            cityActivityData.length > 8 ?(
                            <Swiper
                                modules={[Grid, Navigation, Pagination]}
                                navigation={{
                                    prevEl: `.prev-activity`,
                                    nextEl: `.next-activity`,
                                }}
                                grid={{
                                    rows: 2,
                                    fill: "row", 
                                }}
                                pagination={{
                                    el: '.activity--pagination',
                                    clickable: true, 
                                    type: 'bullets',
                                }}
                                breakpoints={{
                                    1300: {
                                        slidesPerView: 4,
                                        spaceBetween:25,
                                        grid:{
                                            rows: 2,
                                            fill: "row", 
                                        }
                                    },
                                    1000: {
                                        slidesPerView: 3, 
                                        spaceBetween:25,
                                        grid:{
                                            rows: 2,
                                            fill: "row", 
                                        }
                                    },
                                    480: {
                                        slidesPerView: 2,  
                                        spaceBetween:15, 
                                        grid:{
                                            rows: 2,
                                            fill: "row", 
                                        }
                                    },
                                    0: {
                                        slidesPerView: 2,  
                                        spaceBetween:10, 
                                        grid:{
                                            rows: 2,
                                            fill: "row", 
                                        }
                                    },
                                }}
                                slidesPerGroup={2}    
                            >
                            {
                                cityActivityData.map((item,i)=>(
                                    <SwiperSlide key={i} >
                                        <CommonCard data={item} key={i} type={`activity_${cityName.EN}`} cityName={cityName} size={'large'}/>
                                    </SwiperSlide>
                                ))
                            }
                            </Swiper>
                            ):(
                                <div className={styles["city__activity-card-2"]}>
                                    {cityActivityData.map((item,i)=>(
                                    // <SwiperSlide key={i} >
                                        <CommonCard key={i} data={item} type={`activity_${cityName.EN}`} cityName={cityName} size={'large'}/>
                                    // </SwiperSlide>
                                    ))}
                                </div>  
                            )
                        }
                        
                    </div>
                </div>
                {cityActivityData.length > 8 ?<>
                
                <button className={`prev-activity ${styles["city__activity--leftBtn"]} ${styles["city__activity--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <button className={`next-activity ${styles["city__activity--rightBtn"]} ${styles["city__activity--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <div className={`activity--pagination ${styles["city__activity--pagination"]}`}></div>
                </>:''}
            </> ):(
                    <div className={styles["city__noData"]} >
                        <img src="../../img/no-data_.png" alt=""  style={{display:'block',width:300}}/>
                    </div>
                )}
            </div>
        </section>
        <section className={`${styles["city__food--outer"]} ${styles['slide-up']}`} ref={addToslideUpRef}>
            <div className={styles.city__food}>
                <h2 className={styles["city__food-text"]}>
                    <span>{cityName.ZH}</span>
                    <span>餐飲美食</span>
                </h2>
            { cityFoodData?.length > 0 ? (<>
                <div className={styles["city__food-card--container"]}>
                    <div className={styles["city__food-card"]} ref={foodRef} data-card-type="food" >
                        <Swiper modules={[Grid, Navigation, Pagination]}
                            navigation={{
                                prevEl: `.prev-food`,
                                nextEl: `.next-food`,
                            }}
                            breakpoints={{
                                1300: {
                                    slidesPerView: 5,
                                    grid:{
                                        rows: 2,
                                        fill: "row", 
                                    }
                                },
                                1000: {
                                    slidesPerView: 4, 
                                    grid:{
                                        rows: 2,
                                        fill: "row", 
                                    }
                                },
                                750: {
                                    slidesPerView: 3,   
                                    grid:{
                                        rows: 2,
                                        fill: "row", 
                                    }
                                },
                                0: {
                                    slidesPerView: 2,  
                                    // spaceBetween:10, 
                                    grid:{
                                        rows: 2,
                                        fill: "row", 
                                    }
                                },
                            }}
                            pagination={{
                                el: '.food--pagination',
                                clickable: true, 
                                type: 'bullets',
                            }}
                            spaceBetween={10}
                            slidesPerGroup={2}    
                        >
                        {
                            cityFoodData.map((item,i)=> (
                                <SwiperSlide key={i} >
                                    <FoodCard foodData={item} key={i} size={'medium'} type={'city-food'}/>
                                </SwiperSlide>
                            ))
                        }
                        </Swiper>
                    </div>
                </div>
                <button 
                    className={`prev-food ${styles["city__food--leftBtn"]} ${styles["city__food--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <button 
                    className={`next-food ${styles["city__food--rightBtn"]} ${styles["city__food--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <div className={`food--pagination ${styles["city__food--pagination"]}`}></div>
                </> ):(
                    <div className={styles["city__noData"]} >
                        <img src="../../img/no-data_.png" alt=""  style={{display:'block',width:300}}/>
                    </div>
                )
            }
            </div>
        </section>
    
        <section className={`${styles.container} ${styles['slide-up']}`} ref={addToslideUpRef}>
            {/* <h2 className={styles["city__accommodation-text"]}> */}
            <div className={styles.city__accommodation}>
                <h2 className={styles["city__attraction-text"]}>
                    <span>{cityName.ZH}</span>
                    <span>優質住宿</span>
                </h2>

            {  cityAccommodationData?.length > 0 ? (<>
                <div className={styles["city__accommodation-card--container"]}>
                    <div className={styles["city__accommodation-card"]} ref={accommodationRef} data-card-type="common" >
                        <Swiper modules={[Grid, Navigation, Pagination]}
                            navigation={{
                                prevEl: `.prev-accommodation`,
                                nextEl: `.next-accommodation`,
                            }}
                            grid={{
                                rows: 2,
                                fill: "row", 
                            }}
                            pagination={{
                                el: '.accommodation--pagination',
                                clickable: true, 
                                type: 'bullets',
                            }}
                            breakpoints={{
                                1300: {
                                    slidesPerView: 4,
                                    spaceBetween:25,
                                    grid:{
                                        rows: 2,
                                        fill: "row", 
                                    }
                                },
                                1000: {
                                    slidesPerView: 3, 
                                    spaceBetween:25,
                                    grid:{
                                        rows: 2,
                                        fill: "row", 
                                    }
                                },
                                480: {
                                    slidesPerView: 2,  
                                    spaceBetween:15, 
                                    grid:{
                                        rows: 2,
                                        fill: "row", 
                                    }
                                },
                                0: {
                                    slidesPerView: 2,  
                                    spaceBetween:10, 
                                    grid:{
                                        rows: 2,
                                        fill: "row", 
                                    }
                                },
                            }}
                            slidesPerGroup={2}    
                        >
                        {
                            cityAccommodationData.map((item,i)=>(
                                <SwiperSlide key={i} >
                                    <CommonCard data={item} key={i} type={"accommodation"}  size={'large'}/>
                                </SwiperSlide>
                            ))
                        }
                        </Swiper>
                    </div>
                </div>
                <button 
                    // onClick={accommodationMoveLeft}
                    className={`prev-accommodation ${styles["city__accommodation--leftBtn"]} ${styles["city__accommodation--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <button 
                    // onClick={accommodationMoveRight}
                    className={`next-accommodation ${styles["city__accommodation--rightBtn"]} ${styles["city__accommodation--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <div className={`accommodation--pagination ${styles["city__accommodation--pagination"]}`}></div>
                </> ):(
                    <div className={styles["city__noData"]} >
                        <img src="../../img/no-data_.png" alt=""  style={{display:'block',width:300}}/>
                    </div>
                )}
            </div>
        </section>
        <Footer/>
        </>

    )
}

export default City;