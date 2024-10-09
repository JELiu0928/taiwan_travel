import React, { useEffect, useState } from 'react'
import styles from './CommonCard.module.scss'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLocationDot,faPhone} from '@fortawesome/free-solid-svg-icons'

// import activityData from '../../data/activity01.json'
const CommonCard = (props) => {
    const {activityData,type,accommodationData,attractionData,eventData} = props
    // console.log('type',type)
    // const {} = props
    // const [cardType,setCardType] = useState('')
    
    // attractionData && console.log('CommonCard-->attractiondata',attractionData.Images)
    let pic,name,address,city,description,fullAddress,tel;
    let tags = []
    useEffect(()=>{
        

    })
    
    
    switch(type){
        case 'activity':
            pic = activityData ? activityData.Picture.PictureUrl1 : "/img/test.jpg"
            name = activityData ? activityData.ActivityName :"data not found"
            address = activityData ? activityData.Address :"地址未提供"
            if(activityData){
                // console.log('activityData',activityData)
                let arr = Object.entries(activityData) // 將物件的{key:value,key:value}=>[[key:value],[key:value]]
                tags = arr.filter((item)=> item[0].startsWith("Class")) // 篩選出[["class","xxx"],["class2","xxx"]]
                // tags = tags.map(tag=>tag[1])
            }
            city = activityData ? activityData.City :"錯誤"
            break;
        case 'accommodation':
            pic = accommodationData ? accommodationData.Picture.PictureUrl1 : "/img/test.jpg"
            name = accommodationData ? accommodationData.HotelName : "data not found"
            address = accommodationData ? accommodationData.Address :"地址未提供"
            // console.log('accommodationData',accommodationData)
            break;
        case 'attraction':
            pic = attractionData ? attractionData.Images[0].URL : "/img/test.jpg"
            name = attractionData ? attractionData.AttractionName : "data not found"
            fullAddress = attractionData && `${attractionData.PostalAddress.City}${attractionData.PostalAddress.Town}${attractionData.PostalAddress.StreetAddress}`
            address = attractionData ? fullAddress :"地址未提供"
            // console.log('address',address)
            description = attractionData ? attractionData.Description :"未提供描述"
            let textLength = 100
            if(description.length >= textLength){
                description = description.substring(0,textLength) + "..."
            }
            // console.log('accommodationData',accommodationData)
            break;
        case 'event':
            name = eventData ? eventData.EventName : "data not found"
            fullAddress = eventData && `${eventData.PostalAddress.City}${eventData.PostalAddress.Town}${eventData.PostalAddress.StreetAddress}`
            // address = eventData ? fullAddress :"地址未提供"
            tel = eventData ? eventData.Telephones[0].Tel : "Tel not found"
            console.log('tel',tel)
            break;
    }
  
    useEffect(()=>{
        // console.log('CommonCard datas===>',datas)
        // console.log('CommonCard=>',props)
        // console.log(data)
        // console.log(datas.Picture)
        
    })
    return (
        <>
        {/* { cardType === props.type} */}
        <div className={styles.commonCard}>
            <div className={styles.commonCard__img}>
                {/* <img src="/img/test.jpg" alt="" /> */}
                <img src={pic} alt="" />
            </div>
            <div className={styles.commonCard__text}>
                <h3 className={styles["commonCard__text-main"]}>{name}</h3>
                {
                    type === "attraction" ? <p className={styles["commonCard__text-desc"]}>{description}</p> : ''
                }
                {
                    type === "attraction" ? 
                        <span className={styles["commonCard__text-address"]}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            {address}
                        </span> :  <span className={styles["commonCard__text-sub"]}>{address}</span>
                }
                {
                    type === "event" ? 
                        <span className={styles["commonCard__text-address"]}>
                                <FontAwesomeIcon icon={faPhone} />{tel}
                        </span> : 
                        ''
                }
                
            </div>
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
        </div>   
        </>
    )         
    
}

export default CommonCard;
