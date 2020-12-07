import React, { useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import { Navbar } from './components/Navbar'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './app/store';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import { ArticlePage } from './pages/ArticlePage';
import { PostArticlePage } from './pages/PostArticlePage';
import { fetchUsers } from './features/usersSlice';
import { fetchArticles } from './features/articles/articlesSlice';
import { USER_STATUS } from './features/types';
import { UserSettingsPage } from './pages/UserSettingsPage';
import { Content } from './components/styled/Content';
import { Banner, FullWidthContent } from './components/styled/FullWidthContent';


const AppContainer = styled.div`
`

const MainSection = styled(Content)`

    display: flex;
    flex-flow: row nowrap;

    & > div:first-child:not(:only-child) {
        margin-right: 40px
    }

    & > div:only-child {
        
    }
`


export const App: React.FC = () => {

  const userStatus = useSelector<RootState, USER_STATUS>(state => state.user.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchArticles());
  }, [dispatch])

  return (
    <AppContainer>
      <Navbar />
      <Switch>
        <Route exact path="/">
          {userStatus === 'guest' && 
          <Banner>
            <h1>I'm poster</h1>
            <p>A place to share your knowledge.</p>
          </Banner>
          }
          <MainSection>
            <HomePage />
          </MainSection>
        </Route>
        <Route path="/signup">
          <Content>
            <SignUpPage />
          </Content>
        </Route>
        <Route path="/signin">
          <Content>
            <SignInPage />
          </Content>
        </Route>
        <Route path="/article/:articleId">
          <ArticlePage />
        </Route>
        <Route exact path="/create-article">
          <Content>
            <PostArticlePage />
          </Content>
        </Route>
        <Route exact path="/settings">
          <Content>
            <UserSettingsPage />
          </Content>
        </Route>
      </Switch>
    </AppContainer>
  );
}