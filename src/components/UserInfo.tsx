import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Article, FETCH_STATUS } from '../features/types'
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
    
    &:hover {
        cursor: pointer;
    }
`

const ArticleDate = styled.p`
    margin: 0 5px;
    font-size: .75em;
`

const MiniAvatar = styled.img`
    width: 32px;
    border-radius: 32px;
    vertical-align: middle;

    &:hover {
        cursor: pointer;
    }
`

export const UserInfo: React.FC<UserInfoProps> = ({ article, nameColor }) => {

    const userObject = useSelector(getUserByUsername(article.author.username));
    const history = useHistory();

    if (userObject === FETCH_STATUS.PENDING) {
        return <span>Loading...</span>
    }

    if (userObject === FETCH_STATUS.FAILURE) {
        return <span>Error loading user</span>
    }

    if (!userObject) {
        return <span>No such user</span>
    }

    const handleAuthorClick = (e: React.MouseEvent) => {
        history.push(`/user/${userObject.username}`);
    }

    return (
        <UserInfoContainer className="UserInfo">
            <MiniAvatar onClick={handleAuthorClick} src={userObject.avatar} />
            <ArticleInfoContainer>
                <ArticleAuthor onClick={handleAuthorClick} nameColor={nameColor}>{userObject.username}</ArticleAuthor>
                <ArticleDate>{article.date}</ArticleDate>
            </ArticleInfoContainer>
        </UserInfoContainer>
    )
}