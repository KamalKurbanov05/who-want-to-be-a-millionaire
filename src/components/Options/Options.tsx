import React, {useState} from "react";
import "./css/Option.css"

export default function Options(props: any) {
    const [background, setBackground] = useState("black")
    
    //формируем массив состоящий из массивов с парами имя свойства и занчение свойства
    let keyValueArrOfPrompt = Object.entries(props.promptGame);

    //функция для обработки правильных ответов
    let handlerOption = (option: [string, boolean, number]) => {

        if (option[1]) {
            setTimeout(() => setBackground("blue"), 500);
            setTimeout(() => setBackground("black"), 1000);
            setTimeout(() => setBackground("blue"), 1500);
            setTimeout(() => setBackground("black"), 2000);
            setTimeout(() => props.changeStateGame(
                {
                    step: props.step + 1,
                    gain: option[2]
                }
            ), 2300)
            setTimeout(() => {
                let promptObject: any = {};

                for (let option of keyValueArrOfPrompt) {
                    if (option[1] && option[0] !== "lastUsePrompt") {
                        promptObject[option[0]] = null;
                        promptObject.lastUsePrompt = null;
                        promptObject.unCorrectOption = null;
                    }
                    props.changeStatePromptGame(promptObject);
                }
            }, 2300)
        } else {
            props.changeStep(null);
        }
    }

    if (props.promptGame.fiftyOnFifty) {
        return (
                <>
                    <li
                        className={`option ${background}`}
                        onClick={() => handlerOption(props.correctAnswer[0])}
                    >
                        {props.correctAnswer[0][0]}
                    </li>
                    <li
                        className="option"
                        onClick={() => handlerOption(props.randomOption)}
                    >
                        {props.promptGame.unCorrectOption}
                    </li>
                </>
            )
    } else {
        return (
            <>
                {props.options.map((option: [string, boolean, number], index: number) => {
                    if (option[1]) {
                        return (
                            <li 
                                onClick={() => handlerOption(option)} 
                                key={index}
                                className={`option ${background}`}
                            >
                                {option[0]}
                            </li>
                        )
                    } else {
                        return (
                            <li 
                                onClick={() => handlerOption(option)} 
                                key={index}
                                className="option"
                            >
                                {option[0]}
                            </li>
                        )
                    }
                }
                )}
            </>
        )
    }
}