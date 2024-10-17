import React, { useRef, useState } from 'react'
import styles from './header.module.scss'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import useMedia, { LAYOUT }  from '../hook/useMedia'

const Header = () => {
    const layout = useMedia()
    const navListRef = useRef()
    const searchRef = useRef()
    const [isShowing,setIsShowing] = useState(false)
    const showMenu = ()=>{
        console.log("hi")
        setIsShowing((prevValue)=> !prevValue)
    }
    return (
        <header className={styles.header}>
            {/* <div className={styles["header__logo-wrap"]}> */}
            <div >
                <Link to={"/"}>
                    <img src="/img/LOGO.png" alt="TAIWAN GO LOGO" className={styles.header__logo}/>
                </Link>
            </div> 
            <div className={styles.header__nav} style={isShowing ? { opacity:1,maxHeight:"500px",transform: "scaleY(1)",pointerEvents: "auto"} : {pointerEvents: "none"}}>
               {/*  */}
                <nav className={styles["header__navList-wrap"]}  ref={navListRef}>
                    <ul className={styles.header__navList}>
                        <li className={styles["header__navList-item"]}><Link >特色活動</Link></li>
                        <li className={styles["header__navList-item"]}><Link >美食饗宴</Link></li>
                        <li className={styles["header__navList-item"]}><Link >精選住宿</Link></li>
                    </ul>
                </nav>
                <div className={styles.header__search} ref={searchRef}>
                    <input type="text" placeholder="搜尋關鍵字..." className={styles["header__search-input"]}/>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles["header__search-icon"]}/>
                </div>
            </div>
            {
                layout === LAYOUT.SMALL_TAB || layout === LAYOUT.PHONE ? (
                    <div className={styles["header__menu--btn"]} onClick={showMenu}>
                        <span className={styles["header__menu--icon"]}>&nbsp;</span>
                    </div>) : ""
            }
        </header>
    )
}

export default Header;