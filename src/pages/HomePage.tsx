import React, { useState } from 'react'
import styled from 'styled-components'
import { Feed } from '../components/Feed';
import { HomePageFeed } from '../components/HomePageFeed';
import { Tags } from '../components/Tags';

const HomePageContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;

    & > div:first-child {
        flex: 4;
        margin-right: 20px;
    }

    & > div:last-child {
        flex: 1;
    }
`

interface HomePageProps {

}

export const HomePage: React.FC<HomePageProps> = () => {
    return (
        <HomePageContainer>
            <HomePageFeed />
            <Tags />
        </HomePageContainer>
    )
}