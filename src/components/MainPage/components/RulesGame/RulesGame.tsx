import React from "react";
import Header from "../Header/Header";
import FiftyOnFiftyIcon from "../../../../icons/FiftyOnFiftyIcon";
import PhoneIcon from "../../../../icons/PhoneIcon";
import CrowdIcon from "../../../../icons/CrowdIcon";



export default function RulesGame(props: any) {
    return(
        <>
            <Header
                changeStatePromptGame={props.changeStatePromptGame} 
                promptGame={props.promptGame}
                changeStateGame={props.changeStateGame}
                startGame={props.startGame}
                changeStartGame={props.changeStartGame}
                listRounds={props.listRounds}
                step={props.step}
            />
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
}