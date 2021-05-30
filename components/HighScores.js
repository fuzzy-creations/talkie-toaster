import React, { useState, useEffect } from 'react';
import styles from '../sass/HighScores.module.scss';
import HighScoresItem from './parts/HighScoresItem';
import { getScores } from '../firebase/firebase';


function HighScores(){
    const [scores, setScores] = useState();


    useEffect(() => {
        async function fetchData(){
            const data = await getScores()
            setScores(data)
        }   
        fetchData()
    }, [])

    const quizArray = scores ? scores.filter(score => score.game === "quiz").sort((a, b) => b.score-a.score) : []
    const toastOutArray = scores ? scores.filter(score => score.game === "toastout").sort((a, b) => a.score-b.score) : []
    const flappyToastArray = scores ? scores.filter(score => score.game === "flappytoast").sort((a, b) => b.score-a.score) : []

    const quizScores = quizArray.map((item, index) => <HighScoresItem name={item.name} score={item.score} game={item.game} likes={item.likes} index={index} />).slice(0, 8)
    var toastOutScores = toastOutArray.map((item, index) => <HighScoresItem name={item.name} score={item.score} game={item.game} likes={item.likes} index={index} />).slice(0, 8)
    const flappyToastScores = flappyToastArray.map((item, index) => <HighScoresItem name={item.name} score={item.score} game={item.game} likes={item.likes} index={index} />).slice(0, 8)

    if(toastOutScores.length < 1){
        toastOutScores = <div className={styles.nowinners}>No winners yet</div>
    }


    return (
        <div className={styles.highScores}>
            <div className={styles.highScores__title}>High Scores</div>
            <div className={styles.highScores__container}>
                <h3 className={styles.highScores__catagory__header}>Quiz</h3>
                <div className={styles.highScores__catagory}>
                    <h5 className={styles.highScores__catagory__titles}>
                        <span>Rank</span>
                        <span>Name</span>
                        <span>Score</span>
                        <span>Likes</span>
                        <span></span>
                    </h5>
                    <div className={styles.highScores__catagory__box}>
                        {quizScores}
                    </div>
                </div>
                <h3 className={styles.highScores__catagory__header}>ToastOut</h3>
                <div className={styles.highScores__catagory}>
                <h5 className={styles.highScores__catagory__titles}>
                        <span>Rank</span>
                        <span>Name</span>
                        <span>Score</span>
                        <span>Likes</span>
                        <span></span>
                    </h5>
                    <div className={styles.highScores__catagory__box}>{toastOutScores}</div>
                </div>
                <h3 className={styles.highScores__catagory__header}>FlappyToast</h3>
                <div className={styles.highScores__catagory}>
                <h5 className={styles.highScores__catagory__titles}>
                        <span>Rank</span>
                        <span>Name</span>
                        <span>Score</span>
                        <span>Likes</span>
                        <span></span>
                    </h5>
                    <div className={styles.highScores__catagory__box}>{flappyToastScores}</div>
                </div>          
            </div>
            {/* <div className={styles.btn} onClick={}>Leave</div> */}
        </div>
    )
}


export default HighScores;