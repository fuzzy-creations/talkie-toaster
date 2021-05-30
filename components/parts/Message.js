import React from 'react';
import styles from '../../sass/parts/Message.module.scss';

function Message(props){
    return (
        <div className={styles.message}>
            {props.message}
        </div>
    )
}

export default Message;