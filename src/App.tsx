import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Navbar } from './components/Navbar'
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { User } from './features/userSlice';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import { ArticlePage } from './pages/ArticlePage';


const AppContainer = styled.div`
`

export const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
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

const Header = styled.div`
    color: white;
    background-color: ${props => props.theme.primaryColor};
    box-shadow: inset 0 0 10px rgba(0,0,0,.4);

    h1 {
        margin: 0;
    }
`

export const ArticleHeader = styled(Header)`
    background-color: grey;
    padding: 5px;

    h1 {
      margin-bottom: 20px;
    }
`

const BannerHeader = styled(Header)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
`

export const App: React.FC = () => {

  const user = useSelector<RootState, User>(state => state.user);

  return (
    <AppContainer>
      <Navbar />
      <Switch>
        <Route exact path="/">
          {user.type === 'guest' && 
          <BannerHeader>
            <Content>
              <h1>I'm poster</h1>
              <p>A place to share your knowledge.</p>
            </Content>
          </BannerHeader>
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
      </Switch>
    </AppContainer>
  );
}