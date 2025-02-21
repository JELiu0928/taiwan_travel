import React from 'react'
import styles from './footer.module.scss'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUp} from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div >
                <img src="/img/LOGO_.png" alt="TAIWAN GO LOGO" className={styles.footer__logo}/>
            </div> 
            <nav>
                <ul className={styles.footer__navList}>
                    <li className={styles["footer__navList-item"]}><Link >特色活動</Link></li>
                    <li className={styles["footer__navList-item"]}><Link >美食饗宴</Link></li>
                    <li className={styles["footer__navList-item"]}><Link >精選住宿</Link></li>
                </ul>
            </nav>
            <p className={styles.footer__copyright}>&copy;此網站為練習使用，不做商業用途</p>
            <div className={styles.scrollUP}  onClick={(e) => { document.getElementById("root")?.scrollIntoView({ behavior: "smooth" });}} >
                <FontAwesomeIcon icon={faArrowUp} />
            </div>
        </footer>
    )
}

export default Footer