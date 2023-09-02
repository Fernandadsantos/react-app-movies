import React from "react";
import './DefaultInput.scss';

interface inputProps {
    type: string;
    inputName: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    value: string;
    placeholder: string;
}

function DefaultInput({ type, inputName, value, onChange,placeholder }: inputProps) {

    return (
        <input
            className="genericInput"
            type={type}
            name={inputName}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )

}

export default DefaultInput;