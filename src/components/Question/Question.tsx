import React from "react";
import "./css/Question.css";

export default function Question(props: any) {
    console.log(props.question);
    return(
        <div className="main__question">
            {props.question}
        </div>
    )
}