import React, { useEffect } from 'react'
import Header from './Header';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'

import styles from './activity.module.scss';
import CommonCard from './UI/CommonCard';
import Footer from './Footer';
import AreaChoose from './AreaChoose';
import PageNumber from './UI/PageNumber';

const Activity = () => {
    const fetchNorth = ()=>{
        fetch("https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/Taipei?%24top=8&%24format=JSON")
        .then(res=>res.json())
        .then((data)=>{
            console.log('我是data',data)
        }).catch((e) => {
            console.log('我是err',e)
        });
    }
    useEffect(()=>{
        // fetchNorth()
    },[])
    
    return (
        <>
        <Header/>
        {/* <div className={styles.container}>  */}
            
        <section className={styles.container }>
            <h2 className={styles.activity__title}>
                <span>特色活動</span>
            </h2>
            <div className={styles.activity__Choose}>
                {/* <div className={styles["activity__Choose-outer"]}> */}

                    <ul className={styles["activity__Choose-area"]}>
                        <li><button onClick={fetchNorth}>北部</button></li>
                        <li><button className={styles["activity__Choose-area--active"]}>中部</button></li>
                        <li><button>南部</button></li>
                        <li><button>東部</button></li>
                        <li><button>離島</button></li>
                    </ul>
                {/* </div> */}
                <div className={styles["activity__Choose-city"]}>
                    <AreaChoose/>
                </div>
            </div>

        </section>
        
        <section className={styles.container}>
            <h2 className={styles["activity__featured-text"]}>
                <span>台北市</span>
                <span>共有
                    <span> 32 </span>
                    個特色活動
                </span>
            </h2>
            <div className={styles["activity__card"]}>
                {/* <CommonCard/>
                <CommonCard/>
                <CommonCard/>
                <CommonCard/>
                <CommonCard/>
                <CommonCard/>
                <CommonCard/>
                <CommonCard/>
                <CommonCard/>
                <CommonCard/>
                <CommonCard/>
                <CommonCard/> */}
            </div>
        </section>
        <div className={styles.activity__page}>
            <PageNumber/>
        </div>
        {/* </div> */}
        <Footer/>
        </>

    )
}

export default Activity;