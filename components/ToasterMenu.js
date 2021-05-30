import React from 'react';
import styles from '../sass/ToasterMenu.module.scss';
import { Link } from 'react-router-dom';


function ToasterMenu(props){
    const options = ["Chat", "Quiz", "ToastOut", "FlappyToast"]

    const menuPart = (option, index) => (
        <div className={`${styles.part} ${option === "FlappyToast" ? styles.unavailable : null}`} onClick={() => props.changeStage(index)}>
            <div className={styles.part__text}>
                {option}
            </div>
        </div>
    )

    return (
        <div className={styles.menu}>
            {/* <div className={styles.menu__header}>Welcome to the menu!</div> */}
            <div className={styles.menu__wrapper}>
            {options.map((option, index) => menuPart(option, index))}
            </div>
            <Link target="_blank" className={styles.menu__scores} to="/highscores">High Scores!</Link>
        </div>
    )
}

export default ToasterMenu;