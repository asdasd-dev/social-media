import styled from "styled-components"

export const Input = styled.input`
    font-size: 1.25em;
    height: 40px;
    padding: 0 20px;
    font-family: inherit;
    border-radius: 5px;
    outline: none;
    border: 1px solid grey;
    color: inherit;
    &::placeholder {
        opacity: .5;
    }
`