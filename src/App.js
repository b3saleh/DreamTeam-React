// App.js
// Hamburger Menu button mechanism based on : https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/
import React, { useState, useRef, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from './hooks';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu } from './components';
import './App.css';
import logo from './DreamTeamLogo.PNG';
import {Home} from './pages/Home';
import {About} from './pages/About';
import {SignInForm} from './pages/Signin';
import {SignUpForm} from './pages/Signup';
import {Findatryout} from './pages/Findatryout';
import {UserDashboard} from './pages/userDashboard'
import {CreateATryout} from './pages/createatryout'
import {buildTeam} from './pages/buildTeam'
import {TryoutEvaluation} from './pages/tryoutEvaluation'
import {NotFound} from './pages/NotFound';
import {tryoutSignUp} from './pages/tryoutSignUp'
import {signUpSuccess} from './pages/signupSuccessful'
import {TryoutDashboard} from './pages/tryoutDashboard'
import {urlAPI} from "./Constants";
import {buildTeamTest} from './pages/buildTeamTest'



function App() {
  const [open, setOpen] = useState(false);
  const [userID, setUserID] = useState(localStorage.getItem('userID') || 0);
  const [userFirstName, setUserFirstName] = useState(localStorage.getItem('firstName') || "Unknown User");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));


  function completeLogin(returnedID) {
    setUserID(returnedID);
    localStorage.setItem('userID', returnedID);
    const getUserUrl = urlAPI + "getUserInfo/?userID=" + returnedID;
		fetch(getUserUrl)
			.then(res => res.json())
			.then(
				(result) => {
					setUserFirstName(result.firstName);
                    localStorage.setItem('firstName', result.firstName);
                    localStorage.setItem('userEmail', result.email)
				},
				(error) => {
				});
  }


  return (
    
  

    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div>
          <Router>
            <Switch>
              <Route exact path= "/" component={Home}/>
              <Route exact path= "/About" component={About}/>
              <Route exact path= "/SignIn" render={(props) => <SignInForm completeLogin={completeLogin} />} />
              <Route exact path= "/SignUp" component={SignUpForm} />
              <Route exact path= "/FindATryout" component={Findatryout}/>
              <Route exact path= "/user" render={(props) => <UserDashboard userFirstName={userFirstName} userID={userID} />} />
              <Route exact path= "/CreateATryout" render={(props) => <CreateATryout userID={userID} />} />
              <Route exact path= "/BuildTeam" component={buildTeam}/>
              <Route exact path= "/TryoutEvaluation" component={TryoutEvaluation}/>
              <Route exact path= "/TryoutSignUp/:tryoutID" component={tryoutSignUp}/>
              <Route exact path= "/SignupSuccessful" component={signUpSuccess}/>
              <Route exact path= "/TryoutDashboard" component={TryoutDashboard}/>
              <Route exact path= "/BuildTeamTest" component={buildTeamTest}/>
              <Route component={NotFound} />
            </Switch>
          </Router>
          
          
        </div>
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div>
      
      </>
    </ThemeProvider>
  );
}
export default App;