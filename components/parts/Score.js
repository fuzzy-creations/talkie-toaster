import React from 'react';
import styles from '../../sass/parts/Score.module.scss';

function Score(props){

    const place = props.who === "You" ? styles.score2 : styles.score1;
    const menuButton = props.menu ? true : false;

    return (
        <div className={`${place} ${styles.score} ${menuButton ? styles.menu : null}`} onClick={menuButton ? () => props.menu(10) : null}>
            <div className={styles.score__text}>{props.who}</div>
            <div className={styles.score__number}>{props.score}</div>
        </div>
    )
}

export default Score;