import React from "react";
import Question from "./components/Question";
import Options from "./components/Options";
import {Iround} from "../MainField"


export default function Body(props: any) {
    const round: Iround = props.listRounds[props.step];
    
    let generateRandomNumberForOptions = (): number => {
        return Math.floor(Math.random() * 3)
    }
    
    console.log("look this" ,round.options.filter((option) => !option[1]))

    let correctAnswer: Array<[string, boolean, number]> =  round.options.filter((option: [string, boolean, number], index: number): boolean => option[1])
    let randomOption: [string, boolean, number] = round.options.filter((option: [string, boolean, number]): boolean => !option[1])[generateRandomNumberForOptions()]
    
    return (
        <>
            <div>
                <div></div>
                <div></div>
            </div>
            <div>
                <Question question={round.question}/>
            </div>
            <ul>
                <Options
                    changeStatePromptGame={props.changeStatePromptGame}
                    promptGame={props.promptGame} 
                    changeStep={props.changeStep} 
                    step={props.step} 
                    options={round.options}
                    correctAnswer={correctAnswer}
                    randomOption={randomOption}
                />
            </ul>
        </>
    )
}