import React from "react";

export default function Options(props: any) {

    let keyValueArrOfPrompt = Object.entries(props.promptGame)
    console.log("keyValueArrOfPrompt" ,keyValueArrOfPrompt)

    let handlerOption = (option: boolean) => {
        if (option) {
            for (let option of keyValueArrOfPrompt) {
                if (option[1] && option[0] !== "lastUsePrompt") {
                    let promptObject: any = {};
                    promptObject[option[0]] = null;
                    console.log("promptObject" ,promptObject)
                    props.changeStep(props.step + 1);
                    props.changeStatePromptGame(promptObject)
                }
            }
        } else {
            console.log("we here, notcorrect answer")
            props.changeStep(null);
        }
    }

    console.log("props.promptGame", props.promptGame)
    
    // console.log(correctAnswer[0][0])
    if (props.promptGame.fiftyOnFity) {
        return (
                <>
                    <li onClick={() => handlerOption(props.correctAnswer[0][1])}>
                        {props.correctAnswer[0][0]}
                    </li>
                    <li onClick={() => handlerOption(props.randomOption[1])}>
                        {props.randomOption[0]}
                    </li>
                </>
            )
    } else {
        return (
            <>
                {props.options.map((option: [string, boolean, number], index: number) =>
                    <li onClick={() => handlerOption(option[1])} key={index}>
                        {option[0]}
                    </li>
                )}
            </>
        )
    }
}