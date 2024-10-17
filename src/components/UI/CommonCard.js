import React, { useEffect, useState } from 'react'
import styles from './commonCard.module.scss'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLocationDot,faPhone} from '@fortawesome/free-solid-svg-icons'
import useMedia, { LAYOUT }  from '../../hook/useMedia'


// import activityData from '../../data/activity01.json'
const CommonCard = (props) => {
    const layout = useMedia()
    const { data,activityData,type,accommodationData,attractionData,eventData,cityData,cityName} = props
    // console.log("city====>",cityName)
    // console.log('cityData_type',data && data )
    // const {} = props
    // const [cardType,setCardType] = useState('')
    
    // if(accommodationData){
    //     accommodationData = accommodationData.filter((item)=> item.Picture && item.Picture.length > 0)
    // }
    // attractionData && console.log('CommonCard-->attractiondata',attractionData.Images)
    let pic,name,address,city,description,fullAddress,tel;
    let tags = []
    useEffect(()=>{
        

    })
    
    pic = data ? data.Picture.PictureUrl1 : "/img/test.jpg"
    address = data ? data.Address :"地址未提供"
    const renderContent = ()=>{
        switch(type){
            case 'attraction':
            case `attraction_${cityName && cityName.EN}`:   
                // pic = data ? data.Picture.PictureUrl1 : "/img/test.jpg"
                name = data ? data.ScenicSpotName : "data not found"
                // fullAddress = data && `${data.PostalAddress.City}${data.PostalAddress.Town}${data.PostalAddress.StreetAddress}`
                if(data){
                    // 有的地址含郵遞區號(刪掉)
                    address = data.Address.replace(data.ZipCode,"") || data.Address
                }
                // console.log('address',address)
                description = data ? data.Description :"未提供描述"
               
                if(layout !== LAYOUT.PHONE || description.length >= 100){
                    description = description.substring(0,100) + "..."
                }else{
                    description = description.substring(0,30) + "..."

                }

                return ( <>
                
                <h3 className={styles["commonCard__text-main"]}>{name}</h3>
                <p className={styles["commonCard__text-desc"]}>{description}</p>
                <span className={styles["commonCard__text-address"]} style={{display:"block"}}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    {address} 
                </span>
                </>
                )
                // break;
            case 'activity':
            case `activity_${cityName && cityName.EN}`:    
                name = data ? data.ActivityName || data.ScenicSpotName :"data not found"
                if(data){
                    // console.log('activityData',activityData)
                    let arr = Object.entries(data) // 將物件的{key:value,key:value}=>[[key:value],[key:value]]
                    tags = arr.filter((item)=> item[0].startsWith("Class")) // 篩選出[["class","xxx"],["class2","xxx"]]
                }
                city = data ? data.City :"錯誤"
                return (
                    <>
                    <h3 className={styles["commonCard__text-main"]} style={{display:"block", marginBottom:".1rem"}}>{name }</h3>
                    <span className={styles["commonCard__text-sub"]} >{address} </span>
                    </>
                )
                // break;
            case 'accommodation':
            case `accommodation_${cityName && cityName.EN}`:   
                // pic = data ? data.Picture.PictureUrl1 : "/img/test.jpg"
                name = data ? data.HotelName : "data not found"
                // address = data ? data.Address :"地址未提供"
                tel = data ? data.Phone : "電話未提供"
                // break;
                return (
                    <>
                    <h3 className={styles["commonCard__text-main"]}  style={{display:"block", marginBottom:".1rem"}}>{name}</h3>
                    <span className={styles["commonCard__text-sub"]} style={{display:"block", marginBottom:"1.3rem"}} >{address} </span>
                    <span className={styles["commonCard__text-address"]} >
                                <FontAwesomeIcon icon={faPhone} />{tel}
                        </span> 
                    </>
                )
            

           
        }
    }
    
    
        
    
  
    useEffect(()=>{
        // console.log('CommonCard datas===>',datas)
        // console.log('CommonCard=>',props)
        // console.log(data)
        // console.log(datas.Picture)
        
    })
    return (
        <>
        
        {/* <div className={styles.commonCard} style={type === "attraction" ? {height:"40rem"} : {height:"34.9rem"}} > */}
        <div className={styles.commonCard} >
            <div className={styles.commonCard__img}>
                <img src={pic} alt="" />
            </div>
            <div className={styles.commonCard__text}>
                { renderContent() }
            </div>
            {
                 type.startsWith("activity") ? (
                    <div className={styles["commonCard__tag-zone"]}>
                        <div className={styles["commonCard__tag-zone--keyword"]}>
                            {
                                tags.map( (tag,i) =>{
                                    return (
                                        <span key={i}>{tag[1].slice(0,2)}</span>
                                    )    
                                })
                            }
                            
                        </div>
                        <span className={styles["commonCard__tag-zone--city"]}>{city}</span>
                    </div> 
                ): ""
            }
           
        </div>   
        </>
    )         
    // return (
    //     <>
    //     <div className={styles.commonCard}>
    //         <div className={styles.commonCard__img}>
    //             {/* <img src="/img/test.jpg" alt="" /> */}
    //             <img src={pic} alt="" />
    //         </div>
    //         <div className={styles.commonCard__text}>
    //             <h3 className={styles["commonCard__text-main"]}>{name}</h3>
    //             {
    //                 type === "attraction" ? <p className={styles["commonCard__text-desc"]}>{description}</p> : ''
    //             }
    //             {
    //                 type === "attraction" ? 
    //                     <span className={styles["commonCard__text-address"]} style={{display:"block"}}>
    //                         <FontAwesomeIcon icon={faLocationDot} />
    //                         {address}
    //                     </span> :  <span className={styles["commonCard__text-sub"]} style={{display:"block"}} >{address}</span>
    //             }
    //             {
    //                 type === "accommodation" ? 
    //                     <span className={styles["commonCard__text-address"]} >
    //                             <FontAwesomeIcon icon={faPhone} />{tel}
    //                     </span> : 
    //                     ''
    //             }   
    //         </div>
    //         <div className={styles["commonCard__tag-zone"]}>
    //             <div className={styles["commonCard__tag-zone--keyword"]}>
    //                 {
    //                     tags.map( (tag,i) =>{
    //                         return (
    //                             <span key={i}>{tag[1].slice(0,2)}</span>
    //                         )    
    //                     })
    //                 }
                    
    //             </div>
    //             <span className={styles["commonCard__tag-zone--city"]}>{city}</span>
    //         </div>
    //         <div className={styles["commonCard__tag-zone"]}>
    //             <div className={styles["commonCard__tag-zone--keyword"]}>
    //                 {
    //                     tags.map( (tag,i) =>{
    //                         return (
    //                             <span key={i}>{tag[1].slice(0,2)}</span>
    //                         )    
    //                     })
    //                 }
                    
    //             </div>
    //             <span className={styles["commonCard__tag-zone--city"]}>{city}</span>
    //         </div>
    //     </div>   
    //     </>
    // )         
    
}

export default CommonCard;
