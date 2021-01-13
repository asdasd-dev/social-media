import styled from "styled-components"

export const FullWidthContent = styled.div`
    color: white;
    background-color: ${props => props.theme.primaryColor};
    box-shadow: inset 0 0 10px rgba(0,0,0,.4);
    padding: 5px;
`

export const ArticleHeader = styled(FullWidthContent)`
    background-color: #494949;

    h1 {
      margin-bottom: 20px;
    }
`

export const Banner = styled(FullWidthContent)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
`