import React from 'react';
import styles from '../../sass/parts/Talkie.module.scss';

function Talkie(props){
    return (
        <div className={styles.toaster}>
            <div className={`${styles.body} ${props.active ? styles.body__animated : null}`}>
                {/* <div className={styles.logo} onClick={() => {
                    window.open('https://en.wikipedia.org/wiki/Red_Dwarf');
                }}></div> */}
                <div className={`${styles.eye} ${props.active ? styles.eye__animated : null}`}>
                    <div className={`${styles.eye__eyeball} ${props.active ? styles.eye__eyeball__animated : null}`}></div>
                </div>
                <div className={`${styles.eye} ${props.active ? styles.eye__animated : null}`}>
                    <div className={`${styles.eye__eyeball} ${props.active ? styles.eye__eyeball__animated : null}`}></div>
                </div>
                <div className={styles.mouth}></div>
                <div className={styles.switch} onClick={props.startHandler}>
                    <div className={`${styles.switch__handle} ${props.active ? styles.switch__handle__animated : null}`}></div>
                </div>
            </div>
            <div className={styles.base}></div>
            <div className={`${styles.toast} ${props.active ? styles.toast__animated : null}`}></div>
        </div>
    )
}

export default Talkie;