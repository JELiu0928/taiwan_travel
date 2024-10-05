import React from 'react'
import styles from './footer.module.scss'
import { Link } from 'react-router-dom';

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
        </footer>
    )
}

export default Footer