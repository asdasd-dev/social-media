import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Header } from './components/Header'
import { Navbar } from './components/Navbar'
import { MainSection } from './components/MainSection'


const AppContainer = styled.div`
`

export const App: React.FC = () => {
  return (
    <AppContainer>
      <Navbar />
      <Header />
      <MainSection />
    </AppContainer>
  );
}