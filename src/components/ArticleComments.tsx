import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from './styled/Button'
import { ArticleComment, PageStatus } from '../types'
import { postComment } from '../features/articles/articlesSlice'
import { useAppDispatch } from '../app/store'
import { current } from '@reduxjs/toolkit'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUser } from '../features/userSlice'
import { USER_STATUS } from '../features/types'

const ArticleCommentsContainer = styled.div`
`

const CommentContainer = styled.div`
    max-width: 500px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    margin: 0 auto 20px;
`

const CommentTop = styled.div`
    textarea {
        border: none;
        padding: 20px;
        border-radius: 5px;
        height: 150px;
        resize: vertical;
        outline: none;
        width: 100%;
    }
    & > * {
        min-height: 50px;
        padding: 20px;
        margin: 0;
    }
`

const CommentBottom = styled.div`
    background-color: lightgrey;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CommentMeta = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: 50%;
    justify-content: flex-start;
    & > * {
        margin: 0 5px;
        vertical-align: middle;
    }
`

const CommentAuthor = styled.a`
    &:hover {
        cursor: pointer;
    }
    color: ${props => props.theme.primaryColor};
`

const CommentDate = styled.span`
`

const Pages = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const PageNumberLink = styled.a<{selected: boolean}>`
    margin: 5px;
    color: ${props => props.selected ? 'lightgrey' : props.theme.primaryColor};

    &:hover {
        ${props => !props.selected && `cursor: pointer;`}
    }
`

interface ArticleCommentsProps {
    articleId: string;
    articleComments: ArticleComment[];
    onPostComment: () => void;
}

export const ArticleComments: React.FC<ArticleCommentsProps> = ({ articleId, articleComments, onPostComment }) => {

    const dispatch = useAppDispatch();
    const history = useHistory();

    const user = useSelector(getUser());

    const [commentInput, setCommentInput] = useState<string>('');
    const [commentsPage, setCommentsPage] = useState<number>(0);

    function handlePostComment() {
        if (!commentInput) {
            return;
        }

        dispatch(postComment({articleId, text: commentInput}))
            .then(() => onPostComment());
    }

    const totalPages = Math.ceil(articleComments.length / 5);

    const currentComments = [];
    for (let i = commentsPage * 5; i < Math.min((commentsPage + 1) * 5, articleComments.length); i++) {
        const currentComment = articleComments[i];
        let date = new Date(currentComment.date);
        let dateString = date.getDate() + ' ' + date.toLocaleString('default', { month: 'short' }) + ', ' + date.getFullYear();
        currentComments.push(
            <CommentContainer>
                <CommentTop>
                    <p>
                        {currentComment.text}
                    </p>
                </CommentTop>
                <CommentBottom>
                    <CommentMeta>
                        <CommentAuthor onClick={() => history.push(`/user/${currentComment.username}`)}>{currentComment.username}</CommentAuthor>
                        <CommentDate>{dateString}</CommentDate>
                    </CommentMeta>
                    <div>
                        {user.status !== USER_STATUS.GUEST && user.user.username === currentComment.username &&
                            <Button size="sm">Remove</Button>
                        }
                    </div>
                </CommentBottom>
            </CommentContainer>
        )
    }
    
    return (
        <ArticleCommentsContainer>
            <CommentContainer>
                <CommentTop>
                    <textarea value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
                </CommentTop>
                <CommentBottom>
                    <div>
                        <Button size="sm" onClick={handlePostComment}>Post comment</Button>
                    </div>
                </CommentBottom>
            </CommentContainer>
            {currentComments}
            <Pages>
                {Array(totalPages).fill(null).map((item, index) => {
                    return (
                        <PageNumberLink selected={index === commentsPage}
                            onClick={() => setCommentsPage(index)}>
                                {index + 1}
                        </PageNumberLink>
                    )
                })}
            </Pages>
        </ArticleCommentsContainer>
    )
}