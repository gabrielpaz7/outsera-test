export interface YearWithMultipleWinners {
    year: number;
    winnerCount: number;
}

export interface StudioWinCount {
    name: string;
    winCount: number;
}

export interface ProducerWinInterval {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}