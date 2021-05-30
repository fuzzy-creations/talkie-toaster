import React, { useState } from 'react'


function Quiz(props){
    const [stage, setStage] = useState(0);

    const questions = [
        {
            q: "What is my favourite book?", 
            a: ["The Story of a Boy's Hunger by Nigel Slater", "Book 2", "Book 3"]
        },
        {
            q: "Question 2?", 
            a: ["Answer 1", "Answer 2", "Answer 3"]
        }
    ]

    const question = questions[stage].q;
    const answers = questions[stage].a.map(answer => {
        return <span>{answer}</span>
    })

    return (
        <div>
            <div>Ready, steady, toast!</div>
            <div>{question}</div>
            <div>{answers}</div>
        </div>
    )
}

export default Quiz;