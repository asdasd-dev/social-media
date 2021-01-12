import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Article } from '../features/types'
import { Feed } from './Feed'

const UserPageFeedContainer = styled.div`
`

export const UserPageFeed: React.FC = () => {

    const {username} = useParams<{username?: string}>();

    const [feedLinks, setFeedLinks] = useState(new Map<string, (articles: Article[]) => Article[]>());
    useEffect(() => {
        if (username) {
            let feedLinksMap = new Map();
            feedLinksMap.set('Articles', (articles: Article[]) => 
                articles.filter(article => article.author.username === username))
            setFeedLinks(feedLinksMap);
        }
    }, [username])


    return (
        <Feed feedLinks={feedLinks} firstSelected='Articles'/>
    )
}