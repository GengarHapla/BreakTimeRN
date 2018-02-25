import * as React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import NumberInput from './components/NumberInput/NumberInput';
import { TimerButtonContainer } from './components/TimerButtonContainer/TimerButtonContainer';
import { IRootState } from './Root.d';

export default class Root extends React.Component<any, IRootState> {

    constructor(props: any) {
        super(props);

        this.state = {
            workTime: '',
            breakTime: '',
            ringMode: true
        };
    }

    onWorkTimeChanged(workTime: string) {
        this.setState({
            ...this.state,
            workTime
        });
    }

    onBreakTimeChanged(breakTime: string) {
        this.setState({
            ...this.state,
            breakTime
        })
    }

    onRingingModeSwitch(ringMode: any) {
        this.setState({
            ...this.state,
            ringMode
        })
    }

    render() {
        const { workTime, breakTime } = this.state;
        const timer = { workTime, breakTime };

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Break time tracker</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>Working minutes</Text>
                    <NumberInput
                        onChange={this.onWorkTimeChanged.bind(this)}
                        placeholder={'55'}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Break minutes</Text>
                    <NumberInput
                        onChange={this.onBreakTimeChanged.bind(this)}
                        placeholder={'5'}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Ringing mode</Text>
                    <Switch
                        value={this.state.ringMode}
                        onValueChange={this.onRingingModeSwitch.bind(this)}/>
                </View>
                <View style={styles.row}>
                    <TimerButtonContainer
                        style={styles.button}
                        ringingMode={this.state.ringMode}
                        time={timer}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 40
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 32,
        marginBottom: 40
    },
    text: {
        marginRight: 30
    },
    button: {
        flex: 1,
        backgroundColor: 'green'
    }
});
