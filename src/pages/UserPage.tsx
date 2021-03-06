import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Feed } from '../components/Feed'

import { Button } from '../components/styled/Button'
import { Content } from '../components/styled/Content'
import { FullWidthContent } from '../components/styled/FullWidthContent'
import { UserPageFeed } from '../components/UserPageFeed'
import { FETCH_STATUS, UserPublicInfo, UserState } from '../features/types'
import { fetchUserPublicInfo, getUserByUsername } from '../features/usersSlice'

interface UserPageProps {
}

const UserPageContainer = styled.div`

    ${FullWidthContent} > ${Content} {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;

        p {
            margin: 5px;
        }

        ${Button} {
            align-self: flex-end;
        }
    }
`

const UserAvatar = styled.img`
    width: 120px;
    border-radius: 120px;
`

export const UserPage: React.FC<UserPageProps> = () => {

    const { username } = useParams<{username: string}>();

    const [userObject, setUserObject] = useState<{username: string, avatar: string, about: string} | null>(null);
    const [loadingStatus, setLoadingStatus] = useState<FETCH_STATUS>(FETCH_STATUS.PENDING)

    useEffect(() => {
        let didCancel = false;
        setLoadingStatus(FETCH_STATUS.PENDING);
        fetchUserPublicInfo(username)
        .then(res => {
            if (!didCancel) {
                setLoadingStatus(FETCH_STATUS.SUCCESS);
                setUserObject(res);
            }
        })
        .catch(err => {
            if (!didCancel) {
                setLoadingStatus(FETCH_STATUS.FAILURE);
            }
        });
        return () => {didCancel = true};
    }, [])


    if (loadingStatus === FETCH_STATUS.PENDING) {
        return <h1>Loading...</h1>
    }

    if (loadingStatus === FETCH_STATUS.FAILURE) {
        return <h1>Error loading user</h1>
    }

    if (!userObject) {
        return <h1>No such user</h1>
    }

    return (
        <UserPageContainer>
            <FullWidthContent>
                <Content>
                    <UserAvatar src={userObject.avatar}/>
                    <h2>{userObject.username}</h2>
                    <p>{userObject.about}</p>
                    <Button outline size='sm'>+ Follow {username}</Button>
                </Content>
            </FullWidthContent>
            <Content>
                <UserPageFeed />
            </Content>
        </UserPageContainer>
    )
}