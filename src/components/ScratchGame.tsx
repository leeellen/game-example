import { DataType, testData } from '@/pages';
import { useRef, useState, useEffect } from 'react';
import ScratchCard from 'react-scratchcard-v2';

const IMG =
    'https://plus.unsplash.com/premium_photo-1681140029775-36a657447c4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80';

export default function ScratchGame() {
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
