import React from "react";
import {Iround} from "../../MainPaige";
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import FiftyOnFiftyIcon from "../../../../icons/FiftyOnFiftyIcon"; 
import ReactIcon from "../../../../icons/ReactIcon";
import PhoneIcon from "../../../../icons/PhoneIcon";
import CrowdIcon from "../../../../icons/CrowdIcon";
import { customStyle } from "../../MainPaige";
import "./css/Header.css";


export default function Header(props:any) {
    const classes = customStyle()

    const round: Iround = props.listRounds[props.step];

    const generateRandomNumberForOptions = (range:number): number => {
        return Math.floor(Math.random() * range)
    }

    //выборка радномного ответа из числа неправильных
    const randomOption: [string, boolean, number] = round.options.filter((option: [string, boolean, number]): boolean => !option[1])[generateRandomNumberForOptions(3)]

    const handlerBtnOfStartOrEnd = (): void => {
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

    const handlerFiftyOnFifty = (): void => {
        props.changeStatePromptGame(
            {
                lastUsePrompt: "fiftyOnFifty",
                fiftyOnFifty: true,
                unCorrectOption: randomOption[0],
            });
    }

    const handlerCallFriend = (): void => {
        props.changeStatePromptGame(
            {
                lastUsePrompt: "callFriend",
                callFriend: true,
            });
    }

    const handlerHelpHall = (): void => {
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
                    <div>
                        <Button
                            className={classes.style}
                            variant="contained"
                            color= "secondary"
                            disabled={props.promptGame.fiftyOnFifty === null || props.promptGame.fiftyOnFifty || !props.startGame? true: false}
                            onClick={handlerFiftyOnFifty}
                        >
                            50 на 50
                       </Button>
                        <Button
                            className={classes.style}
                            variant="contained"
                            color="secondary"
                            disabled={props.promptGame.callFriend === null || props.promptGame.callFriend || !props.startGame? true: false}
                            onClick={handlerCallFriend}
                        >
                            Помощь друга
                        </Button>
                        <Button
                            className={classes.style}
                            variant="contained"
                            color="secondary"
                            disabled={props.promptGame.promptHall === null || props.promptGame.promptHall || !props.startGame? true: false}
                            onClick={handlerHelpHall}
                        >
                            Помощь зала
                        </Button>
                    </div>
                    <Button
                        className={classes.style}
                        variant="contained"
                        color="primary"
                        onClick={handlerBtnOfStartOrEnd}
                    >
                        {props.startGame? "Завершить игру": "Начать игру"}
                    </Button>
                </div>
            </header>
    )
}