// http://dbins2.speedgabia.com/thl/work/donga_pocari/ice.html

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import { Modal } from 'antd';
import { random } from '@/utils/helper';

import title from 'public/images/ice_title.png';
import start from 'public/images/ice_mask.png';
import ice from 'public/images/ice_ice1.png';
import ice_break from 'public/images/ice_ice2.png';
import gift from 'public/images/ice_back5.png';

const initIce = new Array(40).fill(0).map((e, i) => ({
    id: i,
    visible: true,
}));

export default function IceGame() {
    const [startToggle, setStartToggle] = useState(false);
    const [iceList, setIceList] = useState(initIce);
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
