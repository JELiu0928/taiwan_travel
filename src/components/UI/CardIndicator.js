import React, { useState,useEffect, useContext } from 'react'
import styles from './cardIndicator.module.scss'
import CommonContext from '../../store/CommonContext'
// 卡片翻到哪裡
const CardIndicator = (props) => {
    // span的數量
    const [spanCount,setSpanCount] = useState(3)
    const {spanIndexActive,setSpanIndexActive,type} = props
    // console.log('spanIndexActive',spanIndexActive)

    const handleWindowWidth = ()=>{
        if(window.innerWidth >= 1300 ){
            setSpanCount(3)
            setSpanIndexActive((prevIndex)=>Math.min(prevIndex,2))
           
        }else if(window.innerWidth < 1300 && window.innerWidth > 750 ){
            setSpanCount(5)
            setSpanIndexActive((prevIndex)=>Math.min(prevIndex,4))
        }else if(window.innerWidth < 750){ 
            // console.log("寬度 < 750, 準備處理 span count");
            if(type === "food"){
                // console.log("props.type 是 food");
                setSpanCount(7)
                setSpanIndexActive((prevIndex)=>Math.min(prevIndex,6))

            } 
            if(type === "common"){
                // console.log("props.type 不是 food");
                setSpanCount(6)
                setSpanIndexActive((prevIndex)=>Math.min(prevIndex,5))
            }

        }
    }
    useEffect(()=>{
        handleWindowWidth(); // 初次渲染要先執行讓offsetpiece先符合視窗的數字，才不會在小視窗時顯示2
        // console.log("spanCount=>",spanCount,"spanIndexActive=>",spanIndexActive)
        window.addEventListener("resize", handleWindowWidth);
        return ()=> {
            window.removeEventListener("resize",handleWindowWidth)
        }
    },[spanCount])

    return (
        <>
            <div className={styles.cardIndicator} style={{marginTop:"20px"}}>
            {/* <span className={styles["cardIndicator--active"]} ></span> */}
                {
                    [...Array(spanCount)].map((item,i)=>{
                        return <span className={i == spanIndexActive ? styles["cardIndicator--active"] : ""} key={i}></span>
                    })
                }
            </div>
        </>
    )
}

export default CardIndicator;