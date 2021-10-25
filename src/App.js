import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainHomePage from './components/Home/main';
import MainAboutPage from './components/About/main';
import MainLoginPage from './components/Login/main';
import MainSignUpPage from './components/SignUp/main';
import MainTippingPage from './components/TippingPage/main';
import MainAlertWidget from './components/AlertWidget/main';
import MainHIWPage from './components/HowItsWork/main';
import Main404Page from './components/404/main';
import MainDashboardPage from './components/Dashboard/main';

function App() {
  return (
    <Router>

      <Navbar />

      <Switch>
        <Route exact path="/howitswork">
          <MainHIWPage />
        </Route>
        <Route exact path="/about">
          <MainAboutPage />
        </Route>
        <Route exact path="/:streamerKey/alert">
          <MainAlertWidget />
        </Route>
        <Route exact path="/404">
          <Main404Page />
        </Route>
        <Route exact path="/:streamerKey/:streamerSig/:streamerName">
          <MainTippingPage />
        </Route>
        <Route exact path="/login">
          <MainLoginPage />
        </Route>
        <Route exact path="/signup">
          <MainSignUpPage />
        </Route>
        <Route exact path="/dashboard">
          <MainDashboardPage />
        </Route>
        <Route exact path="/">
          <MainHomePage />
        </Route>
        <Route component={Main404Page} />
      </Switch>
    </Router>
  );
}

export default App;
