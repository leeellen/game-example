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

export default function RouletteGame() {
    const [startToggle, setStartToggle] = useState(false);
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
