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
import CardIndicator from './UI/CardIndicator';
import Footer from './Footer';

import CommonContext from '../store/CommonContext'
import useTouchSlide from '../hook/useTouchSlide'
import useMedia, { LAYOUT } from '../hook/useMedia'

import activityTaipei from '../data/activity_taipei.json'
import attractionTaoyuan from '../data/attraction_taoyaun.json'
import foodTaichung from '../data/food_taichung.json'
import accommodationTaichung from '../data/accommodation_taichung.json'

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid,Navigation, Pagination } from "swiper/modules";
// 引入 Swiper 的基本樣式
import "swiper/css";
import 'swiper/css/grid';
import "swiper/css/navigation";
import "swiper/css/pagination";

const City = () => {
    const {selectedArea,setSelectedArea,
        filterAndRandomData,spanIndexActive,
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
        // console.log(selectedArea.area)
        // 景點
        // let newAttractionData = [...attractionTaoyuan]
        // newAttractionData.sort(()=> Math.random() - 0.5) // 將一個array作亂數排序
        // // console.log('newAttractionData',newAttractionData)
        // setCityAttractionData(newAttractionData.slice(0,8)) //取六筆
        // // console.log('attractionData',attractionData)

        // // 活動
        // let activityTaipeiData = [...activityTaipei]
        // activityTaipeiData.sort(()=> Math.random() - 0.5) // 將一個array作亂數排序
        // // console.log('newAttractionData',newAttractionData)
        // setCityActivityData(activityTaipeiData.slice(0,8)) 

        // 餐廳
        // let newFoodData = [...foodTaichung]
        // newFoodData.sort(()=>Math.random() - 0.5)
        // setCityFoodData(newFoodData.slice(0,10))

        // let newAccommodationData = [...accommodationDatas]
        // newAccommodationData.sort(()=>Math.random() - 0.5)
        // setAccommodationDatas(newAccommodationData.slice(0,12))
        // 過濾掉沒有照片 並 隨機取筆數顯示
        // function filterAndRandomData(datas,setState,databegin,datapiece){
        //     let filterDatas = datas.filter((item)=> Object.keys(item.Picture).length !== 0)
        //     // console.log('過濾',filterDatas)
        //     let newData = [...filterDatas]
        //     newData.sort(()=>Math.random() - 0.5)
        //     setState(newData.slice(databegin,datapiece))
        // }
         // JSON版
        if(attractionTaoyuan){
            filterAndRandomData(attractionTaoyuan,setCityAttractionData,0,12)
        }
        // 線上API (直接fetch)：新北、台中，彰化、雲林、桃園正常，台北沒地址很多縣市沒圖片
        // fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/${cityName.EN}?%24top=100&%24skip=100&%24format=JSON`,
        //     setCityAttractionData,0,12)

        // JSON版
        if(activityTaipei){
            filterAndRandomData(activityTaipei,setCityActivityData,0,12)
            // console.log('活動資料',cityActivityData)
        }
        // 線上API (直接fetch)：高雄只有一筆有圖片
        // fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity/${cityName.EN}?%24top=200&%24skip=0&%24format=JSON`,
        //     setCityActivityData,0,12)

         // JSON版
        if(foodTaichung){
            filterAndRandomData(foodTaichung,setCityFoodData,0,14)
        }
        // 線上API (直接fetch)：待測試
        // fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${cityName.EN}?%24top=100&%24format=JSON`,
        //     setCityAccommodationData,0,14)

        // JSON版
        if(accommodationTaichung){
            filterAndRandomData(accommodationTaichung,setCityAccommodationData,0,12)
        }
        // 線上API (直接fetch)：待測試
        // fetchAndRandomDatas(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/${cityName.EN}?%24top=100&%24skip=500&%24format=JSON`,
        //     setCityAccommodationData,0,12)
        // console.log('根據縣市變化查API...',cityName.EN)


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
        
    },[cityName])
    // 偏移張數
    const [offsetPiece,setOffsetPiece] = useState(2)
    const [activeCardType, setActiveCardType] = useState("common");
    // const [isFoodCard,setIsFoodCard] = useState(false)

    let cardType;
    const handleWindowWidth = ()=>{
        // console.log("寬度改變了!!!!!!!!!!!!!!",offsetPiece,"==",window.innerWidth)

        if(window.innerWidth >= 1300 ){
            setOffsetPiece(2)
            setSpanIndexActive(0)
            setAttractionOffset(0)
            setFoodCardOffset(0)
            setActivityCardOffset(0)
            setAccommodationCardOffset(0)

        }else if(window.innerWidth < 1300 && window.innerWidth > 750 ){
            setOffsetPiece(4)
            setSpanIndexActive(0)
            setAttractionOffset(0)
            setActivityCardOffset(0)
            setAccommodationCardOffset(0)
        }else if(window.innerWidth < 750){
            // setOffsetPiece(5)
            // console.log("==================我小於750")
            let cardType = foodRef && foodRef.current.getAttribute("data-card-type")
            cardType = "food"

            if(activeCardType == "food"){
                setOffsetPiece(6)
                // console.log("我有執行嗎",foodRef.current.getAttribute("data-card-type"))
                // console.log("===========================我是foodCard",cardType)
            }else if(cardType == "common"){
                setOffsetPiece(5)
                // console.log("==============activeCardType==============我是CommonCard",activeCardType)
                // console.log("===========================我是CommonCard",cardType)
            }else{
                setOffsetPiece(5)
                // console.log("===========================我是else",cardType)

            }
        }
    }
    
    useEffect(()=>{
        handleWindowWidth(); // 初次渲染要先執行讓offsetPiece先符合視窗的數字，才不會在小視窗時初始值
        window.addEventListener("resize", handleWindowWidth);
        return ()=> {
            window.removeEventListener("resize",handleWindowWidth)
        }
    },[offsetPiece,cardType])
    const SelectAreaHandler = (area)=>{
        setSelectedArea(area)
    }

    const [foodCardOffset,setFoodCardOffset] = useState(0)
    const [foodSpanIndexActive,setFoodSpanIndexActive] = useState(0)
    const foodRef = useRef()

    const foodMoveLeft = ()=>{
        moveLeft(foodRef,setFoodCardOffset,20,setFoodSpanIndexActive);
    }
    const foodMoveRight = ()=>{
        moveRight(foodRef,setFoodCardOffset,20,setFoodSpanIndexActive); //不太適用
    }
    useTouchSlide(
        foodRef,
        ()=>moveLeft(foodRef,setFoodCardOffset,20,setFoodSpanIndexActive),
        ()=>moveRight(foodRef,setFoodCardOffset,20,setFoodSpanIndexActive)
    )
    // moveRight 適用 CommonCard
    // moveLeft 適用 CommonCard與FoodCard
    const moveRight = (cardRef,setCardOffest,gap,setSpanIndexActive)=>{
        //  console.log('張數',offsetPiece)
        let cardTransform = cardRef.current.style.transform
        console.log("右cardTransform===>",cardTransform)

        if(cardRef.current){
            let cartWidth = cardRef.current.children[0].offsetWidth + gap
            console.log('寬度*張數-',cartWidth * offsetPiece,`=== translateX(-${cartWidth * offsetPiece}px) `)
            if(cardTransform == `translateX(-${cartWidth * offsetPiece}px)`) {
                // setAccommodationCardOffset((preOffset)=> preOffset)
                setCardOffest((prevOffset)=>  prevOffset = 0 )
                setSpanIndexActive(0)
            }else{
                setCardOffest((prevOffset)=> prevOffset - cartWidth)
                setSpanIndexActive((prevIndex)=> prevIndex + 1)
            }
            setActiveCardType(cardRef == foodRef ? "food" : "common") 

            console.log("右IndexActive===>",spanIndexActive)

        }
    }
    const moveLeft = (cardRef,setCardOffest,gap,setSpanIndexActive)=>{
        let cardTransform = cardRef.current.style.transform
        console.log("左cardTransform===>",cardTransform)
        if(cardRef.current){
            let cartWidth = cardRef.current.children[0].offsetWidth + gap
            if(cardTransform == "translateX(0px)"){
                console.log('我是0')
                setCardOffest(0)
                setSpanIndexActive(0)
            }else{
                setCardOffest((prevOffset)=> prevOffset + cartWidth)
                setSpanIndexActive((prevIndex)=> prevIndex - 1)
            }
                
        }
        setActiveCardType(cardRef == foodRef ? "food" : "common") 
        
        console.log(window.getComputedStyle(accommodationRef.current).getPropertyPriority("left")) 
    }
    // 景點
    const [attractionOffset,setAttractionOffset] = useState(0)
    const [attractionSpanIndexActive,setAttractionSpanIndexActive] = useState(0)
    const attractionRef = useRef()
    const attractionMoveLeft = ()=>{
        moveLeft(attractionRef,setAttractionOffset,25,setAttractionSpanIndexActive)
    }
    const attractionMoveRight = ()=>{
        moveRight(attractionRef,setAttractionOffset,25,setAttractionSpanIndexActive);
    }
    // useTouchSlide: (cardRef: any, moveRight: any, moveLeft: any, threshold?: number)
    // 因為按鍵事件與Touch事件的處理方向相反，這裡就把左右函數反著調用*
    useTouchSlide(
        attractionRef,
        ()=>moveLeft(attractionRef,setAttractionOffset,25,setAttractionSpanIndexActive),
        ()=>moveRight(attractionRef,setAttractionOffset,25,setAttractionSpanIndexActive)
    )
    // 活動
    const [activityCardOffset,setActivityCardOffset] = useState(0)
    const [activitySpanIndexActive,setActivitySpanIndexActive] = useState(0)
    const activityRef = useRef()
    const activityMoveLeft = ()=>{
        moveLeft(activityRef,setActivityCardOffset,25,setActivitySpanIndexActive)
    }
    const activityMoveRight = ()=>{
        // setIsFoodCard(false)
        moveRight(activityRef,setActivityCardOffset,25,setActivitySpanIndexActive);
    }
    useTouchSlide(
        activityRef,
        ()=>moveLeft(activityRef,setActivityCardOffset,25,setActivitySpanIndexActive),
        ()=>moveRight(activityRef,setActivityCardOffset,25,setActivitySpanIndexActive)
    )
    // 住宿
    const [accommodationCardOffset,setAccommodationCardOffset] = useState(0)
    const [accommodationSpanIndexActive,setAccommodationSpanIndexActive] = useState(0)
    const accommodationRef = useRef()
    const accommodationMoveLeft = ()=>{
        moveLeft(accommodationRef,setAccommodationCardOffset,25,setAccommodationSpanIndexActive) 
    }
    const accommodationMoveRight = ()=>{
        moveRight(accommodationRef,setAccommodationCardOffset,25,setAccommodationSpanIndexActive);
    }
    useTouchSlide(
        accommodationRef,
        ()=>moveLeft(accommodationRef,setAccommodationCardOffset,25,setAccommodationSpanIndexActive),
        ()=> moveRight(accommodationRef,setAccommodationCardOffset,25,setAccommodationSpanIndexActive)
    )

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
            // itemRef.classList.add(styles['slide-left--show'])
            observer.observe(itemRef)
        })
        // attractionRef.current && observer.observe(attractionRef.current)
        // activityRef.current && observer.observe(activityRef.current)
        // foodRef.current && observer.observe(foodRef.current)
        // accommodationRef.current && observer.observe(accommodationRef.current)

    },[])
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
        console.log('current',swiperRef.current)
        if (swiperRef.current) {
            console.log('update');
            swiperRef.current.swiper.update(); // 強制更新 Swiper
        }
        console.log(windowWidth);
    }, [windowWidth]); // 每次 windowWidth 變化時更新
    // const [containerStyle,setContainerStyle] = useState({ width: 'calc(29rem *4 + 2.5rem *3 + 3rem)' })
    // // const containerSizeStyles = {
    // //     'city-large4' :  { width: 'calc(29rem *4 + 2.5rem *3 + 3rem)' },//126.5
    // //     'city-large3' :  { width: 'calc(29rem *3 + 2.5rem *2 + 3rem)' }, //95
    // //     'city-large2' :  { width: 'calc(29rem *2 + 1.5rem *1 + 3rem)'}, //62.5
    // //     'city-medium2' :  { width: '25rem *2 + 1.5rem *1 + 3rem)'}, //54.5
    // // };
    // // console.log('layout',layout,'containerStyle',containerStyle)
    // // useEffect(() => {
    // //     if (layout === LAYOUT.MID_DESKTOP) {
    // //         setContainerStyle(containerSizeStyles['city-large3']);
    // //     }else if(layout === LAYOUT.TAB_PORT){
    // //         setContainerStyle(containerSizeStyles['city-large2']);
    // //     }else if(layout === LAYOUT.SMALL_TAB){
    // //         setContainerStyle(containerSizeStyles['city-medium2']);
    // //     }else{
    // //         setContainerStyle(containerSizeStyles['city-large4']);

    // //     }
    // // // 你可以根據需要對其他 layout 進行設定
    // // }, [layout]); // 只有當 layout 改變時才會執行
    // let containerStyle = containerSizeStyles['city-large4']
    // console.log('0000',layout)
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
                        onClick={handleSelectShow}    >
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
                <div className={styles["city__attraction-card--container"]} >
                        {/* <div className={styles["city__attraction-cardOuter"]}> */}
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
                                attractionTaoyuan && cityAttractionData.map((item,i)=>(
                                    <SwiperSlide key={i} >
                                        <CommonCardLong cityData={item} data={item} key={i} type={"attraction"} size={'city-large'} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        </div>

                    {/* </div> */}
                </div>
        
                <button className={`prev-attraction ${styles["city__attraction--leftBtn"]} ${styles["city__attraction--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay} /></button>
                <button className={`next-attraction ${styles["city__attraction--rightBtn"]} ${styles["city__attraction--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <div className={`attraction--pagination ${styles["city__attraction--pagination"]}`}></div>
            </div>
        </section>


        <section className={`${styles.container} ${styles['slide-up']}`} ref={addToslideUpRef}>
            <div className={styles["city__activity"]}>
                <h2 className={styles["city__attraction-text"]}>
                    <span>{cityName.ZH}</span>
                    <span>特色活動</span>
                </h2>
                <div className={styles["city__activity-card--container"]}>
                    <div className={styles["city__activity-card"]} ref={activityRef} data-card-type="common" >
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
                            // spaceBetween={20} 
                            // slidesPerView={4}
                            slidesPerGroup={2}    
                        >
                        {
                            activityTaipei && cityActivityData.map((item,i)=>(
                                <SwiperSlide key={i} >
                                    <CommonCard data={item} key={i} type={`activity_${cityName.EN}`} cityName={cityName} size={'large'}/>
                                </SwiperSlide>
                            ))
                        }
                        </Swiper>
                    </div>
                </div>
                <button className={`prev-activity ${styles["city__activity--leftBtn"]} ${styles["city__activity--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <button className={`next-activity ${styles["city__activity--rightBtn"]} ${styles["city__activity--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <div className={`activity--pagination ${styles["city__activity--pagination"]}`}></div>

                {/* <CardIndicator type={"common"}
                    spanIndexActive={activitySpanIndexActive}
                    setSpanIndexActive={setActivitySpanIndexActive}/> */}
            </div>
        </section>
        <section className={`${styles["city__food--outer"]} ${styles['slide-up']}`} ref={addToslideUpRef}>
                {/* <h2 className={styles["city__food-text"]}> */}
            <div className={styles.city__food}>
                <h2 className={styles["city__food-text"]}>
                    <span>{cityName.ZH}</span>
                    <span>餐飲美食</span>
                </h2>
                <div className={styles["city__food-card--container"]}>
                    <div className={styles["city__food-card"]} ref={foodRef} data-card-type="food" >
                        <Swiper modules={[Grid, Navigation, Pagination]}
                            navigation={{
                                prevEl: `.prev-food`,
                                nextEl: `.next-food`,
                            }}
                            breakpoints={{
                                // 1700: {
                                //     slidesPerView: 5,
                                //     spaceBetween:20,
                                //     grid:{
                                //         rows: 2,
                                //         fill: "row", 
                                //     }
                                // },
                                1300: {
                                    slidesPerView: 5,
                                    // spaceBetween:10,
                                    grid:{
                                        rows: 2,
                                        fill: "row", 
                                    }
                                },
                                1000: {
                                    slidesPerView: 4, 
                                    // spaceBetween:20,
                                    grid:{
                                        rows: 2,
                                        fill: "row", 
                                    }
                                },
                                750: {
                                    slidesPerView: 3,   
                                    // spaceBetween:20, 
                                    grid:{
                                        rows: 2,
                                        fill: "row", 
                                    }
                                },
                                // 750: {
                                //     slidesPerView: 3,   
                                //     // spaceBetween:20, 
                                //     grid:{
                                //         rows: 2,
                                //         fill: "row", 
                                //     }
                                // },
                                0: {
                                    slidesPerView: 2,  
                                    spaceBetween:10, 
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
                             foodTaichung && cityFoodData.map((item,i)=> (
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
            </div>
        </section>
        <section className={`${styles.container} ${styles['slide-up']}`} ref={addToslideUpRef}>
            {/* <h2 className={styles["city__accommodation-text"]}> */}
            <div className={styles.city__accommodation}>
                <h2 className={styles["city__attraction-text"]}>
                    <span>{cityName.ZH}</span>
                    <span>優質住宿</span>
                </h2>
                <div className={styles["city__accommodation-card--container"]}>
                    <div className={styles["city__accommodation-card"]} ref={accommodationRef} data-card-type="common" style={{ transform: `translateX(${accommodationCardOffset}px)`}}>
                    {/* {
                        accommodationTaichung && cityAccommodationData.map((item,i)=>{
                            return <CommonCard data={item} key={i} type={"accommodation"}/>
                        })
                    } */}
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
                             accommodationTaichung && cityAccommodationData.map((item,i)=>(
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

                {/* <CardIndicator type={"common"}
                    spanIndexActive={accommodationSpanIndexActive}
                    setSpanIndexActive={setAccommodationSpanIndexActive}/> */}

            </div>
        </section>
        <Footer/>
        </>

    )
}

export default City;