import React from 'react'
import styles from './header.module.scss'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
const Header = () => {
    return (
        <header className={styles.header}>
            <div >
                <img src="/img/LOGO.png" alt="TAIWAN GO LOGO" className={styles.header__logo}/>
            </div> 
            <nav>
                <ul className={styles.header__navList}>
                    <li className={styles["header__navList-item"]}><Link >特色活動</Link></li>
                    <li className={styles["header__navList-item"]}><Link >美食饗宴</Link></li>
                    <li className={styles["header__navList-item"]}><Link >精選住宿</Link></li>
                </ul>
            </nav>
            <div className={styles.header__search}>
                <input type="text" placeholder="搜尋關鍵字..." className={styles["header__search-input"]}/>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles["header__search-icon"]}/>
            </div>

        </header>
    )
}

export default Header;