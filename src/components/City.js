import React, { useEffect,useContext,useState, useRef} from 'react'
import Header from './Header';
import styles from './city.module.scss'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'

import CityCard from './UI/CityCard';
import AreaChoose from './AreaChoose';
import CommonCard from './UI/CommonCard';
import FoodCard from './UI/FoodCard';
import Footer from './Footer';
import RegionContext from '../store/CommonContext'

// import activityData from '../data/activity01.json'
// import foodData from '../data/food01.json'
// import accommodationData from '../data/accommodation01.json'
import attractionDatas from '../data/attraction.json'
// import eventDatas from '../data/event.json'
import activityTaipei from '../data/activity_taipei.json'
import attractionTaoyuan from '../data/attraction_taoyaun.json'
import foodTaichung from '../data/food_taichung.json'
import foodDatas from '../data/food01.json'
import accommodationTaichung from '../data/accommodation_taichung.json'
const City = () => {
    const {selectedArea,setSelectedArea,filterAndRandomData} = useContext(RegionContext)
    
  

    const [cityActivityData,setCityActivityData] = useState([]) 
    const [cityAttractionData,setCityAttractionData] = useState([]) 
    const [cityFoodData,setCityFoodData] = useState([]) 
    const [cityAccommodationData,setCityAccommodationData] = useState([]) 

    const [cityENName,setCityENName] = useState("Taipei") 
    const [cityZHName,setCityZHName] = useState("台北市") 


    // console.log('點選的按鈕cityName',cityENName)
    const [foodData,setFoodData] = useState([]) 
    const [accommodationData,setAccommodationDatas] = useState([]) 
    // console.log('attractionDatas:', attractionDatas);
    // console.log('attractionDatas type:', typeof attractionDatas.value);

    // 台北景點
    // https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity/Taipei?%24top=50&%24format=JSON
    // 台中住宿
    // https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/Taichung?%24top=50&%24format=JSON

    useEffect(()=>{
        // 景點
        // let newAttractionData = [...attractionTaoyuan]
        // newAttractionData.sort(()=> Math.random() - 0.5) // 將一個array作亂數排序
        // // console.log('newAttractionData',newAttractionData)
        // setCityAttractionData(newAttractionData.slice(0,8)) //取六筆
        // // console.log('attractionData',attractionData)

        // let eventData = [...eventDatas.value]
        // eventData.sort(()=> Math.random() - 0.5) // 將一個array作亂數排序
        // // console.log('newAttractionData',newAttractionData)
        // setEventData(eventData.slice(0,8)) 

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
        if(attractionTaoyuan){
            filterAndRandomData(attractionTaoyuan,setCityAttractionData,0,12)
        }
        if(activityTaipei){
            filterAndRandomData(activityTaipei,setCityActivityData,0,12)
            // console.log('活動資料',cityActivityData)
        }
        if(foodTaichung){
            filterAndRandomData(foodTaichung,setCityFoodData,0,14)
        }
        if(accommodationTaichung){
            // let filterDatas = accommodationTaichung.filter((item)=> Object.keys(item.Picture).length > 0)
            // // console.log('過濾',filterDatas)
            // let newAccommodationData = [...filterDatas]
            // newAccommodationData.sort(()=>Math.random() - 0.5)
            // setCityAccommodationData(newAccommodationData.slice(0,12))
            filterAndRandomData(accommodationTaichung,setCityAccommodationData,0,12)
        }



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
    
    const [offsetpiece,setSffsetpiece] = useState(2)
    const handleWindowWidth = ()=>{
        if(window.innerWidth >= 1300 ){
            setSffsetpiece(2)
            setAccommodationCardOffset(preOffset => preOffset = 0) // 讓視窗小變大時不會露出空白
        }else if(window.innerWidth < 1300 && window.innerWidth > 750 ){
            setSffsetpiece(4)
            setAccommodationCardOffset(preOffset => preOffset = 0)
        }else{
            setSffsetpiece(5)
        }
    }
    useEffect(()=>{
        handleWindowWidth(); // 初次渲染要先執行讓offsetpiece先符合視窗的數字，才不會在小視窗時顯示2
        window.addEventListener("resize", handleWindowWidth);
        return ()=> {
            window.removeEventListener("resize",handleWindowWidth)
        }
    },[])
    const SelectAreaHandler = (area)=>{
        setSelectedArea(area)
    }
    // let leftoffset=0
    let cardStateStyle = {"height": "8px",
        "width": "30px",
        "border-radius": "3.7rem",
        "background-color": "#1EB893"}
    // let cardStateStyle = {"width": "8px",
    //     "border-radius": "50%",
    //     "background-color": "#CDCDCD",
    //     "margin": "0 .6rem "}
    const [foodCardOffset,setFoodCardOffset] = useState(0)
    const foodRef = useRef()

    const foodMoveLeft = ()=>{
        moveLeft(foodRef,setFoodCardOffset,20);
    }
    const foodMoveRight = ()=>{
        moveRight(foodRef,setFoodCardOffset,20); //不太適用
    }
    
    // moveRight與moveLeft適用 CommonCard
    const moveRight = (cardRef,setCardOffest,gap)=>{
        //  console.log('張數',offsetpiece)
        let cardTransform = cardRef.current.style.transform
        console.log("右cardTransform===>",cardTransform)

        if(cardRef.current){
            let cartWidth = cardRef.current.children[0].offsetWidth + gap
            // console.log('寬度*張數-',cartWidth * offsetpiece,`=== translateX(-${cartWidth * offsetpiece}px) ===>`,accommodationTransform)
            if(cardTransform == `translateX(-${cartWidth * offsetpiece}px)`) {
                // setAccommodationCardOffset((preOffset)=> preOffset)
                setCardOffest((preOffset)=> preOffset = 0)
            }else{
                setCardOffest((preOffset)=> preOffset - cartWidth)
            }
        }
    }
    const moveLeft = (cardRef,setCardOffest,gap)=>{
        let cardTransform = cardRef.current.style.transform
        console.log("左cardTransform===>",cardTransform)
        if(cardRef.current){
            let cartWidth = cardRef.current.children[0].offsetWidth + gap
            if(cardTransform == "translateX(0px)"){
                console.log('我是0')
                setCardOffest((preOffset)=> preOffset)
            }else{
                setCardOffest((preOffset)=> preOffset + cartWidth)
            }
                
        }
        console.log(window.getComputedStyle(accommodationRef.current).getPropertyPriority("left")) 
    }
    // 住宿
    const [accommodationCardOffset,setAccommodationCardOffset] = useState(0)
    const accommodationRef = useRef()
    const accommodationMoveRight = ()=>{
        moveRight(accommodationRef,setAccommodationCardOffset,25);
    }
    const accommodationMoveLeft = ()=>{
        moveLeft(accommodationRef,setAccommodationCardOffset,25) 
    }
    // 活動
    const [activityCardOffset,setActivityCardOffset] = useState(0)
    const activityRef = useRef()
    const activityMoveLeft = ()=>{
        moveLeft(activityRef,setActivityCardOffset,25)
    }
    const activityMoveRight = ()=>{
        moveRight(activityRef,setActivityCardOffset,25);
    }
    // 景點
    const [attractionOffset,setAttractionOffset] = useState(0)
    const attractionRef = useRef()
    const attractionMoveLeft = ()=>{
        moveLeft(attractionRef,setAttractionOffset,25)
    }
    const attractionMoveRight = ()=>{
        moveRight(attractionRef,setAttractionOffset,25);
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
                        <AreaChoose onGetCityENName={setCityENName} onGetCityZHName={setCityZHName}/>
                    </div>
                </div>
            </div>
        </section>
        <section className={styles.container}>
            <div className={styles.city__attraction}>
                <h2 className={styles["city__attraction-text"]}>
                    <span>{cityZHName}</span>
                    <span>景點介紹</span>

                </h2>
                <div className={styles["city__attraction-card--container"]}>
                    <div className={styles["city__attraction-card"]} ref={attractionRef} style={{ transform: `translateX(${attractionOffset}px)`}}>
                        {
                            attractionTaoyuan && cityAttractionData.map((item,i)=>{
                                return <CommonCard cityData={item} data={item} key={i} type={"attraction"}/>
                            })
                        }
                    </div>
                </div>
                <button 
                    onClick={attractionMoveLeft}
                    className={`${styles["city__attraction--leftBtn"]} ${styles["city__attraction--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <button 
                    onClick={attractionMoveRight}
                    className={`${styles["city__attraction--rightBtn"]} ${styles["city__attraction--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <div className={styles["city__attraction-cardState"]} style={{marginTop:"20px"}}>
                    <span className={styles["city__attraction-cardState--active"]}></span>
                    <span></span>
                    <span></span>
              
                </div>
            </div>
        </section>
        <section className={styles.container}>
            <div className={styles["city__activity"]}>
                <h2 className={styles["city__attraction-text"]}>
                    <span>{cityZHName}</span>
                    <span>特色活動</span>
                </h2>
                <div className={styles["city__activity-card--container"]}>
                    {/* <div className={styles["city__activity-card"]} style={{ transform:`translateX(${activityCardOffset}px)`}}> */}
                    <div className={styles["city__activity-card"]} ref={activityRef} style={{ transform:`translateX(${activityCardOffset}px)`}}>
                        {
                            activityTaipei && cityActivityData.map((item,i)=>{
                                return <CommonCard data={item} key={i} type={`activity_${cityENName}`} cityENName={cityENName}/>
                            })
                        }
                    </div>
                </div>
                <button 
                    onClick={activityMoveLeft}
                    className={`${styles["city__activity--leftBtn"]} ${styles["city__activity--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <button 
                    onClick={activityMoveRight}
                    className={`${styles["city__activity--rightBtn"]} ${styles["city__activity--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <div className={styles["city__activity-cardState"]}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </section>
        <section className={styles["city__food--outer"] }>
                {/* <h2 className={styles["city__food-text"]}> */}
            <div className={styles.city__food}>
                <h2 className={styles["city__food-text"]}>
                    <span>{cityZHName}</span>
                    <span>餐飲美食</span>
                </h2>
                <div className={styles["city__food-card--container"]}>
                    <div className={styles["city__food-card"]} ref={foodRef} style={{ transform: `translateX(${foodCardOffset}px)`}}>
                        {
                            foodTaichung && cityFoodData.map((item,i)=> <FoodCard foodData={item} key={i} />)
                        }
                    </div>
                </div>
                <button 
                    onClick={foodMoveLeft}
                    className={`${styles["city__food--leftBtn"]} ${styles["city__food--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <button 
                    onClick={foodMoveRight}
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
            {/* <h2 className={styles["city__accommodation-text"]}> */}
            <div className={styles.city__accommodation}>
                <h2 className={styles["city__attraction-text"]}>
                    <span>{cityZHName}</span>
                    <span>優質住宿</span>
                </h2>
                <div className={styles["city__accommodation-card--container"]}>
                    <div className={styles["city__accommodation-card"]} ref={accommodationRef} style={{ transform: `translateX(${accommodationCardOffset}px)`}}>
                    {
                        accommodationTaichung && cityAccommodationData.map((item,i)=>{
                            return <CommonCard data={item} key={i} type={"accommodation"}/>
                        })
                    }
                    </div>
                </div>
                <button 
                    onClick={accommodationMoveLeft}
                    className={`${styles["city__accommodation--leftBtn"]} ${styles["city__accommodation--btn"]}`}>
                    <FontAwesomeIcon icon={faPlay}/></button>
                <button 
                    onClick={accommodationMoveRight}
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