import styled, { css } from "styled-components"


export const Button = styled.button<{ size?: 'sm' | 'md' | 'lg', outline?: boolean }>`

    background-color: ${props => props.outline ? 'transparent' : props.theme.primaryColor};
    border: 1px solid ${props => props.outline ? 'white' : props.theme.primaryColor};
    color: white;
    font-family: inherit;
    outline: none;
    border-radius: 5px;

    ${props => props.size === 'sm' && `font-size: .75em; height: 2em;`}
    ${props => props.size === 'md' && `font-size: 1em; height: 2.5em;`}
    ${props => props.size === 'lg' && `font-size: 1.25em; height: 3em;`}


    &:hover{
        cursor: pointer;
    }
`

Button.defaultProps = {
    size: 'md',
    outline: false
}