import React from 'react';
import styles from '../../sass/parts/QuizSelectors.module.scss';

function QuizSelectors(props){

    function correctHandler(index){
        console.log(props.active)
        if(props.active){
            const correct = index === props.answer ? true : false;
            props.optionChosen(correct)
        } else {
            props.optionChosen(index)
        }
    }

    const selections = props.options.map((option, index) => {
        return <div className={styles.selectors__btns} onClick={() => correctHandler(index)}>
                    {option}
                </div>
    })

    return (
        <div className={styles.selectors}>
            {selections}
        </div>
    )
}

export default QuizSelectors;