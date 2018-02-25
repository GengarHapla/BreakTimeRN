export interface ITimerButtonContainerProps {
    style: any;
    ringingMode: boolean;
    time: { workTime: string, breakTime: string};
}

export interface ITimerButtonContainerState {
    isPlaying: boolean;
    workTimeoutActive: boolean;
    breakTimeoutActive: boolean;
}
