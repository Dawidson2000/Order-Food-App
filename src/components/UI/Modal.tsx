import React, { FC } from "react";
import ReactDOM from 'react-dom';
import styled from "styled-components";

const BackdropDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.75);    
`;

const ModalDiv = styled.div`
    position: fixed;
    top: 20vh;
    left: 20%;
    width: 60%;
    background-color: white;
    padding: 1rem;
    border-radius: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    z-index: 30;
    animation: slide-down 300ms ease-out forwards;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 65%;

    & p {
        width: 100%;
        text-align: center;
    }

    @keyframes slide-down {
        from {
            opacity: 0;
            transform: translateY(-3rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }  
`;

export interface IBackdrop {
    onClick: () => void
}

const Backdrop: FC<IBackdrop> = (props) => {
    return <BackdropDiv onClick={props.onClick}/>
};

const ModalOverlay: FC = (props: any) => {
    return <ModalDiv>
        {props.children}
    </ModalDiv>
}

const OverlayElement = document.getElementById('overlays') as HTMLElement;

export interface IModal {
    onClick: () => void
}

export const Modal: FC<IModal> = (props) => {
    return <>
    {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick}/>, OverlayElement
    )}
    {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>, OverlayElement
    )}
    </>
};