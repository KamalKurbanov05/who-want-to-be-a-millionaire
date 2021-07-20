import React from "react";

export default function Question(props: any) {
    console.log(props.question);
    return(
        <div>
            {props.question}
        </div>
    )
}