import { useState } from "react";

const useInput = (validateValue: (value: any) => boolean) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isInputTouched, setIsInputTouched] = useState(false);

    const enteredValueIsValid = validateValue(enteredValue);
    const enteredValueIsInvalid = !enteredValueIsValid && isInputTouched;

    const valueInputBlurHandler = (event: React.SyntheticEvent) => {
        setIsInputTouched(true);
    };

    const valueInputChangeHandler = (event:  React.ChangeEvent<HTMLInputElement>) => {
        setEnteredValue(event.target.value);
    };

    const reset = () => {
        setEnteredValue('');
        setIsInputTouched(false);
    };

    return {
        value: enteredValue,
        enteredValueIsInvalid,
        enteredValueIsValid,
        valueInputBlurHandler,
        valueInputChangeHandler,
        reset
    }

};

export default useInput