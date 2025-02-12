import React from 'react';
import {Button} from '@heroui/button'
interface ButtonProps {
    label: string;
    onPress: () => void;
    disabled?: boolean;
}

const ButtonComp: React.FC<ButtonProps> = ({ label, onPress, disabled = false }) => {
    return (
        <Button
            onPress={onPress}
            disabled={disabled}
            className="hero-button"
        >
            {label}
        </Button>
    );
};

export default ButtonComp;