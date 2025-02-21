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
// import activityDatas from '../data/activity01.json'
// import foodDatas from '../data/food01.json'
// import accommodationDatas from '../data/accommodation01.json'

import activityJsonData from '../data/activityJsonData.json'
import accommodationJsonData from '../data/accommodationJsonData.json'
import foodJsonData from '../data/foodJsonData.json'


import useMedia, { LAYOUT }  from '../hook/useMedia'
import useTouchSlide from '../hook/useTouchSlide'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// 引入 Swiper 的基本樣式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
    const {selectedArea,setSelectedArea,filterJSONAndRandomData,fetchAndRandomDatas,} = useContext(RegionContext)
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
    // console.log('ss',randomFood)
    const layout = useMedia()
    // console.log("我是layout",layout,)
   
    const [keyword,setKeyword] = useState('')
    useEffect(()=>{
        
        if(location.pathname == '/'){
            setSelectedArea('')
        }

        // 活動
        // JSON
        if(activityJsonData){
            // filterJSONAndRandomData(activityJsonData,setRandomActivity,0,6)
            fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24top=100&%24skip=300&%24format=JSON`,
                setRandomActivity,0,6,activityJsonData)
        }
        // 線上API(node版)
        // fetchAndRandomDatas("http://localhost:3010/activity",setRandomActivity,0,6)
        // 線上API (直接fetch)
        // fetchAndRandomDatas("https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24top=100&%24skip=300&%24format=JSON",
        //     setRandomActivity,0,10)
        
        // JSON
        if(foodJsonData){
            // filterJSONAndRandomData(foodJsonData,setRandomFood,0,10)
            fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?%24top=50&%24skip=1500&%24format=JSON`,
                setRandomFood,0,10,foodJsonData)
        }
        // 線上API (node版)
        // fetchAndRandomDatas("http://localhost:3010/food",setRandomFood,0,10)
        // 線上API (直接fetch)
        // fetchAndRandomDatas("https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?%24top=50&%24skip=1500&%24format=JSON",
        //     setRandomFood,0,10)

        // 住宿
        // JSON
        if(accommodationJsonData){
            // filterJSONAndRandomData(accommodationJsonData,setRandomAccommodation,0,4)
            fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel?%24top=50&%24skip=1100&%24format=JSON`,
                setRandomAccommodation,0,4,accommodationJsonData)
        }
        // 線上API
        // fetchAndRandomDatas("http://localhost:3010/accommodation",setRandomAccommodation,0,10)
        // fetchAndRandomDatas("https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel?%24top=50&%24skip=1100&%24format=JSON",
        //     setRandomAccommodation,0,4)
        
      
    },[activityJsonData])
    const [isNoKeyword,setIsNoKeyword] = useState(false)
    function searchKeyword(keyword){
        if(keyword.trim() == '') return
        console.log("搜尋結果", keyword);
        
        const categories = [
            { data: activityJsonData, setState: setRandomActivity, key: "ActivityName", count: 6 },
            { data: foodJsonData, setState: setRandomFood, key: "RestaurantName", count: 10 },
            { data: accommodationJsonData, setState: setRandomAccommodation, key: "HotelName", count: 4 },
        ];
        // let errorMessage = {}
        categories.forEach(({ data, setState, key, count }) => {
            if (!data) return; 
        
            let filterDatas = data.filter(item => Object.keys(item.Picture).length !== 0);
            filterDatas = filterDatas.filter(item => item[key] && item[key].includes(keyword));
    
            if (filterDatas.length === 0) {
                setIsNoKeyword(true)
                console.log(`類別 ${key} 沒有符合關鍵字的資料`);
                return;
            }
            // 隨機排序後取指定筆數
            let newData = [...filterDatas].sort(() => Math.random() - 0.5).slice(0, count);
    
            setState(newData);
        });
       
    }
  
    const activityRef = useRef(null)
    const tastyRef = useRef(null)
    const accommodationRef = useRef(null)
    const [showRef,setShowRef] = useState(false)
   
    useEffect(()=>{
        const observerOptions = {threshold:0} //閾值(0-1)
        // Intersection Observer ： web API，交點觀察，預設視窗口與目標物的交點
        const observer = new IntersectionObserver ((entries)=>{
            entries.forEach((entry)=>{
                // console.log(entry)  
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

        // console.log(window.innerWidth)
    },[])
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const swiperRef = useRef(null);

    useEffect(()=>{
        if (randomActivity.length > 0 || randomFood.length > 0 || randomAccommodation.length > 0) {
            setIsNoKeyword(false); 
        }
        console.log('IsNoKeywor = ',isNoKeyword)
    },[setIsNoKeyword,randomActivity,randomFood,randomAccommodation])

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
        console.log('current',swiperRef.current)
        if (swiperRef.current) {
            // console.log('update');
            swiperRef.current.swiper?.update(); // 強制更新 Swiper
        }
        // console.log(windowWidth);
    }, [windowWidth]); // 每次 windowWidth 變化時更新

    return (
        <>
        <section className={styles.banner}>
            <h2 className={styles["banner__main-text"]} >想去哪裡玩？</h2>
            <p className={styles["banner__sub-text"]}>這裡共有上千個活動及美食等著你去一同體驗</p>
            <div className={styles.banner__search}>
                <input value={keyword} onChange={(e)=>setKeyword(e.target.value)} type="text" placeholder='12/22新北耶誕嘉年華' className={styles["banner__search-input"]}/>
                <button className={styles["banner__search-btn"]} onClick={()=>searchKeyword(keyword)}>
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
        <section  className={styles['slide-up']} ref={activityRef} 
            style={showRef ? { transform:'translateY(0rem)', opacity: 1}:{}}>
                {
                    layout === LAYOUT.BIG_DESKTOP ? (<>
                     <div className={styles.activity}  >
                        <div className={styles.activity__card}>
                            {
                                (!isNoKeyword && randomActivity.length > 0) ? (
                                    randomActivity.slice(0,3).map((item,i)=>(
                                    <CommonCard data={item} key={i} type={"activity"} size={'large'}/>
                                ))
                                ):(<> 
                                <div></div>
                                <div className={styles["city__noData"]} >
                                    <img src="../../img/no-data_.png" alt=""  style={{display:'block',width:300}}/>
                                </div></>)
                            } 
                        </div>
                        <div className={styles.activity__text} >
                            <h3 className={`${styles["common__text-main"]} `}>多久沒有</h3>
                            <h3 className={`${styles["common__text-main"]} `}>出門走走了呢？</h3>
                            <span className={`${styles["common__text-sub"]} ${styles["common__text--getout"]}`}>Let’s get out</span>
                            <div className={styles["activity__btn--wrap"]}>
                                <a href="/city?area=north&city=YilanCounty" className={styles.activity__btn}>更多FUNNY</a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.activity__card}>
                        {
                            (!isNoKeyword && randomActivity.length > 0) ? randomActivity.slice(3,6).map((item,i)=>(
                                <CommonCard data={item} key={i} type={"activity"}  size={'large'}/>
                            )) : ''
                        }  
                    </div>
                        </>):(
                            <div className={styles.activity} id="activity" >
                                <div className={styles.activity__text}>
                                    <h3 className={`${styles["common__text-main"]} `}>多久沒有出門走走了呢？</h3>
                                    <span className={`${styles["common__text-sub"]} ${styles["common__text--getout"]}`}>Let’s get out</span>
                                </div>
                                {
                                    (!isNoKeyword && randomActivity.length > 0) ? (
                                        <div className={styles.activity__card}>

                                                { 
                                                randomActivity.slice(0,6).map((item,i)=>(
                                                        <CommonCard data={item} key={i} type={"activity"} size={'large'}/>
                                                    ))
                                                }  
                                        </div>
                                    ):( 
                                        <div className={styles["city__noData"]} >
                                            <img src="../../img/no-result.png" alt=""  style={{display:'block',width:300,marginBottom:'6rem'}}/>
                                        </div>
                                    )
                                }  
                                 {/* {
                                        randomActivity && randomActivity.slice(0,6).map((item,i)=>(
                                            <CommonCard data={item} key={i} type={"activity"} size={'medium'}/>
                                        ))
                                    }   */}
                                <a href="/city?area=north&city=YilanCounty" className={styles.activity__btn}>更多FUNNY</a>
                            </div>
                        )
                }

        </section>
        <section className={styles.tasty__outer }  >
            <div className={`${styles.tasty} ${styles['slide-left']}`} ref={tastyRef} >
                <div className={styles.tasty__text}>
                    <div className={styles["tasty__text-inner"]}>
                        <h3 className={`${styles["common__text-main"]} `}>餐飲美食</h3>
                        <span className={`${styles["common__text-sub"]} `}>Tasty</span>
                        {
                            (layout !== LAYOUT.PHONE && layout !== LAYOUT.SMALL_TAB) ? <a href="/city?area=north&city=YilanCounty" className={styles.tasty__btn}>更多美味</a> : ""
                        }
                        {
                            (!isNoKeyword && randomFood.length > 0) ? (<div className={styles["tasty__pagination"]}></div>):''
                        }
                        
                    </div>
                </div>
                {(!isNoKeyword && randomFood.length > 0) ? (
                    <div className={styles["tasty__foodCard-container"]}>
                    {randomFood.length <= 4 ? (
                        <div className={styles["tasty__foodCard-item"]}>
                        
                            {randomFood.map((item, i) => (
                                <FoodCard data={item} foodData={item} type={'home-food'} />
                            ))} 

                        </div>
                        ):( <>
                                <Swiper modules={[Navigation, Pagination]}
                                    navigation={{
                                        nextEl: `.${styles["tasty__foodCard--rightBtn"]}`,
                                        prevEl: `.${styles["tasty__foodCard--leftBtn"]}`,
                                    }}
                                    loop={randomFood.length >=4} 
                                    // slidesPerView="auto"  // 根據卡片的寬度來設置顯示的卡片數量
                                    spaceBetween={20}      // 卡片之間的間距
                                    slidesPerGroup={1}     // 每次滑動一張卡片
                                    observer={true}        // 啟用觀察模式
                                    observeParents={true}  // 觀察父容器變化
                                    ref={swiperRef}
                                    pagination={{
                                        el: `.${styles["tasty__pagination"]}`, // 自定義指示器容器
                                        clickable: false, // 使指示器可點擊
                                        type: 'bullets', // 指示器的顯示方式，這裡使用小圓點（bullets）
                                    }}
                                    onInit={() => {
                                        // 在 Swiper 初始化後強制更新
                                        if (swiperRef.current) {
                                            swiperRef.current.swiper.update();
                                        }
                                    }}
                                    breakpoints={{
                                        1300: {
                                            slidesPerView: 4,  
                                        },
                                        1000: {
                                            slidesPerView: 3,  
                                        },
                                        750: {
                                            slidesPerView: 2,  
                                        },
                                        480: {
                                            slidesPerView: 2,  
                                            spaceBetween:10    
                                        },
                                    }}>
                                    {randomFood.map((item, i) => (
                                        <SwiperSlide key={i} >
                                            <FoodCard data={item} foodData={item} type={'home-food'} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <button className={`${styles["tasty__foodCard--leftBtn"]} ${styles["tasty__foodCard--btn"]}`}>
                                    <FontAwesomeIcon icon={faPlay} />
                                </button>
                                <button className={`${styles["tasty__foodCard--rightBtn"]} ${styles["tasty__foodCard--btn"]}`}>
                                    <FontAwesomeIcon icon={faPlay} />
                                </button>
                            </>)
                    
                    }
                    </div>
                    
                    ):(
                        <div className={styles["city__noData"]} >
                            <img src="../../img/no-result.png" alt="" className={styles.food_noResult}  
                                style={{display:'block',width:300}}/>
                        </div>
                    )
                }

                {
                   ( layout === LAYOUT.PHONE || layout === LAYOUT.SMALL_TAB) ? <a href="/city?area=north&city=YilanCounty" className={styles.tasty__btn}>更多美味</a> : ""
                }
                
            </div>
        </section>
        <section  className={`${styles.accommodation} ${styles['slide-up']}`} ref={accommodationRef}>
            <div className={`${styles.accommodation__text}`}>
                <h3 className={`${styles["common__text-main"]} `}>精選住宿</h3>
                <span className={`${styles["common__text-sub"]} `}>accommodation</span>
            </div>
            {
                (!isNoKeyword && randomAccommodation.length > 0) ? (
                    <div className={styles.accommodation__card}>
                        {   
                            randomAccommodation.map((item,i)=> <CommonCard data={item} accommodationData={item} key={i} type={"accommodation"} size={'large'}/>)
                        }              
                    </div>):(
                    <div className={styles["city__noData"]} >
                        <img src="../../img/no-result.png" alt=""  style={{display:'block',width:300}}/>
                    </div>
                )
           }
            <div>
                <a href="/city?area=north&city=YilanCounty" className={styles.accommodation__btn}>更多住宿</a>
            </div>
        </section>
        
        </>
   
    )
}

export default Home;
