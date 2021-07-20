import React from "react";
import {Iround} from "../MainField/MainField";
import FiftyOnFiftyIcon from "../../icons/FiftyOnFiftyIcon";
import ReactIcon from "../../icons/ReactIcon";
import PhoneIcon from "../../icons/PhoneIcon";
import CrowdIcon from "../../icons/CrowdIcon";
import "./css/Header.css";

export default function Header(props:any) {
    console.log("round" , props.listRounds);
    console.log("step", props.step)
    const round: Iround = props.listRounds[props.step];

    let generateRandomNumberForOptions = (range:number): number => {
        return Math.floor(Math.random() * range)
    }

    //выборка радномного ответа из числа неправильных
    let randomOption: [string, boolean, number] = round.options.filter((option: [string, boolean, number]): boolean => !option[1])[generateRandomNumberForOptions(3)]

    let handlerBtnOfStartOrEnd = (): void => {
        if (props.startGame) {
            props.changeStateGame(
                {
                    step: 0,
                    startGame: false,
                    gain: 0,
                }
            )

            props.changeStatePromptGame(
                {
                    lastUsePrompt: null,
                    fiftyOnFifty: false,
                    callFriend: false,
                    promptHall: false,
                    unCorrectOption: null,
                })
        } else {
            props.changeStartGame(true);
        }
    }

    let handlerFiftyOnFifty = (): void => {
        props.changeStatePromptGame(
            {
                lastUsePrompt: "fiftyOnFifty",
                fiftyOnFifty: true,
                unCorrectOption: randomOption[0],
            });
    }

    let handlerCallFriend = (): void => {
        props.changeStatePromptGame(
            {
                lastUsePrompt: "callFriend",
                callFriend: true,
            });
    }

    let handlerHelpHall = (): void => {
        props.changeStatePromptGame(
            {
                lastUsePrompt: "promptHall",
                promptHall: true,
            });
    }

    return (
            <header className="header">
                <a
                    href="#"
                    className="header__logo"
                >
                    <ReactIcon/>
                </a>
                <div className="header__btn-block">
                    <div className="header__prompt-block">
                        <button 
                            disabled={props.promptGame.fiftyOnFifty === null || props.promptGame.fiftyOnFifty || !props.startGame? true: false}
                            onClick={handlerFiftyOnFifty}
                            className="header__prompt-btn"
                        >
                            <FiftyOnFiftyIcon/>
                        </button>
                        <button
                            disabled={props.promptGame.callFriend === null || props.promptGame.callFriend || !props.startGame? true: false}
                            onClick={handlerCallFriend}
                            className="header__prompt-btn"
                        >
                            <PhoneIcon/>
                        </button>
                        <button
                            disabled={props.promptGame.promptHall === null || props.promptGame.promptHall || !props.startGame? true: false}
                            onClick={handlerHelpHall}
                            className="header__prompt-btn"
                        >
                            <CrowdIcon/>
                        </button>
                    </div>
                    <button 
                        onClick={handlerBtnOfStartOrEnd}
                        className="header__prompt-btn header__end-game-btn"
                    >
                        {props.startGame? "Завершить игру": "Начать игру"}
                    </button>
                </div>
            </header>
    )
}