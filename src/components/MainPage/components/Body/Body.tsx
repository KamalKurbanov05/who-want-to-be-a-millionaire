import React from "react";
import Question from "../Body/components/Question/Question";
import Options from "../Body/components/Options/Options";
import {Iround} from "../../MainPaige";
import "./css/Body.css";


export default function Body(props: any) {
    const round: Iround = props.listRounds[props.step];

    let generateRandomNumberForOptions = (range:number): number => {
        return Math.floor(Math.random() * range)
    }

    //правильный ответ для реализации подсказки 50 на 50
    let correctAnswer: Array<[string, boolean, number]> =  round.options.filter((option: [string, boolean, number], index: number): boolean => option[1])

    let stylesArrPromptHall: Array<string> =
        [
            "twenty-percent",
            "seven-percent",
            "three-percent",
        ]

    return (
        <div className="main">
            <div className="block-cash">
                <h4 className="block-cash__bank">
                    В банке {props.stateGame.gain} руб.
                </h4>
                <div style={{display: "flex", flexDirection: "column-reverse"}} className="money-ladder">
                    {props.listRounds.map((roundOption: Iround) =>
                    roundOption.options.filter((option:[string, boolean, number], index: number) => option[1]).map((option: [string, boolean, number], index:number) => {
                        if (option[0] === correctAnswer[0][0]) {
                            return (
                                <div 
                                    key={index}
                                    className = "block-cash__section-money gain"
                                >
                                    {option[2]} Возможный выйгрыш
                                </div>
                            )
                        } else {
                            return (
                                <div
                                    key={index}
                                    className="block-cash__section-money"
                                >
                                    {option[2]}
                                </div>
                            )
                        }
                    }
                    ))}
                </div>
            </div>
            <div>
                <div
                    className="call-friend"
                    style=
                        {
                            {
                                display: props.promptGame.lastUsePrompt === "callFriend" && props.promptGame.callFriend ? "flex": "none"
                            }
                        }
                >
                    <div className="call-friend__answear">
                        Я думаю, что правильный ответ {correctAnswer[0][0]}
                    </div>
                    <div className="call-friend__img"/>
                </div>
                <div
                    className="prompt-hall"
                    style=
                        {
                            {
                                display: props.promptGame.lastUsePrompt === "promptHall" && props.promptGame.promptHall ? "block" : "none"
                            }
                        }
                >
                    {round.options.map((option: [string, boolean, number], index: number): any => {
                        if (option[1]) {
                            return (
                                <div 
                                    className="prompt-hall__section seventy-percent"
                                    key={index}
                                >
                                    {option[0][0]}
                                </div>
                            )
                        } else {
                            let randNum: number = generateRandomNumberForOptions(stylesArrPromptHall.length)
                            let promptHallSection = stylesArrPromptHall[randNum]
                            stylesArrPromptHall = stylesArrPromptHall.filter((styleName: string) => styleName !== promptHallSection)
                                if (props.promptGame.fiftyOnFifty) {
                                    return (
                                        <div
                                            key={index}
                                            style={{display: index > 0? "none": "block"}}
                                            className="prompt-hall__section thirty-percent"
                                        >
                                            {props.promptGame.unCorrectOption[0]}
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div
                                            style={{display: props.promptGame.fiftyOnFifty? "none": "block"}}
                                            className={"prompt-hall__section " + promptHallSection}
                                            key={index}
                                        >
                                            {option[0][0]}
                                        </div>
                                    )
                                }
                            }
                        }
                        )}
                    <div/>
                </div>
            </div>
            <div className="main__round-block">
                <Question question={round.question}/>
                <ul className="main__option-block">
                    <Options
                        changeGain={props.changeGain}
                        changeStateGame={props.changeStateGame}
                        changeStatePromptGame={props.changeStatePromptGame}
                        promptGame={props.promptGame} 
                        changeStep={props.changeStep} 
                        step={props.step} 
                        options={round.options}
                        correctAnswer={correctAnswer}
                    />
                </ul>
            </div>
        </div>
    )
}