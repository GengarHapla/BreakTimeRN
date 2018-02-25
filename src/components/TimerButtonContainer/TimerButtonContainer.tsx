import React from 'react';
import { StyleSheet, Text, Vibration } from 'react-native';
import { ITimerButtonContainerProps, ITimerButtonContainerState } from './TimerButtonContainer.d';
import { Audio } from 'expo';
import { Button } from '../Button/Button';

export class TimerButtonContainer extends React.Component<ITimerButtonContainerProps, ITimerButtonContainerState> {
    soundObject = new Audio.Sound();
    breakTimeTimeout: any;
    workTimeTimeout: any;

    constructor(props: any) {
        super(props);

        this.state = {
            isPlaying: false,
            workTimeoutActive: false,
            breakTimeoutActive: false
        };
    }

    componentWillMount() {
        this.preloadSound();
    }

    componentWillUnmount() {
        clearTimeout(this.workTimeTimeout);
        clearTimeout(this.breakTimeTimeout);
    }

    async preloadSound() {
        try {
            await this.soundObject.loadAsync({
                uri: 'http://www.slspencer.com/Sounds/Sound.mp3'
            });
        } catch (error) {
            console.log(error);
        }
    }

    onStartPress() {
        this.setupWorkTimeout(this.props.time.workTime)
    }

    getTimeoutForNotificationPlay(time: number) {
        return setTimeout(() => {
            this.playNotification();
        }, time * 1000 * 60);
    }

    setupWorkTimeout(workTime: string) {
        this.setState({
            ...this.state,
            workTimeoutActive: true
        });
        this.workTimeTimeout = this.getTimeoutForNotificationPlay(+workTime);
    }

    setupBreakTimeout(breakTime: string) {
        this.setState({
            ...this.state,
            breakTimeoutActive: true
        });
        this.breakTimeTimeout = this.getTimeoutForNotificationPlay(+breakTime);
    }

    async playNotification() {
        try {
            if (this.props.ringingMode) {
                await this.soundObject.playAsync();
                await this.soundObject.setIsLoopingAsync(true);
            } else {
                Vibration.vibrate([1000, 2000, 1000], true);
            }
            this.setState({
                isPlaying: true
            });
        } catch (error) {
            console.log(error);
        }
    }

    async stopNotification() {
        try {
            if (this.props.ringingMode) {
                await this.soundObject.stopAsync();
            } else {
                Vibration.cancel();
            }
            this.setState({
                isPlaying: false
            });
        } catch (error) {
            console.log(error);
        }
    }

    onStopPress() {
        this.stopNotification().then(() => {
            if (this.state.workTimeoutActive) {
                clearTimeout(this.workTimeTimeout);
                this.setState({
                    ...this.state,
                    workTimeoutActive: false
                });
                this.setupBreakTimeout(this.props.time.breakTime);
            } else {
                clearTimeout(this.breakTimeTimeout);
                this.setState({
                    ...this.state,
                    breakTimeoutActive: false
                });
            }
        });
    }

    getMessage() {
        if (this.state.isPlaying) {
            return `End ${this.state.workTimeoutActive ? `work` : `break`} time`;
        } else {
            return `Start timer`;
        }
    }

    render() {
        const { isPlaying, workTimeoutActive, breakTimeoutActive } = this.state;
        const { style } = this.props;
        const message = this.getMessage();

        if ((workTimeoutActive || breakTimeoutActive) && !isPlaying) {
            return null;
        } else {
            return (
                <Button
                    onPress={isPlaying ?
                        this.onStopPress.bind(this)
                        :
                        this.onStartPress.bind(this)
                    }
                    style={style}>
                    <Text style={styles.boldText}>{message}</Text>
                </Button>
        );
        }
    }
}

const styles = StyleSheet.create({
    boldText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});
