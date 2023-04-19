import { useState } from 'react';
import Head from 'next/head';
import { Radio } from 'antd';
import IceGame from '@/components/IceGame';
import ScratchGame from '@/components/ScratchGame';
import RouletteGame from '@/components/RouletteGame';

export const testData = [
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

export type DataType = {
    minDegree: number;
    maxDegree: number;
    degree: number;
    percent: number;
    value: string;
};

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
