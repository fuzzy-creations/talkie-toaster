import React from 'react'
import styles from '../../sass/parts/Query.module.scss';

function Query(props){

    return (
        <div className={styles.query}>
            <input className={styles.query__input} type="text" placeholder="Message" onKeyPress={props.messageHandler} />
        </div>
    )

}

export default Query;