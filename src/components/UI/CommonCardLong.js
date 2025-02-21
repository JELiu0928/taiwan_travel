import React, { useEffect, useState } from 'react'
// import styles from './commonCardLong.module.scss'
import styles from './commonCard.module.scss'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLocationDot,faPhone} from '@fortawesome/free-solid-svg-icons'
import useMedia, { LAYOUT }  from '../../hook/useMedia'
const sizeStyles = {
    'city-large' :  { width: '29rem',minWidth: '29rem', minHeight: '42rem' },
    'city-medium' :  { width: '25rem',minWidth: '25rem', minHeight: '38rem' },
    'city-small' :  { width: '20rem',minWidth: '20rem', minHeight: '22rem' },
    'city-xsmall' :  { width: '18rem',minWidth: '18rem', minHeight: '28.2rem'  },
};



// import activityData from '../../data/activity01.json'
const CommonCardLong = (props) => {
    const layout = useMedia()
    const { data,type,cityName,size = 'large'} = props
    let cardSize = sizeStyles[size] || sizeStyles.large; // 默認為 'medium'
    // console.log('type',type);
    if(layout === LAYOUT.SMALL_TAB && type == 'attraction'){
        cardSize = sizeStyles['city-medium']
    }else if(layout === LAYOUT.PHONE && type == 'attraction'){
        cardSize = sizeStyles['city-small']
    }else if(layout === LAYOUT.SMALL_PHONE){
        cardSize = sizeStyles['city-xsmall']
    }


    let pic,name,address,city,description,fullAddress,tel;
    let tags = []
 
    
    pic = data && (data.Picture.PictureUrl1 || "../../../img/no-photo.png")

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
                    // address = data.Address.replace(data.ZipCode,"") || data.Address  //JSON
                    address = data.Address //fetch
                }
                // console.log('address',address)
                description = data ? (data.DescriptionDetail || data.Description ) : "未提供描述"
               
                // if(layout !== LAYOUT.PHONE || description.length >= 100){
                if(layout == LAYOUT.SMALL_PHONE ){
                    description = description.substring(0,10) + "..." 
                }else if(layout == LAYOUT.PHONE ){
                    description = description.substring(0,30) + "..." 
                }else{
                    description = description.substring(0,100) + "..." 
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
                tel = data ?  data.Phone.replace('886-','0') : "電話未提供"
                // console.log(data.phone)
            
                return (
                    <>
                    <h3 className={styles["commonCard__text-main"]} style={{display:"block", marginBottom:".1rem"}}>{name}</h3>
                    <span className={styles["commonCard__text-sub"]} style={{display:"block", marginBottom:"1.3rem"}} >{address} </span>
                    <span className={styles["commonCard__text-address"]} >
                        <FontAwesomeIcon icon={faPhone} />{tel}
                    </span> 
                    </>
                )
            default:
                return '';
        }
    }
    
    return (
        <>
        <div className={styles.commonCard} style={cardSize}>
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
    
}

export default CommonCardLong;
