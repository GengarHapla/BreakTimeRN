import { StyleSheet, TextInput } from 'react-native';
import * as React from 'react';
import { INumberInputProps, INumberInputState } from './NumberInput.d';

class NumberInput extends React.Component<INumberInputProps, INumberInputState> {

    constructor(props: INumberInputProps) {
        super(props);

        this.state = {
            value: ''
        };
    }

    onValueChange(change: string) {
        const value = change.replace(/[^0-9]/g, '');
        this.setState({ value });
        this.props.onChange(value);
    }

    render() {
        return (
            <TextInput
                style={styles.textInput}
                keyboardType='numeric'
                underlineColorAndroid='transparent'
                onChangeText={(text: string) => this.onValueChange(text)}
                value={this.state.value}
                placeholder={this.props.placeholder}
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        height: 40,
        padding: 4,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4
    }
});

export default NumberInput;
