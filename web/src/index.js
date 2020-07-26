import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Login from './pages/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import {ThemeProvider} from 'styled-components';
import {theme} from './styles/Theme';
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/home" exact={true} component={App} />

      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

