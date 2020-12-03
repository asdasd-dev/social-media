import React, { useState } from 'react'
import styled from 'styled-components'
import { Feed } from '../components/Feed';
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

    const [selectedTag, setSelectedTag] = useState<string | undefined>();

    return (
        <HomePageContainer>
            <Feed selectedTag={selectedTag} removeTag={() => setSelectedTag(undefined)}/>
            <Tags onTagSelect={tagName => setSelectedTag(tagName)}/>
        </HomePageContainer>
    )
}