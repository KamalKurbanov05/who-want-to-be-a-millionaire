import React from "react";
import Button from "@material-ui/core/Button";
import ReactIcon from "../../../../icons/ReactIcon";
import {handlersAndStyleForWineLosse} from "../../MainPaige";

export default function WinGame(props: handlersAndStyleForWineLosse) {    
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