import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Modal, Radio } from 'antd';
import Image from 'next/image';

export default function Home() {
    const [type, setType] = useState('roulette');

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
                    <Radio.Button className="w-[150px] text-center" value="ice">
                        얼음 깨기
                    </Radio.Button>
                    <Radio.Button className="w-[150px] text-center" value="roulette">
                        룰렛
                    </Radio.Button>
                </Radio.Group>

                {type === 'ice' && <IceGame />}
                {type === 'roulette' && <RouletteGame />}
            </main>
        </>
    );
}

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

// http://dbins2.speedgabia.com/thl/work/donga_pocari/ice.html
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
            alert('종료!');
            window.location.reload();
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
            alert('완료!');
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
                                        opacity: ${e.visible ? 1 : 0};
                                        ${!e.visible &&
                                        css`
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

import { random } from '@/utils/helper';

import rouletteTitle from 'public/images/roulette_title.png';
import startBtn from 'public/images/roulette_board_start.png';
import goBtn from 'public/images/roulette_board_go.png';
import board from 'public/images/roulette_board_bg.png';
import arrow from 'public/images/roulette_board_arrow.png';

function RouletteGame() {
    const [startToggle, setStartToggle] = useState(false);
    const [seconds, setSeconds] = useState(random(1, 5));
    const [degree, setDegree] = useState(0);
    let timer: any;
    let secondeTimer: any;

    const temp = ['가루', '돗자리', '가방', '꽝', '병', '가루', '타월', '포', '꽝', '병'];

    useEffect(() => {
        if (seconds === 0) {
            console.log('RESULT', Math.round(degree / 36));
            return clearInterval(timer);
        }

        if (startToggle) {
            timer = setInterval(() => {
                if (degree >= 360) {
                    setDegree(0);
                    return;
                }
                setDegree(degree + 1);
            });
        }

        return () => {
            clearInterval(timer);
        };
    }, [degree, startToggle]);

    useEffect(() => {
        if (seconds === 0) {
            Modal.confirm({
                content: <div>{temp[Math.round(degree / 36)]}</div>,
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

    const onChangeStartToggle = () => {
        setStartToggle(!startToggle);
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
                className={`board_on obj `}
                css={css`
                    ${startToggle &&
                    css`
                        transform: rotate(${degree}deg);
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
