import React from "react";
import Button from "@material-ui/core/Button";
import ReactIcon from "../../../../icons/ReactIcon";
import customStyle from "../../MainPaige";
import {classes} from "../../MainPaige";

interface winGame {
    handlerBtnStartOver: () => void,
    handlerBtnCompleteGame: () => void,
    classes: classes,
}

export default function WinGame(props: winGame) {
    const classes = customStyle()
    return (
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.handlerBtnStartOver}
                        className={props.classes.style}
                    >
                        Начать заново
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.handlerBtnCompleteGame}
                        className={props.classes.style}
                    >
                        Завершить игру
                    </Button>
                </div>
            </main>
        </>
    )
}