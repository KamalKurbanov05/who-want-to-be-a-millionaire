import React from "react";

export default function Header(props:any) {
    let handlerBtnOfStartOrEnd = (): void => {
        if (props.startGame) {
            props.changeStateGame(0, false);
            props.changeStatePromptGame(
                {
                    lastUsePrompt: null,
                    fiftyOnFity: false,
                })
        } else {
            props.changeStartGame(true);
        }
    }

    let handlerFiftyOnFifty = (): void => {
        props.changeStatePromptGame(
            {
                lastUsePrompt: "fiftyOnFity",
                fiftyOnFity: true,
            });
    }

    let handlerCallFriend = (): void => {

    }

    let handlerHelpHall = (): void => {

    }

    return (
            <div>
                <button onClick={handlerFiftyOnFifty}>50:50</button>
                <button onClick={handlerCallFriend}>Звонок другу</button>
                <button onClick={handlerHelpHall}>Помощь зала</button>
                <button onClick={handlerBtnOfStartOrEnd}>
                    {props.startGame? "Завершить игру": "Начать игру"}
                </button>
            </div>
    )
}