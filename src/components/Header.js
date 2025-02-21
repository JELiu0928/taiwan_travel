import React, { useEffect, useRef, useState } from 'react'
import styles from './header.module.scss'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import useMedia, { LAYOUT }  from '../hook/useMedia'

const Header = () => {
    const layout = useMedia()
    const navListRef = useRef()
    const searchRef = useRef()
    const [isMenuShowing,setIsMenuShowing] = useState(false)
    const menuIconRef = useRef(null)
    const handleMenuInput = ()=>{
        console.log("hi")
        setIsMenuShowing(menuIconRef.current.checked)
    }
    useEffect(()=>{
        const handleResize = ()=>{
            if(layout !== LAYOUT.SMALL_TAB && layout != LAYOUT.PHONE){
                setIsMenuShowing(false) //漢堡不見時關閉菜單
            }
        }
        window.addEventListener('resize',handleResize)
        return ()=>{
            window.removeEventListener('resize',handleResize)
        }
    })


    return (
        <header className={styles.header} id="header">
            {/* <div className={styles["header__logo-wrap"]}> */}
            <div className={styles.header__zone}>
                <Link to={"/"}>
                    <img src="/img/LOGO.png" alt="TAIWAN GO LOGO" className={styles.header__logo}/>
                </Link>
                {
                    // onClick={showMenu}
                    layout === LAYOUT.SMALL_TAB || layout === LAYOUT.PHONE ? (
                        <div className={styles.header__menu} >
                            <input id="menuIcon" ref={menuIconRef} type='checkbox'
                            className={styles["header__menu--btn"]} onChange={handleMenuInput} />
                            <label htmlFor="menuIcon" className={styles["header__menu--icon"]}><span></span></label>
                        </div>
                        ) : ""
                }
            </div> 
            <div className={`${styles.header__nav} ${isMenuShowing ? styles['header__nav--open']:''}`}>
               {/*  */}
                <nav className={styles["header__navList-wrap"]}  ref={navListRef}>
                    <ul className={styles.header__navList}>
                        <li className={styles["header__navList-item"]}><a href="#">特色活動</a></li>
                        <li className={styles["header__navList-item"]}><a href="#">美食饗宴</a></li>
                        <li className={styles["header__navList-item"]}><a href="#">精選住宿</a></li>
                    </ul>
                </nav>
                <div className={styles.header__search} ref={searchRef} style={{visibility:'hidden'}}>
                    <input type="text" placeholder="搜尋關鍵字..." className={styles["header__search-input"]}/>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles["header__search-icon"]}/>
                </div>
            
            </div>
        </header>
    )
}

export default Header;