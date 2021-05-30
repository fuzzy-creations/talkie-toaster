import React, { useState, useEffect } from 'react';
import styles from '../sass/ToasterQuiz.module.scss';
import Talkie from './parts/Talkie';
import Score from './parts/Score'
import QuizSelectors from './parts/QuizSelectors';
import Message from './parts/Message';
import { addNewScore } from '../firebase/firebase';

function Toaster(props){
    const [active, setActive] = useState(false);
    const [userScore, setUserScore] = useState(0);
    const [message, setMessage] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showSelectors, setShowSelectors] = useState(false);
    const [quizActive, setQuizActive] = useState(false)
    const [finishedMenu, setFinishedMenu] = useState(false)
    const [submittingScore, setSubmittingScore] = useState(false);
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        initialTextHandler()
    }, [])

    const questions = [
        {
            q: "When was the first toaster invented?", 
            a: ["50 years ago", "70 years ago", "Over 100 years ago"],
            c: 2
        },
        {
            q: "What's the most widely consumed food in the world?", 
            a: ["Bread", "Bananas", "Pasta"],
            c: 0
        },
        {
            q: "In the Netherlands, what is the most popular toast topping?", 
            a: ["Gravy", "Jelly and cream", "Butter and sprinkles"],
            c: 2
        },
        {
            q: "Most of the bread marketed in the U.S as wheat is actually white bread dyed brown with caramel food colouring", 
            a: ["True", "False", "It's a conspiracy"],
            c: 0
        },
        {
            q: "When buttered bread is right side up and dropped from a table, what are the odds it will fall butter side down?", 
            a: ["50%", "80%", "100%"],
            c: 1
        },
        {
            q: "How long does it take a combine to harvest enough wheat to make 70 loaves of bread?", 
            a: ["10 seconds", "20 seconds", "30 seconds"],
            c: 0
        },
        {
            q: "What is the world record for the fastest time to eat a slice of toast?", 
            a: ["3.88 seconds", "5.53 seconds", "8.47 seconds"],
            c: 2
        },
        {
            q: "In WW2 radtioning laws prohibited the sale of freshly baked bread due to fear of overeating. The bread had to be at least how old before being sold?", 
            a: ["12 hours", "24 hours", "48 hours"],
            c: 1
        },
        {
            q: "Bread goes stale faster in the fridge than at room temperature. How much faster?", 
            a: ["2x", "4x", "6x"],
            c: 2
        },
        {
            q: "What is my favourite book?", 
            a: ["The Hunger Games by Suzanne Collins", "BREAD by Paul Hollywood", "The Story of a Boy's Hunger by Nigel Slater"],
            c: 2
        }
    ]

   function delayedText(text, delay){
        setTimeout(() => {
            setMessage(text)
        }, [delay])
    }

    function initialTextHandler(){
        delayedText("Hello and welcome to ready, steady, toaster!", 5000);
        delayedText("...the quiz", 7000);
        delayedText("Today's contestant is.... you!", 8500)
        delayedText("Here's how it works: you answer 10 questions on a subject of my choice", 10500)
        delayedText("That's it", 13000)
        delayedText("Today's topic is...", 14500)
        delayedText("Toast!", 16000)
        setTimeout(() => {
            initQuizHandler()
        }, [17500])
    }

    function initQuizHandler(){
        setShowSelectors(true)
        setMessage("Are you ready?")
    }

    function readyhandler(answer){
       if(answer === 0){
        startHandler()
       } else {
        props.changeStage(0)
       }
    }


    const startHandler = () => {
        setShowSelectors(false)
        setMessage("Oh boy, here is the first question");
        setTimeout(() => {
            setQuizActive(true)
            setShowSelectors(true)
        }, [2000])
    }

    const clickHandler = () => {
        const a = message;
        setMessage("Stop it");
        setTimeout(() => {
            setMessage(a)
        }, [500])
    }

    function correctHandler(correct){
        setShowSelectors(false)
        if(currentQuestion < 9){
            setMessage("That answer is...")
            if(correct){
                setTimeout(() => {
                    setMessage("CORRECT!")
                    setUserScore(userScore + 1)
                }, 1500)
            } else {
                setTimeout(() => {
                    setMessage("WRONG!")
                }, 1500)
                setTimeout(() => {
                    setMessage(`The correct answer was: ` + questions[currentQuestion].a[questions[currentQuestion].c])
                }, 3000)
            }
            setTimeout(() => {            
                setCurrentQuestion(currentQuestion + 1)
                setMessage(`The next question is...`)
            }, 4500)
            setTimeout(() => {
                setShowSelectors(true)
            }, 5500)
        } else {
            setMessage("That answer is...")
            setTimeout(() => {
                setMessage("CORRECT!")
                setUserScore(userScore + 1)
            }, 1500)
            setTimeout(() => {
                setFinishedMenu(true)
                if(userScore > 6){
                    props.stageStatus()
                }
            }, 3500)
        }
    }


    var selectors = null;
    if(showSelectors){
        if(quizActive){
            selectors = <QuizSelectors options={questions[currentQuestion].a} answer={questions[currentQuestion].c} active={true} optionChosen={correctHandler} />
        } else {
            selectors = <QuizSelectors options={["Yes", "No"]} active={false} optionChosen={readyhandler} /> 
        }
    }

    const submitHandler = () => {
        if(userName.length >= 3 && userName.length <= 10){
           addNewScore(userName, "quiz", userScore).then(() => {
               setError("Success")
           })
        } else {
            setError("Name must be between 3 and 10 characters")
            setTimeout(() => {
                setError("")
            }, [3000])
        }

    }


    const finishedOptions = submittingScore ? (
        <>
        <input className={styles.gameOver__input} type="text" placeholder="Name" onChange={(e) => setUserName(e.target.value)} />
        <div className={styles.gameOver__btn__1} onClick={() => submitHandler()}>Submit</div>
        <div className={styles.gameOver__btn__1} onClick={() => props.changeStage(10)}>Exit</div> 
        {error}
        </>
    ) : (
        <>
        <div className={styles.gameOver__btn__1} onClick={() => setSubmittingScore(true)}>Submit score</div>
        <div className={styles.gameOver__btn__1} onClick={() => props.changeStage(10)}>Exit</div> 
        </>
    )

    const finish = finishedMenu ? (
        <div className={styles.gameOver}>
           <div className={styles.gameOver__text}>Quiz over!</div>
           <div className={styles.gameOver__btn}>
             {finishedOptions}
           </div>
           <div className={styles.gameOver__score}>Score - {userScore}/10</div>
       </div>
       ) : null;
    
    const toasterMessage = showSelectors && quizActive ? <Message message={questions[currentQuestion].q} /> : <Message message={message} />;

    return (
        <div className={styles.container}>
            {finish}
            <div className={styles.stage_floor}></div>
            <div className={styles.stage_highlight}></div>
            <div className={styles.spotlight_swivel}>    
                <div className={styles.lamp}></div>  
                <div className={styles.spotlight}></div>  
            </div>
            <Score who={"Question"} score={currentQuestion + 1} />
            <Score who={"You"} score={userScore} />
            {toasterMessage}
            <Talkie startHandler={clickHandler} active={active} />
                {selectors}
            </div>
    )
}

export default Toaster;