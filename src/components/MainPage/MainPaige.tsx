import React, {useState} from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import WineGame from "./components/WineGame/WineGame";
import LosseGame from "./components/LoseGame/LosseGame";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import RulesGame from "./components/RulesGame/RulesGame";
import "./css/MainField.css";

export const customStyle = makeStyles((theme: Theme) => 
    createStyles({
        style : { 
            marginRight: theme.spacing(1),
        }
    })
)

export interface Iround {
    question: string,
    options: Array<option>
}

export interface classes {
    style: string,
}

type option = [string, boolean, number];

type keyPromptName = Exclude<keyof IpromptGame, "lastUsePrompt">

interface IstateGame {
    step: number | null,
    startGame: boolean,
    gain: null| number,
}

interface IpromptGame {
    lastUsePrompt: keyPromptName | null,
    fiftyOnFifty: boolean,
    callFriend: boolean,
    promptHall: boolean,
    unCorrectOption: string| null,
}


export interface handlersAndStyleForWineLosse {
    handlerBtnStartOver: () => void,
    handlerBtnCompleteGame: () => void,
    classes: classes,
}


const ROUNDS: Array<Iround> = [
    {
        question: "Где вперавые нашел применение React ?",
        options: [
            ["В новостной ленте Facebook", true, 100],
            ["В ICQ", false, 0],
            ["World of Tancks", false, 0],
            ["На даче у бабушки Лизы в огороде", false, 0],
        ]
    },
    {
        question: "Имена разработчиков Redax",
        options: [
            ["Фаддея Беллинсгаузена и Михаила Лазарева", false, 0],
            ["Альберт Энштейн", false, 0],
            ["Никола Коперник", false, 0],
            ["Даниилом Абрамовым и Эндрю Кларком.", true, 300],
        ]
    },
    {
        question: "В каких целях исползуют React Native?",
        options: [
            ["Хорошо скоротать время", false, 0],
            ["Для разработки операционных систем", false, 0],
            ["Для разработки мобильных приложений", true, 600],
            ["Для полетов в космос", false, 0],
        ]
    },
]

export default function MainField (): any {
    const [stateGame, setStateGame] = useState <IstateGame>(
        {
            step: 0,
            gain: 0,
            startGame: false,
        })

    const [promptGame, setPromptGame] = useState <IpromptGame> (
        {
            lastUsePrompt: null,
            fiftyOnFifty: false,
            callFriend: false,
            promptHall: false,
            unCorrectOption: null,
        })

    const classes: classes = customStyle()

    const wordForOptions = ["A : ", "B : ", "C : ", "D : ",]

    const listRounds:any = ROUNDS.map(round => {
        return( 
            {
                question: round.question,
                options: round.options.map((option, index) => [wordForOptions[index] + option[0], option[1], option[2]])
            }
        )
    })

    const changeStatePromptGame = (obj: IstateGame): void => {
        setPromptGame(Object.assign({}, promptGame, obj)
        )
    }

    const changeStateGame = (obj: IstateGame): void => {
        setStateGame(Object.assign({}, stateGame, obj)
        )
    }

    const handlerBtnCompleteGame = () => {
        setStateGame(
            {
                step: 0,
                startGame: false,
                gain: null,
            })
    }

    const changeStep = (step: number| null): void => {
        setStateGame(Object.assign({}, stateGame, 
            {
                step: step
            })
        )
    }

    const changeGain = (gain: number) => {
        setStateGame(Object.assign({}, stateGame, 
            {
                gain: gain,
            })
        )
    }

    const changeStartGame = (start: boolean): void => {
        setStateGame(Object.assign({}, stateGame, 
            {
                startGame: start
            })
        )
    }

    const handlerBtnStartOver = (): void => {
        setStateGame(
            {
                step: 0,
                startGame: true,
                gain: 0,
            })
        setPromptGame(
            {
                lastUsePrompt: null,
                fiftyOnFifty: false,
                callFriend: false,
                promptHall: false,
                unCorrectOption: null,
            }
        )
    }

    let forRender;

    if (!stateGame.startGame) {
        forRender = 
                <RulesGame
                    changeStatePromptGame={changeStatePromptGame}
                    promptGame={promptGame}
                    changeStateGame={changeStateGame}
                    startGame={stateGame.startGame}
                    changeStartGame={changeStartGame}
                    listRounds={listRounds}
                    step={stateGame.step}
                />
    } else {
        if (typeof stateGame.step === "number") {
            stateGame.step === listRounds.length ?
                forRender =
                        <WineGame
                            handlerBtnStartOver={handlerBtnStartOver}
                            handlerBtnCompleteGame={handlerBtnCompleteGame}
                            classes={classes}
                        />
                
            :
                forRender =
                        <>
                            <Header
                                changeStatePromptGame={changeStatePromptGame}
                                promptGame={promptGame}
                                changeStateGame={changeStateGame}
                                changeStep={changeStep}
                                startGame={stateGame.startGame}
                                changeStartGame={changeStartGame}
                                listRounds={listRounds}
                                step={stateGame.step}
                            />
                            <Body
                                promptGame={promptGame}
                                changeStep={changeStep}
                                step={stateGame.step}
                                listRounds={listRounds}
                                changeStatePromptGame={changeStatePromptGame}
                                changeGain={changeGain}
                                stateGame={stateGame}
                                changeStateGame={changeStateGame}
                            />
                        </>
                
        } else {
                forRender =
                        <>
                            <LosseGame
                                handlerBtnStartOver={handlerBtnStartOver}
                                handlerBtnCompleteGame={handlerBtnCompleteGame}
                                classes={classes}
                            />
                        </>
        }
    }

    return (
        forRender
    )
}