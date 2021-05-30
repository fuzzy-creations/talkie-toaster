import React, { useState, useEffect } from 'react';
import styles from '../sass/Toaster.module.scss';
import { textQuery, eventQuery, speakQuery } from '../Tools/Queries';
import Talkie from './parts/Talkie';
import Score from './parts/Score'
import Query from './parts/Query';
import Message from './parts/Message';
import Nav from './parts/Nav';

function Toaster(props){
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState("");
    const [toasterScore, setToasterScore] = useState(0);

    const sessionId = props.sessionId;

    useEffect(() => {
        eventQueryHandler("OpeningToast")
    }, [])

    const textQueryHandler = async (text) => { 
        setMessage("*Processing*")
        if(text === "quiz"){return props.changeStage(1)}

        await speakQuery(text, sessionId).then(res => {
            if(res[0]){
                const reply = res[0].content.text[0];
                setMessage(reply)
                if(reply === "It's toast time!"){
                    setToasterScore(toasterScore + 1)
                    setActive(true);
                   setTimeout(() => {
                        eventQueryHandler("OpeningToast")
                        setActive(false)
                   }, 10000)
                }
            }
        })       
     }
 
     const eventQueryHandler = async (event) => {
         await eventQuery(event, sessionId).then(res => {
             console.log(res[0])
             if(res[0]){
                 setMessage(res[0].content.text[0])
             }
         })
         
     }
 
     const messageHandler = (e) => {
         if(e.key === "Enter"){        
             textQueryHandler(e.target.value)
             e.target.value = "";
         }
     }

    const startHandler = () => {
        const status = message;
        setMessage("I'm an AI powered toaster. Please don't touch me there");
        setTimeout(() => {
            setMessage(status)
        }, [1500])
    }

    return (
        <div className={styles.container}>
           <Nav navLinks={props.changeStage} />
            <div className={styles.logo} onClick={() => {
                    window.open('https://www.lucidica.co.uk/');
                }}></div>
            <Score who={"Toaster"} score={toasterScore} />
            <Score who={"You"} score={props.userScore} />
            <Message message={message} />
            <Talkie startHandler={startHandler} active={active} />
            <Query messageHandler={messageHandler} />
        </div>
    )
}

export default Toaster;