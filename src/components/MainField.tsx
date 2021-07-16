import React, {useState} from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import "./css/MainField.css"

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
                        <label className="rules-block-about-prompt__label">
                            <svg 
                                        xmlns="http://www.w3.org/2000/svg"
                                        version="1.1" id="Layer_1"
                                        viewBox="0 0 122.88 122.88"
                                        fill="#61dafb"
                                        height="8vh"
                                    >
                                            <style type="text/css"></style>
                                            <g>
                                            <path  d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44s-27.51,61.44-61.44,61.44v-20.82c0.11,0,0.22,0,0.33,0 c22.43,0,40.62-18.19,40.62-40.62S84.2,20.82,61.77,20.82c-0.11,0-0.22,0-0.33,0V0z"/>
                                            <path  d="M61.44,102.06v20.82C27.51,122.88,0,95.37,0,61.44S27.51,0,61.44,0v20.82C39.16,21,21.15,39.12,21.15,61.44 C21.15,83.76,39.16,101.88,61.44,102.06L61.44,102.06z"/>
                                            <path  d="M39.51,46.22h19.31v6.51H45.74l-0.7,4.39c0.9-0.42,1.79-0.74,2.68-0.95c0.89-0.21,1.76-0.32,2.63-0.32 c2.93,0,5.31,0.89,7.13,2.66c1.82,1.77,2.73,4,2.73,6.69c0,1.89-0.47,3.7-1.41,5.45c-0.94,1.75-2.27,3.08-4,4 c-1.73,0.92-3.94,1.38-6.62,1.38c-1.93,0-3.59-0.18-4.96-0.55c-1.38-0.36-2.55-0.91-3.51-1.64c-0.97-0.73-1.75-1.55-2.35-2.47 c-0.6-0.92-1.1-2.07-1.5-3.44l8.22-0.9c0.2,1.32,0.67,2.33,1.4,3.02c0.74,0.69,1.61,1.03,2.62,1.03c1.14,0,2.07-0.43,2.81-1.29 c0.74-0.86,1.11-2.14,1.11-3.85c0-1.75-0.38-3.02-1.12-3.83c-0.74-0.81-1.74-1.22-2.97-1.22c-0.78,0-1.55,0.19-2.28,0.58 c-0.55,0.28-1.15,0.78-1.79,1.52l-6.94-1L39.51,46.22L39.51,46.22z M63.07,60.75c0-5.56,1-9.46,3.01-11.68 c2-2.22,5.06-3.33,9.16-3.33c1.97,0,3.59,0.25,4.86,0.73c1.27,0.48,2.3,1.12,3.1,1.9c0.8,0.78,1.43,1.6,1.89,2.46 c0.46,0.86,0.83,1.86,1.11,3.01c0.55,2.18,0.82,4.46,0.82,6.83c0,5.31-0.9,9.2-2.7,11.66c-1.79,2.46-4.89,3.7-9.29,3.7 c-2.46,0-4.45-0.4-5.97-1.18c-1.52-0.78-2.76-1.94-3.74-3.46c-0.7-1.08-1.25-2.55-1.65-4.42C63.27,65.08,63.07,63.01,63.07,60.75 L63.07,60.75z M71.13,60.76c0,3.72,0.33,6.27,0.99,7.64c0.66,1.36,1.62,2.05,2.87,2.05c0.83,0,1.54-0.29,2.15-0.87 c0.61-0.58,1.05-1.5,1.34-2.75c0.29-1.25,0.43-3.21,0.43-5.85c0-3.89-0.33-6.5-0.99-7.84c-0.66-1.34-1.65-2-2.97-2 c-1.35,0-2.32,0.68-2.92,2.05C71.43,54.54,71.13,57.07,71.13,60.76L71.13,60.76z"/></g></svg>
                                
                                    ON
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg"
                                        version="1.1" id="Layer_1"
                                        viewBox="0 0 122.88 122.88"
                                        fill="#61dafb"
                                        height="8vh"
                                    >
                                            <style type="text/css"></style>
                                            <g>
                                            <path d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44s-27.51,61.44-61.44,61.44v-20.82c0.11,0,0.22,0,0.33,0 c22.43,0,40.62-18.19,40.62-40.62S84.2,20.82,61.77,20.82c-0.11,0-0.22,0-0.33,0V0z"/>
                                            <path  d="M61.44,102.06v20.82C27.51,122.88,0,95.37,0,61.44S27.51,0,61.44,0v20.82C39.16,21,21.15,39.12,21.15,61.44 C21.15,83.76,39.16,101.88,61.44,102.06L61.44,102.06z"/>
                                            <path  d="M39.51,46.22h19.31v6.51H45.74l-0.7,4.39c0.9-0.42,1.79-0.74,2.68-0.95c0.89-0.21,1.76-0.32,2.63-0.32 c2.93,0,5.31,0.89,7.13,2.66c1.82,1.77,2.73,4,2.73,6.69c0,1.89-0.47,3.7-1.41,5.45c-0.94,1.75-2.27,3.08-4,4 c-1.73,0.92-3.94,1.38-6.62,1.38c-1.93,0-3.59-0.18-4.96-0.55c-1.38-0.36-2.55-0.91-3.51-1.64c-0.97-0.73-1.75-1.55-2.35-2.47 c-0.6-0.92-1.1-2.07-1.5-3.44l8.22-0.9c0.2,1.32,0.67,2.33,1.4,3.02c0.74,0.69,1.61,1.03,2.62,1.03c1.14,0,2.07-0.43,2.81-1.29 c0.74-0.86,1.11-2.14,1.11-3.85c0-1.75-0.38-3.02-1.12-3.83c-0.74-0.81-1.74-1.22-2.97-1.22c-0.78,0-1.55,0.19-2.28,0.58 c-0.55,0.28-1.15,0.78-1.79,1.52l-6.94-1L39.51,46.22L39.51,46.22z M63.07,60.75c0-5.56,1-9.46,3.01-11.68 c2-2.22,5.06-3.33,9.16-3.33c1.97,0,3.59,0.25,4.86,0.73c1.27,0.48,2.3,1.12,3.1,1.9c0.8,0.78,1.43,1.6,1.89,2.46 c0.46,0.86,0.83,1.86,1.11,3.01c0.55,2.18,0.82,4.46,0.82,6.83c0,5.31-0.9,9.2-2.7,11.66c-1.79,2.46-4.89,3.7-9.29,3.7 c-2.46,0-4.45-0.4-5.97-1.18c-1.52-0.78-2.76-1.94-3.74-3.46c-0.7-1.08-1.25-2.55-1.65-4.42C63.27,65.08,63.07,63.01,63.07,60.75 L63.07,60.75z M71.13,60.76c0,3.72,0.33,6.27,0.99,7.64c0.66,1.36,1.62,2.05,2.87,2.05c0.83,0,1.54-0.29,2.15-0.87 c0.61-0.58,1.05-1.5,1.34-2.75c0.29-1.25,0.43-3.21,0.43-5.85c0-3.89-0.33-6.5-0.99-7.84c-0.66-1.34-1.65-2-2.97-2 c-1.35,0-2.32,0.68-2.92,2.05C71.43,54.54,71.13,57.07,71.13,60.76L71.13,60.76z"/></g>
                                    </svg>
                                        -- Оставляет два варианта ответа, один из которых правильный
                                </label>
                            <label className="rules-block-about-prompt__label">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" 
                                    version="1.1" 
                                    id="Capa_1" 
                                    fill="#61dafb"
                                    height="8vh" 
                                    viewBox="0 0 36.164 36.164"
                                    
                                >
                                    <path d="M10.296,26.25V3.214h14.607V21h1.409V2.026C26.312,0.912,25.401,0,24.286,0H10.913C9.798,0,8.886,0.912,8.886,2.026v25.949   c0,1.113,0.912,2.024,2.027,2.024h3.628l-2-3.75L10.296,26.25L10.296,26.25z M15.46,1.461h4.279c0.135,0,0.244,0.109,0.244,0.246   c0,0.135-0.109,0.244-0.244,0.244H15.46c-0.135,0-0.246-0.109-0.246-0.244C15.214,1.57,15.326,1.461,15.46,1.461z M27.278,23.741   v-0.25c0-0.558-0.453-1.013-1.014-1.013h-0.107c-0.562,0-1.014,0.455-1.014,1.012v0.251v0.891h-0.391v-0.891V23.49   c0-0.557-0.452-1.012-1.012-1.012h-0.11c-0.558,0-1.013,0.455-1.013,1.012v1.142h-0.391V23.49c0-0.557-0.453-1.012-1.012-1.012   h-0.109c-0.561,0-1.013,0.455-1.013,1.012v0.251v0.891h-0.323v-2.675c2.09-0.541,3.646-2.426,3.646-4.682   c0-2.678-2.178-4.855-4.854-4.855c-2.676,0-4.854,2.178-4.854,4.855c0,2.354,1.687,4.318,3.914,4.758v2.602v1.204v2.433   c-1.08-1.151-1.733-2.434-2.432-2.594c-0.903-0.209-1.665,0.485-1.041,1.689c0.625,1.203,3.615,6.425,3.619,6.431   c0.396,0.96,1.67,2.367,4.68,2.366c4.828,0.001,4.828-4.307,4.828-4.307v-6.219c0-0.004,0.002-0.006,0.002-0.01V23.741   L27.278,23.741z M18.752,16.996l-0.11-0.001c-0.563,0-1.019,0.456-1.019,1.021v1.123c-0.683-0.347-1.156-1.047-1.156-1.863   c0-1.155,0.94-2.096,2.096-2.096c1.156,0,2.097,0.94,2.097,2.096c0,0.704-0.354,1.326-0.887,1.705v-0.965   C19.772,17.451,19.317,16.995,18.752,16.996z M14.209,17.275c0-2.401,1.953-4.355,4.354-4.355c2.401,0,4.354,1.954,4.354,4.355   c0,1.979-1.336,3.633-3.146,4.161v-1.312c1.107-0.473,1.887-1.571,1.887-2.849c0-1.707-1.389-3.096-3.096-3.096   c-1.707,0-3.096,1.389-3.096,3.096c0,1.376,0.91,2.533,2.156,2.934v1.312C15.674,21.088,14.209,19.352,14.209,17.275z"/>
                                </svg>
                                -- Вы можете получить ответ от самго Дэна Обрамова
                            </label>
                            <label className="rules-block-about-prompt__label">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.0"
                                    height="8vh"
                                    viewBox="0 0 1280.000000 1280.000000"
                                    preserveAspectRatio="xMidYMid meet"
                                    fill="#61dafb"
                                >
                                    <metadata>
                                    Created by potrace 1.15, written by Peter Selinger 2001-2017
                                    </metadata>
                                    <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#61dafb" stroke="none">
                                    <path d="M8670 10699 c-385 -35 -705 -121 -1005 -269 -349 -172 -580 -362 -778 -641 -97 -136 -185 -342 -223 -521 -25 -112 -25 -400 0 -508 71 -322 252 -606 538 -847 43 -36 78 -70 78 -74 0 -5 -53 -81 -117 -169 -65 -89 -140 -192 -168 -230 -27 -38 -113 -155 -190 -260 -175 -239 -169 -230 -164 -234 2 -2 132 53 289 123 1049 468 970 435 1009 424 20 -6 83 -25 141 -42 305 -91 693 -134 1008 -111 439 31 775 119 1122 295 882 449 1215 1292 804 2036 -122 220 -333 441 -579 606 -278 186 -638 325 -1004 388 -228 39 -551 54 -761 34z"/>
                                    <path d="M4530 9354 c-19 -2 -78 -9 -130 -15 -726 -83 -1314 -460 -1430 -915 -28 -107 -27 -273 0 -372 22 -81 82 -204 128 -268 243 -332 720 -566 1322 -646 56 -7 197 -12 345 -12 279 1 429 18 667 76 l127 31 243 -91 c313 -117 672 -250 721 -268 21 -7 37 -10 35 -5 -2 5 -105 126 -229 268 -125 142 -238 272 -253 290 l-27 32 48 32 c214 145 366 332 434 534 21 61 24 88 24 210 -1 191 -28 282 -134 440 -141 212 -400 400 -711 518 -178 67 -332 107 -555 142 -96 15 -541 29 -625 19z"/>
                                    <path d="M2120 7503 c-14 -2 -74 -10 -135 -19 -131 -18 -270 -51 -420 -101 -533 -176 -961 -538 -1142 -966 -220 -520 -110 -1077 296 -1499 163 -170 328 -291 549 -402 573 -287 1301 -335 1923 -126 l106 35 573 -272 c316 -150 576 -270 578 -268 2 2 -31 55 -75 117 -43 62 -104 151 -136 198 -32 47 -91 132 -131 190 -40 58 -112 163 -160 233 l-88 128 29 21 c15 12 71 64 123 117 359 361 503 804 410 1262 -142 694 -833 1234 -1720 1345 -104 13 -512 18 -580 7z"/>
                                    <path d="M10364 7330 c-704 -63 -1329 -364 -1599 -769 -108 -164 -155 -315 -155 -502 0 -221 72 -402 239 -598 59 -68 194 -187 276 -242 l63 -43 -20 -26 c-11 -14 -57 -68 -103 -120 -45 -52 -167 -191 -270 -308 -103 -118 -184 -216 -181 -219 3 -3 189 63 413 147 224 84 479 179 567 211 l158 59 112 -30 c154 -41 313 -68 501 -85 1134 -105 2197 397 2335 1102 19 96 8 311 -20 398 -48 150 -124 275 -244 403 -300 316 -764 525 -1354 608 -125 17 -582 27 -718 14z"/>
                                    <path d="M6495 6494 c-381 -58 -678 -267 -820 -577 -44 -97 -62 -165 -73 -272 -26 -261 61 -504 251 -702 l40 -42 -50 -83 c-28 -46 -93 -154 -147 -242 -53 -87 -96 -160 -96 -162 0 -12 38 7 247 120 125 68 252 135 281 150 l52 27 88 -30 c292 -97 625 -76 892 59 108 54 181 108 275 205 106 108 171 211 216 345 30 86 33 109 37 241 4 125 1 158 -17 230 -44 172 -139 329 -274 454 -89 83 -145 121 -267 179 -147 71 -263 97 -450 101 -85 2 -168 1 -185 -1z"/>
                                    <path d="M10548 4064 c-313 -75 -467 -410 -322 -696 34 -67 135 -168 202 -202 195 -99 417 -64 567 88 71 73 111 150 133 257 14 66 14 88 4 151 -34 198 -182 358 -373 403 -78 18 -135 18 -211 -1z"/>
                                    <path d="M6913 4055 c-158 -43 -287 -165 -335 -319 -16 -49 -19 -84 -16 -172 3 -105 5 -114 42 -188 181 -366 692 -367 872 -2 37 75 39 86 42 187 4 89 0 121 -17 177 -34 114 -130 226 -238 281 -99 50 -243 64 -350 36z"/>
                                    <path d="M8713 4055 c-158 -43 -287 -165 -335 -319 -16 -49 -19 -84 -16 -172 3 -105 5 -114 42 -188 181 -366 692 -367 872 -2 37 75 39 86 42 187 4 89 0 121 -17 177 -34 114 -130 226 -238 281 -99 50 -243 64 -350 36z"/>
                                    <path d="M3236 4044 c-122 -29 -243 -121 -309 -234 -62 -107 -74 -289 -28 -412 47 -123 157 -232 280 -279 113 -43 282 -35 389 17 74 36 172 131 210 202 201 376 -129 806 -542 706z"/>
                                    <path d="M5075 4042 c-243 -84 -382 -335 -320 -577 38 -147 125 -255 259 -321 75 -37 86 -39 187 -42 136 -5 218 17 306 82 133 97 203 234 203 396 0 212 -136 400 -332 462 -79 24 -233 24 -303 0z"/>
                                    <path d="M1413 4035 c-158 -43 -287 -165 -335 -319 -16 -49 -19 -84 -16 -172 3 -105 5 -114 42 -188 181 -366 692 -367 872 -2 37 75 39 86 42 187 4 89 0 121 -17 177 -34 114 -130 226 -238 281 -99 50 -243 64 -350 36z"/>
                                    <path d="M6553 3154 c-3 -9 -3 -618 1 -1353 7 -1195 9 -1338 23 -1353 14 -16 38 -18 212 -18 162 0 200 3 219 16 l22 15 0 505 c0 329 3 504 10 504 7 0 10 -174 10 -503 0 -475 1 -505 18 -520 16 -15 47 -17 220 -17 198 0 202 0 216 22 13 20 16 215 22 1355 6 1073 5 1335 -6 1348 -9 11 -34 15 -102 15 -74 0 -97 -4 -137 -24 -145 -74 -328 -74 -490 -1 -44 21 -69 25 -143 25 -72 0 -90 -3 -95 -16z"/>
                                    <path d="M7547 3163 c-12 -11 -8 -1151 4 -1158 17 -11 99 47 133 93 l31 44 0 443 0 443 -30 43 c-29 42 -98 98 -121 99 -6 0 -14 -3 -17 -7z"/>
                                    <path d="M8353 3154 c-3 -9 -3 -618 1 -1353 7 -1195 9 -1338 23 -1353 14 -16 38 -18 212 -18 162 0 200 3 219 16 l22 15 0 505 c0 329 3 504 10 504 7 0 10 -174 10 -503 0 -475 1 -505 18 -520 16 -15 47 -17 220 -17 198 0 202 0 216 22 13 20 16 215 22 1355 6 1073 5 1335 -6 1348 -9 11 -34 15 -102 15 -74 0 -97 -4 -137 -24 -145 -74 -328 -74 -490 -1 -44 21 -69 25 -143 25 -72 0 -90 -3 -95 -16z"/>
                                    <path d="M9347 3163 c-12 -11 -8 -1151 4 -1158 17 -11 99 47 133 93 l31 44 0 443 0 443 -30 43 c-29 42 -98 98 -121 99 -6 0 -14 -3 -17 -7z"/>
                                    <path d="M10086 3140 c-26 -17 -60 -51 -76 -77 l-30 -47 0 -431 0 -431 30 -47 c29 -45 95 -97 125 -97 13 0 15 67 15 574 0 316 -4 577 -9 580 -4 3 -29 -8 -55 -24z"/>
                                    <path d="M10170 1825 l0 -1346 25 -24 c24 -25 26 -25 208 -25 171 0 186 1 211 21 l26 20 0 505 c0 441 2 504 15 504 13 0 15 -63 15 -509 0 -461 2 -510 17 -522 12 -11 60 -14 209 -14 180 0 195 1 213 20 19 20 20 43 23 1365 l3 1345 -95 3 c-84 2 -101 0 -153 -24 -33 -14 -98 -33 -145 -41 -107 -18 -213 -6 -317 38 -60 25 -82 29 -162 29 l-93 0 0 -1345z"/>
                                    <path d="M11160 2596 c0 -316 4 -577 9 -580 13 -8 96 48 117 80 44 64 44 69 44 500 0 388 -1 417 -19 452 -10 20 -27 47 -38 58 -21 25 -83 64 -100 64 -10 0 -13 -122 -13 -574z"/>
                                    <path d="M3860 3140 c-12 -22 -10 -1133 2 -1145 21 -21 130 65 154 122 11 26 14 123 14 461 l0 428 -29 46 c-27 43 -59 71 -108 97 -19 9 -24 8 -33 -9z"/>
                                    <path d="M4657 3130 c-26 -17 -60 -50 -77 -77 l-30 -47 0 -428 c0 -338 3 -435 14 -461 24 -57 133 -143 154 -122 4 4 8 260 10 569 2 444 0 565 -10 579 -12 16 -16 16 -61 -13z"/>
                                    <path d="M4744 1808 c7 -1214 9 -1355 23 -1370 14 -16 38 -18 208 -18 169 0 195 2 214 18 l22 17 -1 502 c0 443 1 503 15 503 13 0 15 -60 15 -503 0 -478 1 -505 19 -521 16 -14 42 -16 216 -14 l198 3 18 25 c17 24 18 94 25 1352 6 1068 5 1330 -6 1343 -10 11 -34 15 -107 15 -78 0 -101 -4 -141 -23 -75 -38 -141 -52 -237 -52 -96 0 -162 14 -237 52 -40 20 -62 23 -149 23 l-102 0 7 -1352z"/>
                                    <path d="M5730 2580 c0 -530 1 -580 16 -580 27 0 81 38 116 83 l33 41 0 456 0 456 -33 41 c-35 45 -89 83 -116 83 -15 0 -16 -50 -16 -580z"/>
                                    <path d="M6485 3149 c-36 -20 -86 -73 -106 -111 -18 -35 -19 -63 -19 -458 0 -367 2 -425 16 -453 33 -66 118 -135 150 -123 12 5 14 91 12 578 -3 617 -1 595 -53 567z"/>
                                    <path d="M8285 3149 c-36 -20 -86 -73 -106 -111 -18 -35 -19 -63 -19 -458 0 -367 2 -425 16 -453 33 -66 118 -135 150 -123 12 5 14 91 12 578 -3 617 -1 595 -53 567z"/>
                                    <path d="M1053 3134 c-3 -9 -3 -618 1 -1353 7 -1195 9 -1338 23 -1353 14 -16 38 -18 212 -18 162 0 200 3 219 16 l22 15 0 505 c0 329 3 504 10 504 7 0 10 -174 10 -503 0 -475 1 -505 18 -520 16 -15 47 -17 219 -17 178 0 202 2 216 18 14 15 16 158 23 1354 6 1077 5 1340 -6 1353 -9 11 -34 15 -102 15 -75 0 -96 -4 -138 -25 -143 -73 -329 -72 -489 0 -44 21 -69 25 -143 25 -72 0 -90 -3 -95 -16z"/>
                                    <path d="M2047 3143 c-12 -11 -8 -1151 4 -1158 17 -11 99 47 133 93 l31 44 0 443 0 443 -30 43 c-29 42 -98 98 -121 99 -6 0 -14 -3 -17 -7z"/>
                                    <path d="M2778 3121 c-27 -17 -57 -48 -72 -74 l-26 -44 0 -437 c0 -479 -2 -463 62 -522 37 -36 92 -66 102 -57 3 4 6 267 6 585 0 468 -2 578 -13 578 -7 0 -34 -13 -59 -29z"/>
                                    <path d="M2864 3139 c-4 -7 -4 -613 0 -1348 l8 -1336 21 -22 c20 -22 26 -23 207 -23 174 0 189 1 214 21 l26 20 0 506 c0 399 3 504 13 501 9 -4 13 -116 14 -509 3 -500 3 -504 24 -521 19 -16 45 -18 209 -18 164 0 190 2 209 17 l20 18 3 1350 3 1350 -110 0 c-97 -1 -117 -4 -171 -28 -129 -56 -297 -54 -430 7 -48 22 -70 26 -155 26 -63 0 -100 -4 -105 -11z"/>
                                    <path d="M985 3129 c-36 -20 -86 -73 -106 -111 -18 -35 -19 -63 -19 -458 0 -367 2 -425 16 -453 33 -66 118 -135 150 -123 12 5 14 91 12 578 -3 617 -1 595 -53 567z"/>
                                    </g>
                                </svg>
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