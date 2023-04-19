// http://dbins2.speedgabia.com/thl/work/donga_pocari/roulette.html
import { useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import { Modal } from 'antd';
import { DataType } from '@/pages';

import rouletteTitle from 'public/images/roulette_title.png';
import startBtn from 'public/images/roulette_board_start.png';
import goBtn from 'public/images/roulette_board_go.png';
import board from 'public/images/roulette_board_bg.png';
import arrow from 'public/images/roulette_board_arrow.png';
import { random } from '@/utils/helper';

export const randomItem = (itemsList: DataType[]) => {
    let chances = [];

    const totalPercent = itemsList.reduce((prev, curr) => prev + curr.percent, 0);

    let acc = 0;
    chances = itemsList.map(({ percent }) => (acc = percent + acc));

    const rand = Math.random() * totalPercent;

    const itemIndex = chances.filter((el) => el <= rand).length;

    return itemsList.find((_, index) => index === itemIndex);
};

const testData = [
    {
        minDegree: 341,
        maxDegree: 17,
        degree: 1,
        value: '포카리스웨트 분말',
        percent: 15,
    },

    // {
    //     minDegree: 341,
    //     maxDegree: 17,
    //     degree: 1,
    //     value: '포카리스웨트 분말',
    //     percent: 15,
    // },
    // {
    //     minDegree: 18,
    //     maxDegree: 53,
    //     degree: 37,
    //     value: '포카리스웨트 메트',
    //     percent: 0,
    // },
    // {
    //     minDegree: 54,
    //     maxDegree: 88,
    //     degree: 75,
    //     value: '포카리스웨트 가방',
    //     percent: 3,
    // },
    // {
    //     minDegree: 89,
    //     maxDegree: 125,
    //     degree: 100,
    //     value: '꽝',
    //     percent: 20,
    // },
    // {
    //     minDegree: 126,
    //     maxDegree: 160,
    //     degree: 150,
    //     value: '포카리스웨트 텀블러',
    //     percent: 5,
    // },
    // {
    //     minDegree: 161,
    //     maxDegree: 196,
    //     degree: 177,
    //     value: '포카리스웨트 분말',
    //     percent: 15,
    // },
    // {
    //     minDegree: 197,
    //     maxDegree: 232,
    //     degree: 215,
    //     value: '포카리스웨트 비치 타월',
    //     percent: 7,
    // },
    // {
    //     minDegree: 233,
    //     maxDegree: 268,
    //     degree: 255,
    //     value: '포카리스웨트 미니 분말',
    //     percent: 10,
    // },
    // {
    //     minDegree: 269,
    //     maxDegree: 304,
    //     degree: 280,
    //     value: '꽝',
    //     percent: 20,
    // },
    // {
    //     minDegree: 305,
    //     maxDegree: 340,
    //     degree: 327,
    //     value: '포카리스웨트 텀블러',
    //     percent: 5,
    // },
];
export const test1 = [
    {
        minDegree: 301,
        maxDegree: 360,
        degree: random(301, 360),
        value: '다음 기회에',
        percent: 30,
    },
    {
        minDegree: 1,
        maxDegree: 60,
        degree: random(1, 60),
        value: 'BHC 뿌링클',
        percent: 15,
    },
    {
        minDegree: 61,
        maxDegree: 120,
        degree: random(61, 120),
        value: '에어팟 프로 2세대',
        percent: 1,
    },
    {
        minDegree: 121,
        maxDegree: 180,
        degree: random(121, 180),
        value: '스타벅스 아메리카노',
        percent: 12,
    },
    {
        minDegree: 181,
        maxDegree: 240,
        degree: random(181, 240),
        value: '다음 기회에',
        percent: 30,
    },
    {
        minDegree: 241,
        maxDegree: 300,
        degree: random(241, 300),
        value: '오로나민 씨',
        percent: 12,
    },
];
export default function RouletteGame() {
    const [startToggle, setStartToggle] = useState(false);
    const [selectData, setSelectData] = useState<DataType>();

    // console.log('selectData?.degree', selectData?.degree + 360);

    const onChangeStartToggle = () => {
        setStartToggle(!startToggle);
        setSelectData(randomItem(test1));
    };

    return (
        <div css={tempCss}>
            <div className="background">
                <ul
                    onAnimationEnd={() =>
                        Modal.confirm({
                            content: <div>{selectData?.value}!</div>,
                            onOk() {
                                window.location.reload();
                            },
                        })
                    }
                    css={css`
                        ${startToggle &&
                        css`
                            @keyframes spin {
                                100% {
                                    transform: rotate(${selectData?.degree ? selectData?.degree + 1800 : 0}deg);
                                }
                            }
                            animation-duration: 3s;
                            animation-name: spin;
                            animation-fill-mode: forwards;
                        `}
                    `}
                >
                    <li className="one">
                        <div className="text">다음 기회에</div>
                    </li>
                    <li className="two">
                        <div className="text">
                            <div
                                css={css`
                                    display: flex;
                                    flex-direction: column;
                                    gap: 15px;
                                    align-items: center;
                                `}
                            >
                                오로나민 씨
                                <Image src={arrow} alt="pin" />
                            </div>
                        </div>
                    </li>
                    <li className="three">
                        <div className="text">다음 기회에</div>
                    </li>
                    <li className="four">
                        <div className="text">
                            <div
                                css={css`
                                    display: flex;
                                    flex-direction: column;
                                    gap: 15px;
                                    align-items: center;
                                `}
                            >
                                스타벅스 아메리카노
                                <Image src={arrow} alt="pin" />
                            </div>
                        </div>
                    </li>
                    <li className="five">
                        <div className="text">에어팟 프로 2세대</div>
                    </li>
                    <li className="six">
                        <div className="text">
                            <div
                                css={css`
                                    display: flex;
                                    flex-direction: column;
                                    gap: 15px;
                                    align-items: center;
                                `}
                            >
                                BHC 뿌링클
                                <Image src={arrow} alt="pin" />
                            </div>
                        </div>
                    </li>
                </ul>

                <Image className="pin" src={arrow} alt="pin" />
                <div className="start" onClick={() => !startToggle && onChangeStartToggle()}>
                    <button>{startToggle ? 'GO!' : 'START'}</button>
                </div>
            </div>
        </div>
    );
}

const tempCss = css`
    .background {
        background: #f7fafd;
        width: fit-content;
        height: fit-content;
        padding: 25px;
        margin: 0 auto;
        border-radius: 50%;
        position: relative;
    }
    ul {
        width: 475px;
        height: 475px;
        position: relative;
        border-radius: 50%;
        overflow: hidden;
    }

    li {
        height: 50%;
        width: 275px;
        clip-path: polygon(100% 0%, 50% 100%, 0% 0%);
        position: absolute;
        transform: translateX(-50%);
        transform-origin: bottom;
        left: 21%;
        display: flex;
        justify-content: center;
        padding: 8%;
    }

    .one {
        background: #492ce9;
        transform: rotate(30deg);
    }
    .two {
        transform: rotate(90deg);
        background: #fff;
    }
    .three {
        transform: rotate(150deg);
        background: #492ce9;
    }
    .four {
        transform: rotate(210deg);
        background: #fff;
    }
    .five {
        transform: rotate(270deg);
        background: #492ce9;
    }
    .six {
        transform: rotate(330deg);
        background: #fff;
    }

    .text {
        font-weight: 700;
        font-size: 20px;
        line-height: 25px;
        text-align: center;
        color: #ffffff;
        line-height: 25px;
    }

    .two .text,
    .four .text,
    .six .text {
        color: #000;
    }

    .pin {
        position: absolute;
        top: 8%;
        left: 50.5%;
        transform: translate(-50%, -50%);
    }
    .start {
        background: #f7fafd;
        width: fit-content;
        height: fit-content;
        padding: 15px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .start button {
        font-size: 20px;
        font-weight: 700;
        color: #fff;
        background: #492ce9;
        width: 115px;
        height: 115px;
        border-radius: 50%;
        transition: all 0.3s;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25), inset 3px 4px 3px rgba(255, 255, 255, 0.25);
    }
    .start button:active {
        transform: scale(0.95);
    }
`;

function RouletteGame1() {
    const [startToggle, setStartToggle] = useState(false);
    const [selectData, setSelectData] = useState<DataType>();

    console.log('selectData', selectData);

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
