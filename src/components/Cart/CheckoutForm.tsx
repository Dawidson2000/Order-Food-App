import React, { FC, useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/use-input";

const Form = styled.form`

`;

const ControlGroup = styled.div`
    & div {
        display: flex;
        justify-content: flex-end;
    }
    & div button {
            font: inherit;
            cursor: pointer;
            background-color: #8a2b06;
            border: 1px solid #8a2b06;
            color: white;
            padding: 0.25rem 2rem;
            border-radius: 20px;
            font-weight: bold;
            margin: 5px;

            &:hover, &:active {
                background-color: #641e03;
                border-color: #641e03;
            }
            
            &:disabled {
                background-color: gray;
                border-color: gray;
            }
        }
`;

export interface IControl{
    isValid: boolean
}

const Control = styled.div<IControl>`
    margin: 15px 0;
    display: flex;
    flex-direction: column;

    & input {
        max-width: 80%;
        width: 20rem;
        height: 2rem;
        border-radius: 10px;
        outline: none;
        border: 1px solid grey;
        padding: 0 10px;
        font: inherit;
        background-color: ${props => props.isValid ? 'transparent' : '#fddddd'};
    }

    & label {
       font-weight: 700;
       margin: 3px 0;
    }

    & p {
        color: red;
        margin: 3px;
        text-align: left;
        width: 100%;
    }
`;

export interface ICheckoutForm {
    onClose: () => void,
    onConfirm: (checkoutData: CheckoutData) => void
}

export type CheckoutData = {
    name: string,
    street: string,
    postalCode: string,
    city: string
}

export const CheckoutForm: FC<ICheckoutForm> = (props) => {

    const {
        value: enteredStreet,
        enteredValueIsValid: enteredStreetIsValid,
        valueInputBlurHandler: streetInputBlurHandler,
        valueInputChangeHandler: streetInputChangeHandler,
        reset: resetStreetInput,
        enteredValueIsInvalid: enteredStreetIsInvalid
    } = useInput(enteredStreet => enteredStreet.trim() !== '');

    const {
        value: enteredName,
        enteredValueIsValid: enteredNameIsValid,
        valueInputBlurHandler: nameInputBlurHandler,
        valueInputChangeHandler: nameInputChangeHandler,
        reset: resetNameInput,
        enteredValueIsInvalid: enteredNameIsInvalid
    } = useInput(enteredName => enteredName.trim() !== '');

    const {
        value: enteredPostalCode,
        enteredValueIsValid: enteredPostalCodeIsValid,
        valueInputBlurHandler: postalCodeInputBlurHandler,
        valueInputChangeHandler: postalCodeInputChangeHandler,
        reset: resetPostalCodeInput,
        enteredValueIsInvalid: enteredPostalCodeIsInvalid
    } = useInput(enteredPostalCode => enteredPostalCode.trim() !== '');

    const {
        value: enteredCity,
        enteredValueIsValid: enteredCityIsValid,
        valueInputBlurHandler: cityInputBlurHandler,
        valueInputChangeHandler: cityInputChangeHandler,
        reset: resetCityInput,
        enteredValueIsInvalid: enteredCityIsInvalid
    } = useInput(enteredCity => enteredCity.trim() !== '');

    let formIsValid = false;

    if (enteredNameIsValid && enteredCityIsValid && enteredPostalCodeIsValid && enteredStreetIsValid) {
        formIsValid = true;
    }

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (!enteredNameIsValid && !enteredCityIsValid && !enteredPostalCodeIsValid && !enteredStreetIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        } as CheckoutData);

        resetCityInput();
        resetNameInput();
        resetStreetInput();
        resetPostalCodeInput();
    };

    return (
        <Form>
            <ControlGroup>
                <Control isValid={enteredNameIsInvalid? false : true}>
                    <label htmlFor='name'>Your Name</label>
                    <input type='text' id='name' onBlur={nameInputBlurHandler} onChange={nameInputChangeHandler} value={enteredName} />
                    {enteredNameIsInvalid && <p>Name is invalid</p>}
                </Control>
                <Control isValid={enteredStreetIsInvalid? false : true}>
                    <label htmlFor='street'>Street</label>
                    <input type='text' id='street' onBlur={streetInputBlurHandler} onChange={streetInputChangeHandler} value={enteredStreet} />
                    {enteredStreetIsInvalid && <p>Street is invalid</p>}
                </Control>
                <Control isValid={enteredPostalCodeIsInvalid? false : true}>
                    <label htmlFor='postalCode'>Postal Code</label>
                    <input type='text' id='postalCode' onBlur={postalCodeInputBlurHandler} onChange={postalCodeInputChangeHandler} value={enteredPostalCode} />
                    {enteredPostalCodeIsInvalid && <p>Postal Code is invalid</p>}
                </Control>
                <Control isValid={enteredCityIsInvalid? false : true}>
                    <label htmlFor='city'>City</label>
                    <input type='text' id='namcitye' onBlur={cityInputBlurHandler} onChange={cityInputChangeHandler} value={enteredCity} />
                    {enteredCityIsInvalid && <p>City is invalid</p>}
                </Control>
                <div>
                    <button type='submit' onClick={submitHandler} disabled={!formIsValid}>Confirm</button>
                    <button type='button' onClick={props.onClose}>Close</button>
                </div>
            </ControlGroup>
        </Form>
    )
};