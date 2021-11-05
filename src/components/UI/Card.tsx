import styled from 'styled-components';
import { FC } from 'react';

const Content = styled.div`
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 14px;
    background-color: white; 
`;

export interface ICardHelper {
    className: any,
}

export const CardHelper: FC<ICardHelper> = (props) => {

    return(
       <Content className={props.className}>{props.children}</Content>
    )
}