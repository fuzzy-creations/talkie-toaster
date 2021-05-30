import React, { useState } from 'react';
import styles from '../../sass/parts/HighScoresItem.module.scss';
import { likeScore } from '../../firebase/firebase';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';

function HighScoresItem(props){
    const [liked, setLiked] = useState(false);

    function formatRank(rank){
        if(rank === 1){
            return <><span className={styles.item__leader}><GradeRoundedIcon /></span><span>1st</span></>
        } else if(rank === 2){
            return "2nd"
        } else if(rank === 3){
            return "3rd"
        } else {
            return `${rank}th`
        }
    }

    function likeHandler(){
        const addLike = props.likes + 1;
        setLiked(true)
        if(!liked){
            likeScore(`${props.game}-${props.name}-${props.score}`, addLike)
        }
    }

    function calculateLikesHandler(){
        return liked ? props.likes + 1 : props.likes
    }

    return (
        <div className={styles.item}>
            <span className={styles.item__rank}>{formatRank(props.index + 1)}</span>
            <span className={styles.item__name}>{props.name.toUpperCase()}</span>
            <span className={styles.item__score}>{props.score}</span>
            <span className={styles.item__support}>{calculateLikesHandler()}</span>
            <span className={`${styles.item__icon} ${liked ? styles.item__icon__liked : null}`} onClick={() => likeHandler()}><FavoriteBorderRoundedIcon /></span>
        </div>
    )
}

export default HighScoresItem;