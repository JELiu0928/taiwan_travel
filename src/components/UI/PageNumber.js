import React from 'react'
import styles from './pageNumber.module.scss'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
const PageNumber = () => {
    return (
        <>
            <ul className={styles.pageNumber}>
                <li ><button className={`${styles["pageNumber__page"]} ${styles["pageNumber__button"]}`}><FontAwesomeIcon icon={faAngleLeft} /></button></li>
                <li><button className={`${styles["pageNumber__page"]} ${styles["pageNumber__page--active"]}`}>1</button></li>
                <li><button className={`${styles["pageNumber__page"]} `}>2</button></li>
                <li><button className={`${styles["pageNumber__page"]} `}>3</button></li>
                <li><button className={`${styles["pageNumber__page"]} ${styles["pageNumber__button"]}`}><FontAwesomeIcon icon={faAngleRight} /></button></li>
            </ul>
        </>
    )
}

export default PageNumber;