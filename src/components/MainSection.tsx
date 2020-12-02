import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../app/store';
import { Feed } from './Feed';
import { Tags } from './Tags';

const MainSectionContainer = styled.section`
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    display: flex;
    flex-flow: row nowrap;

    & > div:first-child {
        margin-right: 40px
    }
`

const Main = styled.div`
    flex: 4;
`

const Aside = styled.div`
    flex: 1;
`

export const MainSection: React.FC = () => {

    return (
        <MainSectionContainer>
            <Main>
                <Feed />
            </Main>
            <Aside>
                <Tags />
            </Aside>
        </MainSectionContainer>
    )
}