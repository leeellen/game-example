import Image from 'next/image';
import { DataType, testData } from '@/pages';
import { useRef, useState, useEffect } from 'react';
import ScratchCard from 'react-scratchcard-v2';
import { randomItem, test1 } from './RouletteGame';
import { css } from '@emotion/react';
import { Modal } from 'antd';

import scratchCard from 'public/images/scratchCard.png';
import scratchBackground from 'public/images/scratchBackground.png';

export default function ScratchGame() {
    const ref = useRef<ScratchCard>(null);
    const [selectData, setSelectData] = useState<DataType>();

    useEffect(() => {
        setSelectData(randomItem(test1));
    }, []);

    const onClickReset = () => {
        ref.current && ref.current.reset();
    };

    return (
        <div
            css={css`
                width: fit-content;
                margin: 0 auto;
            `}
        >
            <div
                css={css`
                    position: relative;

                    .background {
                        position: relative;
                    }

                    .scratch {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                `}
            >
                <Image src={scratchBackground} alt="background" className="background" />

                <div className="scratch">
                    <ScratchCard
                        width={555}
                        height={300}
                        image={scratchCard.src}
                        finishPercent={50}
                        onComplete={() => console.log('selectData?.value', selectData?.value)}
                    >
                        <div
                            css={css`
                                background: #faf7ff;
                                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
                                border-radius: 11px;
                                padding: 22px;
                                display: flex;
                                flex-direction: column;
                                gap: 20px;
                                width: 100%;
                                height: 100%;
                                align-items: center;
                                justify-content: center;

                                h3 {
                                    width: 278px;
                                    height: 53px;
                                    background: #8757bb;
                                    border-radius: 36px;
                                    padding: 7px;
                                    font-weight: 700;
                                    font-size: 26px;
                                    line-height: 150%;
                                    text-align: center;
                                    color: #fafafa;
                                }
                                h2 {
                                    font-weight: 700;
                                    font-size: 32px;
                                    line-height: 40px;
                                    text-align: center;
                                    color: #383838;
                                }
                                img {
                                    width: 210px;
                                    height: 210px;
                                }
                            `}
                        >
                            <h3>축하합니다!</h3>
                            <h2>{selectData?.value}</h2>
                            <img src={'https://www.bhc.co.kr/images/new/img_menu.png'} />
                        </div>
                    </ScratchCard>
                </div>
            </div>
        </div>
    );
}
