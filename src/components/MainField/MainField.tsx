import React, {useState} from "react";
import Header from "../Header/Header";
import Body from "../Body/Body";
import "./css/MainField.css"
import FiftyOnFiftyIcon from "../../icons/FiftyOnFiftyIcon";
import PhoneIcon from "../../icons/PhoneIcon";
import CrowdIcon from "../../icons/CrowdIcon";
import ReactIcon from "../../icons/ReactIcon";

export interface Iround {
    question: string,
    options: [
        [string, boolean, number],
        [string, boolean, number],
        [string, boolean, number],
        [string, boolean, number],
    ]
}

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

type keyPromptName = Exclude<keyof IpromptGame, "lastUsePrompt">

const ROUNDS: Array<Iround> = [
    {
        question: "Продолжите знаменитое высказывание Дагестанского философа: Ты что за лев ...",
        options: [
            ["Вац", true, 100],
            ["Николаевич Толстой", false, 0],
            ["Лещенко", false, 0],
            ["с семейства кошачих", false, 0],
        ]
    },
    {
        question: "В каком городе можно заняться серфингом прямо на улицах города после дождя?",
        options: [
            ["Москва", false, 0],
            ["Шриланка", false, 0],
            ["Венеция", false, 0],
            ["Махачкала", true, 300],
        ]
    },
    {
        question: "Какой из пречисленных ниже живых организмов размножается путем Почкования?",
        options: [
            ["Амеба", false, 0],
            ["Чины берущие откат", false, 0],
            ["Дрожжи", true, 600],
            ["Абубандиты и нефоры в Даге", false, 0],
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

    console.log("stateGame" ,stateGame);
    console.log("stateGame" ,promptGame);

    const wordForOptions = ["A : ", "B : ", "C : ", "D : ",]

    const listRounds:any = ROUNDS.map(round => {
        return( 
            {
                question: round.question,
                options: round.options.map((option, index) => [wordForOptions[index] + option[0], option[1], option[2]])
            }
        )
    })

    console.log("ACTUAL listRounds", listRounds)

    let changeStatePromptGame = (obj: object): void => {
        setPromptGame(Object.assign({}, promptGame, obj)
        )
    }

    let changeStateGame = (obj: IstateGame): void => {
        setStateGame(Object.assign({}, stateGame, obj)
        )
    }

    let handlerBtnCompleteGame = () => {
        setStateGame(
            {
                step: 0,
                startGame: false,
                gain: null,
            })
    }

    let changeStep = (step: number| null): void => {
        setStateGame(Object.assign({}, stateGame, 
            {
                step: step
            })
        )
    }

    let changeGain = (gain: number) => {
        setStateGame(Object.assign({}, stateGame, 
            {
                gain: gain,
            })
        )
    }

    let changeStartGame = (start: boolean): void => {
        setStateGame(Object.assign({}, stateGame, 
            {
                startGame: start
            })
        )
    }

    let handlerBtnStartOver = (): void => {
        changeStep(0);
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

    console.log(promptGame)
    console.log(stateGame)

    if (!stateGame.startGame) {
        return (
            <>
                <header>
                    <Header
                        changeStatePromptGame={changeStatePromptGame} 
                        promptGame={promptGame} 
                        changeStateGame={changeStateGame} 
                        startGame={stateGame.startGame} 
                        changeStartGame={changeStartGame}
                        listRounds={listRounds}
                        step={stateGame.step}
                    />
                </header>
                <main className="main">
                    <div className="rules-block-about-prompt">
                        <h4 className="notification">Подсказки</h4>
                        <label className="rules-block-about-prompt__label">
                            <FiftyOnFiftyIcon/>
                                        -- Оставляет два варианта ответа, один из которых правильный
                                </label>
                            <label className="rules-block-about-prompt__label">
                                <PhoneIcon/>
                                -- Вы можете получить ответ от самго Дэна Обрамова
                            </label>
                            <label className="rules-block-about-prompt__label">
                                <CrowdIcon/>
                                -- Помощь зала всегда будет кстати
                            </label>
                        </div>
                </main>
            </>
        )
    } else {
        if (typeof stateGame.step === "number") {
            if (stateGame.step === listRounds.length) {
                return(
                    <>
                        <header className="header">
                            <a
                                href="#"
                                className="header__logo"
                            > 
                                <ReactIcon/>
                            </a>
                        </header>
                        <main className="main">
                            <h2 className="notification">Вы победили )</h2>
                            <div className="btn-block">
                                <button 
                                    onClick={handlerBtnStartOver}
                                    className="btn"
                                >
                                    Начать заново
                                </button>
                                <button 
                                    onClick={handlerBtnCompleteGame}
                                    className="btn"
                                >
                                    Завершить игру
                                </button>
                            </div>
                        </main>
                    </>
                )
            } else {
                return(
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
                )
            }
        } else {
            return (
                <>
                    <header className="header">
                        <a
                            href="#"
                            className="header__logo"
                        > 
                        <svg xmlns="http://www.w3.org/2000/svg"
                            id="Layer_1" 
                            data-name="Layer 1" 
                            viewBox="0 0 107.6 122.88"
                            fill="#61dafb"
                            height="8vh"
                        >
                                <title>core-values</title>
                                <path d="M53.8,0c7.76,0,14.55,7.23,19.26,18.92.56,1.4,1.1,2.88,1.61,4.41q2.35-.6,4.59-1c12.37-2.33,22.12-.49,26.3,6.05s1.75,16.15-5.56,26.4a81.46,81.46,0,0,1-5.48,6.82A80.84,80.84,0,0,1,100,68.44c7.24,10.3,9.6,19.93,5.38,26.45s-14,8.27-26.34,5.86c-1.43-.28-2.89-.62-4.39-1-.49,1.46-1,2.87-1.54,4.21-4.71,11.69-11.5,18.92-19.26,18.92S39.25,115.65,34.54,104c-.56-1.4-1.1-2.88-1.61-4.41q-2.36.6-4.59,1c-12.37,2.33-22.12.49-26.3-6S.29,78.37,7.6,68.12a79.48,79.48,0,0,1,5.48-6.82,80.84,80.84,0,0,1-5.43-6.86C.41,44.14-2,34.51,2.27,28s14-8.27,26.34-5.86c1.43.28,2.89.62,4.39,1,.49-1.46,1-2.87,1.54-4.21C39.25,7.23,46,0,53.8,0Zm-.14,55.8c1.8-1.87,3.06-3.49,5.83-3.81,5.21-.6,10,4.73,7.36,10-1.7,3.4-6.5,7.47-9.28,10.23l-3.91,3.87L50.44,73C46.55,69.21,40.22,64.5,40,58.67,39.86,54.58,43.09,52,46.8,52c3.31.05,4.7,1.69,6.86,3.79Zm37.07,9.79A123.59,123.59,0,0,1,79.51,75.5a120.11,120.11,0,0,1-3.33,19c1.31.33,2.6.63,3.86.87,10.11,2,17.81,1,20.69-3.45s.65-11.87-5.27-20.3a72.83,72.83,0,0,0-4.73-6Zm-73.86-8.3a123.59,123.59,0,0,1,11.22-9.91,120.11,120.11,0,0,1,3.33-19c-1.31-.33-2.6-.63-3.86-.87-10.11-2-17.81-1-20.69,3.45s-.65,11.87,5.27,20.3a72.83,72.83,0,0,0,4.73,6ZM69.33,98.2a116.42,116.42,0,0,1-15.64-6.48A116.73,116.73,0,0,1,38.21,98c.45,1.36.93,2.66,1.43,3.9,3.84,9.55,8.87,15.46,14.16,15.46S64.12,111.47,68,101.92c.48-1.19.94-2.43,1.37-3.72Zm-21.7-9.69c-2.72-1.53-5.46-3.18-8.19-5h0c-1.81-1.17-3.58-2.37-5.29-3.59a107.28,107.28,0,0,0,2.51,12.81,106.23,106.23,0,0,0,11-4.26ZM28.08,75.4A125,125,0,0,1,16.84,65.33a73.26,73.26,0,0,0-4.77,6c-6,8.4-8.26,15.82-5.41,20.28s10.54,5.5,20.67,3.59c1.31-.24,2.66-.54,4-.89A119.33,119.33,0,0,1,28.08,75.4ZM38.27,24.68a117,117,0,0,1,15.64,6.48,116.73,116.73,0,0,1,15.48-6.3C68.94,23.5,68.46,22.2,68,21,64.12,11.41,59.09,5.5,53.8,5.5S43.48,11.41,39.64,21c-.48,1.19-.94,2.43-1.37,3.72ZM60,34.37c2.72,1.53,5.46,3.18,8.19,5q2.72,1.77,5.3,3.6A109.3,109.3,0,0,0,71,30.11a106.23,106.23,0,0,0-11,4.26ZM79.52,47.48A125,125,0,0,1,90.76,57.55a73.26,73.26,0,0,0,4.77-6c6-8.4,8.26-15.82,5.41-20.28S90.4,25.8,80.27,27.71c-1.31.24-2.66.54-4,.89a119.33,119.33,0,0,1,3.29,18.88ZM87,61.56c-2.13-2.18-4.46-4.37-7-6.53.1,2.11.14,4.25.14,6.41S80.13,65.84,80,68c2.5-2.13,4.83-4.29,7-6.44ZM74.25,50.32Q70,47,65.17,43.92h0c-3.77-2.45-7.56-4.66-11.29-6.61-3.71,1.91-7.47,4.07-11.23,6.46l-.17.11c-3.2,2-6.25,4.18-9.12,6.35-.29,3.62-.44,7.37-.44,11.21s.15,7.52.43,11.12c2.8,2.15,5.78,4.25,8.9,6.29a2.56,2.56,0,0,1,.35.22c3.72,2.41,7.44,4.58,11.12,6.5,3.75-1.92,7.54-4.11,11.33-6.53,3.23-2.06,6.3-4.2,9.19-6.39.29-3.62.44-7.37.44-11.21s-.15-7.52-.43-11.12Zm-26.43-16a105.69,105.69,0,0,0-11.13-4.39,109.27,109.27,0,0,0-2.54,12.93Q36.79,41,39.6,39.22l.11-.07q4-2.58,8.11-4.82Zm-27.23,27c2.13,2.18,4.46,4.37,7,6.53q-.14-3.16-.13-6.41c0-2.22,0-4.4.14-6.56-2.5,2.13-4.83,4.29-7,6.44ZM59.78,88.55a105.69,105.69,0,0,0,11.13,4.39A109.27,109.27,0,0,0,73.45,80Q70.81,81.87,68,83.66c-2.74,1.75-5.49,3.38-8.22,4.89Z"/></svg>
                        </a>
                    </header>
                    <main className="main">
                        <h2 className="notification">Вы проиграли (</h2>
                        <div className="btn-block">
                            <button 
                                onClick={handlerBtnStartOver}
                                className="btn"
                            >
                                Начать заново
                            </button>
                            <button 
                                onClick={handlerBtnCompleteGame}
                                className="btn"
                            >
                                Завершить игру
                            </button>
                        </div>
                    </main>
                </>
            )
        }
    }
}