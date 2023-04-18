import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Button, Modal, Radio } from 'antd';
import Image from 'next/image';
import { random } from '@/utils/helper';

export default function Home() {
    const [type, setType] = useState('ice');

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="m-auto p-[30px] ">
                <Radio.Group
                    className="flex justify-center mb-[20px]"
                    defaultValue="ice"
                    buttonStyle="solid"
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                >
                    <Radio.Button className="w-[150px] text-center" value="scratch">
                        복권
                    </Radio.Button>
                    <Radio.Button className="w-[150px] text-center" value="ice">
                        얼음 깨기
                    </Radio.Button>
                    <Radio.Button className="w-[150px] text-center" value="roulette">
                        룰렛
                    </Radio.Button>
                </Radio.Group>

                {type === 'scratch' && <ScratchGame />}
                {type === 'ice' && <IceGame />}
                {type === 'roulette' && <RouletteGame />}
            </main>
        </>
    );
}
import ScratchCard from 'react-scratchcard-v2';
const IMG =
    'https://plus.unsplash.com/premium_photo-1681140029775-36a657447c4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80';

function ScratchGame() {
    const ref = useRef<ScratchCard>(null);
    const [selectData, setSelectData] = useState<DataType>();

    useEffect(() => {
        setSelectData(randomItem(testData));
    }, []);

    const onClickReset = () => {
        ref.current && ref.current.reset();
    };

    const randomItem = (itemsList: DataType[]) => {
        let chances = [];

        const totalPercent = itemsList.reduce((prev, curr) => prev + curr.percent, 0);

        let acc = 0;
        chances = itemsList.map(({ percent }) => (acc = percent + acc));

        const rand = Math.random() * totalPercent;

        const itemIndex = chances.filter((el) => el <= rand).length;

        return itemsList.find((_, index) => index === itemIndex);
    };

    return (
        <div>
            <button onClick={onClickReset}>Reset</button>
            <ScratchCard
                width={320}
                height={226}
                image={IMG}
                finishPercent={70}
                onComplete={() => console.log('complete')}
            >
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <h1>{selectData?.value}</h1>
                </div>
            </ScratchCard>
        </div>
    );
}

// http://dbins2.speedgabia.com/thl/work/donga_pocari/ice.html
import title from 'public/images/ice_title.png';
import start from 'public/images/ice_mask.png';
import ice from 'public/images/ice_ice1.png';
import ice_break from 'public/images/ice_ice2.png';
import gift from 'public/images/ice_back5.png';

import { css } from '@emotion/react';

const temp = new Array(40).fill(0).map((e, i) => ({
    id: i,
    visible: true,
}));

function IceGame() {
    const [startToggle, setStartToggle] = useState(false);
    const [iceList, setIceList] = useState(temp);
    const [seconds, setSeconds] = useState(20);
    const [gauge, setGauge] = useState(0);
    let timer: any;
    let secondeTimer: any;

    useEffect(() => {
        if (seconds === 0) {
            return clearInterval(timer);
        }

        if (startToggle) {
            timer = setInterval(() => {
                setGauge(gauge + 1);
            }, 50);
        }

        return () => {
            clearInterval(timer);
        };
    }, [gauge, startToggle]);

    useEffect(() => {
        if (seconds === 0) {
            Modal.confirm({
                content: <div>종료!</div>,
                onOk() {
                    window.location.reload();
                },
            });

            return clearInterval(secondeTimer);
        }

        if (startToggle) {
            secondeTimer = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);
        }

        return () => {
            clearInterval(secondeTimer);
        };
    }, [seconds, startToggle]);

    useEffect(() => {
        const visibleList = iceList.filter((e) => e.visible).length;

        if (!visibleList) {
            Modal.confirm({
                content: <div>성공!</div>,
                onOk() {
                    window.location.reload();
                },
            });
            window.location.reload();
        }
    }, [iceList]);

    const onChangeStartToggle = () => {
        setStartToggle(!startToggle);
    };

    const onClickIce = (id: number) => {
        setIceList(iceList.map((e) => (e.id === id ? { ...e, visible: false } : e)));
    };

    return (
        <article css={iceGameStyle}>
            <h1>
                <Image src={title} alt="title" className="m-auto" />
            </h1>

            <section id="game">
                <div
                    className="mask"
                    css={css`
                        ${startToggle &&
                        css`
                            display: none;
                        `}
                    `}
                >
                    <Image src={start} alt="start" onClick={onChangeStartToggle} />
                </div>

                <div id="timer">
                    <div
                        className="gauge"
                        css={css`
                            background-position-x: ${-gauge}px;
                            transition: all 0.3s;
                        `}
                    ></div>
                </div>

                <div className="back">
                    <Image src={gift} alt="gift" />
                </div>

                <div id="ice">
                    <ul>
                        {iceList.map((e, i) => (
                            <li key={e.id} onClick={() => onClickIce(e.id)}>
                                <Image
                                    src={e.visible ? ice : ice_break}
                                    alt="ice"
                                    css={css`
                                        @keyframes break {
                                            0% {
                                                opacity: 1;
                                            }
                                            50% {
                                                transform: rotate(${random(0, 2) ? 10 : -10}deg) scale(1.1);
                                            }
                                            100% {
                                                opacity: 0;
                                                transform: rotate(${random(0, 2) ? 10 : -10}deg) scale(1.1);
                                            }
                                        }

                                        ${!e.visible &&
                                        css`
                                            animation-duration: 1s;
                                            animation-name: break;
                                            animation-fill-mode: forwards;
                                            cursor: default;
                                        `}
                                    `}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </article>
    );
}

const iceGameStyle = css`
    position: relative;
    width: 1024px;
    height: 691px;
    background-color: #ffffff;
    margin: 0px auto;

    #game {
        width: 730px;
        height: 511px;
        background-image: url(/images/ice_bg.png);
        position: relative;
        text-align: center;
        padding-top: 10px;
        padding-left: 15px;
        margin: 0px auto;
        margin-top: 20px;
    }

    .mask {
        width: 730px;
        height: 521px;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 3;
        cursor: pointer;
    }

    #timer {
        width: 441px;
        height: 49px;
        background-image: url(/images/ice_timer_bg.png);
        margin: 0px auto;
        margin-bottom: 5px;
        position: relative;
    }

    .back {
        width: 292px;
        height: 350px;
        position: absolute;
        top: 120px;
        left: 220px;
    }
    .num {
        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
        position: absolute;
        z-index: 3;
        top: 13px;
        right: 170px;
    }
    .gauge {
        border-radius: 30px;
        width: 307px;
        height: 29px;
        background-image: url(/images/ice_timer_gauge.png);
        position: absolute;
        top: 10px;
        right: 22px;
        background-repeat: no-repeat;
    }

    #ice li {
        float: left;
        width: 85px;
        height: 89px;
        margin-left: 1px;
        margin-right: 1px;
        position: relative;
        cursor: pointer;
    }

    #ice li img {
        width: 85px;
        height: 89px;
        position: absolute;
        z-index: 2;
        top: 0px;
        left: 0px;
    }
`;

// http://dbins2.speedgabia.com/thl/work/donga_pocari/roulette.html
import rouletteTitle from 'public/images/roulette_title.png';
import startBtn from 'public/images/roulette_board_start.png';
import goBtn from 'public/images/roulette_board_go.png';
import board from 'public/images/roulette_board_bg.png';
import arrow from 'public/images/roulette_board_arrow.png';

const testData = [
    {
        minDegree: 341,
        maxDegree: 17,
        degree: 1,
        value: '포카리스웨트 분말',
        percent: 15,
    },
    {
        minDegree: 18,
        maxDegree: 53,
        degree: 37,
        value: '포카리스웨트 메트',
        percent: 0,
    },
    {
        minDegree: 54,
        maxDegree: 88,
        degree: 75,
        value: '포카리스웨트 가방',
        percent: 3,
    },
    {
        minDegree: 89,
        maxDegree: 125,
        degree: 100,
        value: '꽝',
        percent: 20,
    },
    {
        minDegree: 126,
        maxDegree: 160,
        degree: 150,
        value: '포카리스웨트 텀블러',
        percent: 5,
    },
    {
        minDegree: 161,
        maxDegree: 196,
        degree: 177,
        value: '포카리스웨트 분말',
        percent: 15,
    },
    {
        minDegree: 197,
        maxDegree: 232,
        degree: 215,
        value: '포카리스웨트 비치 타월',
        percent: 7,
    },
    {
        minDegree: 233,
        maxDegree: 268,
        degree: 255,
        value: '포카리스웨트 미니 분말',
        percent: 10,
    },
    {
        minDegree: 269,
        maxDegree: 304,
        degree: 280,
        value: '꽝',
        percent: 20,
    },
    {
        minDegree: 305,
        maxDegree: 340,
        degree: 327,
        value: '포카리스웨트 텀블러',
        percent: 5,
    },
];

type DataType = {
    minDegree: number;
    maxDegree: number;
    degree: number;
    percent: number;
    value: string;
};
function RouletteGame() {
    const [startToggle, setStartToggle] = useState(false);
    const [seconds, setSeconds] = useState(random(3, 5));
    const [selectData, setSelectData] = useState<DataType>();

    console.log('selectData', selectData);

    const randomItem = (itemsList: DataType[]) => {
        let chances = [];

        const totalPercent = itemsList.reduce((prev, curr) => prev + curr.percent, 0);

        let acc = 0;
        chances = itemsList.map(({ percent }) => (acc = percent + acc));

        const rand = Math.random() * totalPercent;

        const itemIndex = chances.filter((el) => el <= rand).length;

        return itemsList.find((_, index) => index === itemIndex);
    };

    const onChangeStartToggle = () => {
        setStartToggle(!startToggle);
        setSelectData(randomItem(testData));
    };

    return (
        <article css={rouletteStyle}>
            <h1>
                <Image src={rouletteTitle} alt="rouletteTitle" className="m-auto" />
            </h1>

            <div className="board_start obj" onClick={() => !startToggle && onChangeStartToggle()}>
                <Image src={startToggle ? goBtn : startBtn} className="join" alt="start button" />
            </div>
            <div className="board_bg obj ">
                <Image src={board} alt="board background" />
            </div>

            <div
                onAnimationEnd={() =>
                    Modal.confirm({
                        content: <div>{selectData?.value}!</div>,
                        onOk() {
                            window.location.reload();
                        },
                    })
                }
                className={`board_on obj `}
                css={css`
                    ${startToggle &&
                    css`
                        @keyframes spin {
                            100% {
                                transform: rotate(${selectData?.degree ? selectData?.degree + 1800 : 0}deg);
                            }
                        }
                        animation-duration: 2s;
                        animation-name: spin;
                        animation-fill-mode: forwards;
                    `}
                `}
            />

            <div className="board_arrow obj">
                <Image src={arrow} alt="arrow" />
            </div>
        </article>
    );
}

const rouletteStyle = css`
    width: 934px;
    height: 671px;
    margin: 0 auto;
    text-align: center;
    padding-top: 20px;
    position: relative;

    .obj {
        position: absolute;
    }

    .board_start {
        width: 177px;
        height: 177px;
        top: 295px;
        left: 385px;
        z-index: 5;
        cursor: pointer;
    }

    .board_bg {
        width: 508px;
        height: 508px;
        top: 140px;
        left: 220px;
        z-index: 2;
    }

    .board_on {
        width: 415px;
        height: 415px;
        top: 175px;
        left: 265px;
        z-index: 3;
        background-image: url(/images/roulette_board_on.png);
    }
    .board_arrow {
        width: 90px;
        height: 105px;
        top: 110px;
        left: 425px;
        z-index: 5;
    }

    .go {
        animation: spin 1s infinite linear;
    }
    @keyframes spin {
        from {
            transform: rotateZ(0deg);
        }
        to {
            transform: rotateZ(360deg);
        }
    }
`;
