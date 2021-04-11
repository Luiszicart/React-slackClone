import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'

import Header from './components/Header';
import Sidebar from './components/SideBar';
import Chat from './components/Chat'
import Login from './components/Login'

function App() {
  const [user, loading] = useAuthState(auth)

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
  </div>
);
}

export default App;

const AppBody = styled.div `
  display: flex;
  height: 100vh;  
`

