import React, {useState} from "react";
import Header from "./components/Header";
import Body from "./components/Body";

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
}

interface IpromptGame {
    lastUsePrompt: keyPromptName | null,
    fiftyOnFity: boolean,
    callFriend: boolean,
    promptHall: boolean,
}

// interface IargChangePrompt {
//     lastUsePrompt: keyPromptName | null,
//     keyPrompt: boolean
// }

type keyPromptName = Exclude<keyof IpromptGame, "lastUsePrompt">

const listRounds: Array<Iround> = [
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
        startGame: false
        })

    const [promptGame, setPromptGame] = useState <IpromptGame>(
        {
            lastUsePrompt: null,
            fiftyOnFity: false,
            callFriend: false,
            promptHall: false,
        })

    console.log("stateGame" ,stateGame);
    console.log("stateGame" ,promptGame);

    let changeStatePromptGame = (obj: object): void => {
        setPromptGame(Object.assign({}, promptGame, obj)
        )
    }

    let changeStateGame = (step: number | null, startGame: boolean): void => {
        setStateGame(Object.assign({}, stateGame, 
            {
                step: step,
                startGame: startGame,
            })
        )
    }

    let changeStep = (step: number| null): void => {
        setStateGame(Object.assign({}, stateGame, 
            {
                step: step
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
    }

    if (!stateGame.startGame) {
        return (
            <div>
                <Header changeStatePromptGame={changeStatePromptGame} promptGame={promptGame} changeStateGame={changeStateGame} startGame={stateGame.startGame} changeStartGame={changeStartGame}/>
                <h1>Начало игры</h1>
            </div>
        )
    } else {
        if (typeof stateGame.step === "number") {
            if (stateGame.step === listRounds.length) {
                return(
                    <div>
                        Вы победили!
                    </div>
                )
            } else {
                return(
                    <div>
                        <Header changeStatePromptGame={changeStatePromptGame} promptGame={promptGame} changeStateGame={changeStateGame} changeStep={changeStep} startGame={stateGame.startGame} changeStartGame={changeStartGame}/>
                        <Body 
                            promptGame={promptGame} 
                            changeStep={changeStep} 
                            step={stateGame.step} 
                            listRounds={listRounds}
                            changeStatePromptGame={changeStatePromptGame}
                        />
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <button onClick={handlerBtnStartOver}>
                        Начать заново
                    </button>
                    <button>
                        Завершить игру
                    </button>
                    Вы проиграли!
                </div>
            )
        }
    }
}