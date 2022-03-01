import { TRoundImageProps } from "./round-image.definition";
import styled from "styled-components";
import styles from "../../styles/style.config.json"

export const RoundPhoto = styled.div<TRoundImageProps>`
    width: ${props => props.diameter}px;
    height: ${props => props.diameter}px;
    aspect-ratio: 1/1;
    border-radius: 100%;
    background: url(${props => props.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

::after{
    content: "${props => props.caption}";
    color: ${styles.colors.black};
    position: relative;
    transform: translateY(110%);
    font-weight: 600;
}
`