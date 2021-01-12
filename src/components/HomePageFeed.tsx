import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { RootState } from '../app/store'
import { Article, ArticlesState, UserState, USER_STATUS } from '../features/types'
import { getUser } from '../features/userSlice'
import { Feed } from './Feed'

const HomePageFeedContainer = styled.div`
`

export const HomePageFeed: React.FC = () => {

    const { tagname } = useParams<{tagname?:string}>();
    const history = useHistory();

    const userObject = useSelector<RootState, UserState>(getUser());

    const [feedLinks, setFeedLinks] = useState(new Map<string, (articles: Article[]) => Article[]>());
    const [firstSelected, setFirstSelected] = useState('Global feed');

    useEffect(() => {
        let feedLinksMap = new Map();
        if (userObject.status !== USER_STATUS.GUEST) {
            feedLinksMap.set('Your feed', (articles: Article[]) => {
                if (tagname) {
                    history.push('/');
                }
                setFirstSelected('Your feed');
                return articles.filter(article => article.author.username === userObject.user.username)
            })
        }
        feedLinksMap.set('Global feed', (articles: Article[]) => {
            if (tagname) {
                history.push('/');
            }
            setFirstSelected('Global feed');
            return articles;
        });
        if (tagname) {
            feedLinksMap.set(tagname, (articles: Article[]) => 
                articles.filter(article => article.tags.includes(tagname)));
        }
        setFeedLinks(feedLinksMap);
    }, [tagname])

    return (
        <Feed feedLinks={feedLinks} firstSelected={tagname || firstSelected} />
    )
}

export {}