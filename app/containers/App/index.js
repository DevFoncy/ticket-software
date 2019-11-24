/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import Home from 'containers/Home';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';

import { message } from 'antd';
import GlobalStyle from '../../global-styles';
window.message = message;

const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      {/* <Header/> */}
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/login" />}
          component={HomePage}
        />
        <Route exact path="/catalog" component={Home} />
        <Route path="/features" component={FeaturePage} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      {/* <Footer/> */}
      <GlobalStyle />
    </AppWrapper>
  );
}
