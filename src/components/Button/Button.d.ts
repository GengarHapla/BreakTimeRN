import { ReactChild } from 'react';

export interface IButtonProps {
    onPress: any;
    style?: any;
    disabled?: boolean;
    children: ReactChild;
}
