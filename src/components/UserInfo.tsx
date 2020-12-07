import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Article } from '../features/types'
import { getUserByUsername } from '../features/usersSlice'

interface UserInfoProps {
    article: Article;
    nameColor?: string;
}

const UserInfoContainer = styled.div`
    margin-bottom: 15px;
`

const ArticleInfoContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
`

const ArticleAuthor = styled.p<{ nameColor?: string }>`
    color: ${props => props.nameColor || props.theme.primaryColor};
    margin: 0 5px;
    font-size: .875em;
    padding: 0;
`

const ArticleDate = styled.p`
    margin: 0 5px;
    font-size: .75em;
`

const MiniAvatar = styled.img`
    width: 32px;
    border-radius: 32px;
    vertical-align: middle;
`

export const UserInfo: React.FC<UserInfoProps> = ({ article, nameColor }) => {

    const avatarSrc = useSelector(getUserByUsername(article.author.username));

    return (
        <UserInfoContainer className="UserInfo">
            <MiniAvatar src={avatarSrc} />
            <ArticleInfoContainer>
                <ArticleAuthor nameColor={nameColor}>{article.author.username}</ArticleAuthor>
                <ArticleDate>{article.date}</ArticleDate>
            </ArticleInfoContainer>
        </UserInfoContainer>
    )
}