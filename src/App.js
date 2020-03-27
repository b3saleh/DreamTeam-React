// App.js
// Hamburger Menu button mechanism based on : https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/
import React, { useState, useRef, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, hashHistory } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from './hooks';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu, About, Signin } from './components';
import './App.css';
import logo from './DreamTeamLogo.PNG';



function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));


  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div>
          
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div>
        <Router>
      <div>
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/SignIn">
            <Signin />
          </Route>
          
        </Switch>
      </div>
    </Router>
      </>
    </ThemeProvider>
  );
}
export default App;