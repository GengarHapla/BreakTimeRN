import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IButtonProps } from './Button.d';

export const Button = ({ children, onPress, style, disabled }: IButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, ...style]}
            disabled={disabled}
        >
            {children}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        padding: 6,
        borderRadius: 4,
        opacity: 0.8,
        alignItems: 'center',
    }
});
