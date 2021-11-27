import { FC } from "react";
import styled from "styled-components";

const Dots = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    & div {
        width: 0.8em;
        height: 0.8em;
        border-radius: 50%;
        background-color: #ad5502;
        animation: fade 0.8s ease-in-out alternate infinite;
        margin: 0 5px;
    }

    & div:nth-of-type(1) {
        animation-delay: -0.4s;
    }   

    & div:nth-of-type(2) {
        animation-delay: -0.2s;
    }

    @keyframes fade {
        from {
            opacity: 1;
        } 
        to {
            opacity: 0;
        }
    }
`;

export const LoadingScreen: FC = () => {
    return (
        <Dots>
            <div></div>
            <div></div>
            <div></div>
        </Dots>
    )
};