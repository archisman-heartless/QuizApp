import React, { useState } from 'react'
import "./Quiz.css"
import { data } from '../assets/data';

const Quiz = () => {

    const [index,setindex]=useState(0);
    const [Questions,setQuestions]=useState(data[index]);
    const [answered,setanswered]=useState(false);
    const [result,setresult]=useState(false);
    const [score,setscore]=useState(0);

    const checkans=(e,ans)=>{
        if(answered){   
            return;
        }
        const allOptions = document.querySelectorAll("li");
        allOptions.forEach(option => {
            option.style.pointerEvents = "none"; 
        });
        if(Questions.ans===ans){
            e.target.classList.add("correct");
            setscore(score+1);
        }
        else{
            e.target.classList.add("incorrect");
            const correctOption = allOptions[Questions.ans - 1];
            correctOption.classList.add("correct");
        }
        setanswered(true);
    }
    function nextbtn(){
        const newIndex=index+1;
        const allOptions = document.querySelectorAll("li");
        allOptions.forEach(option => {
            option.classList.remove("correct", "incorrect");
            option.style.pointerEvents = "auto";  
        });
        if(answered===true){
            if(index===data.length-1){
                setresult(true);
                return 0;
            }
        }
        if(newIndex<data.length){
            setindex(newIndex);
            setQuestions(data[newIndex]);
            setanswered(false);
        }
        // else{
        //     setindex(0);
        //     setQuestions(data[0]);
        //     setanswered(false);
        // }
    }
    function resetbtn(){
        setindex(0);
        setQuestions(data[0]);
        setanswered(false);
        setscore(0);
        setresult(false);
    }

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr/>
            {result?<></>:<>
                <h2>{index+1}. {Questions.question}</h2>
            <ul>
                <li onClick={(e) => checkans(e, 1)}>{Questions.option1}</li>
                <br />
                <li onClick={(e) => checkans(e, 2)}>{Questions.option2}</li>
                <br />
                <li onClick={(e) => checkans(e, 3)}>{Questions.option3}</li>
                <br />
                <li onClick={(e) => checkans(e, 4)}>{Questions.option4}</li>
            </ul>
            <button onClick={nextbtn}>Next</button>
            <div className='index'>{index+1} of {data.length} Questions</div></>}
            {result?<>
                <h2>You have scored {score} out of {data.length}</h2>
                <button onClick={resetbtn}>Reset Quiz</button></>:<></>}
        </div>
    )
}

export default Quiz
