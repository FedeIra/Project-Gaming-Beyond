// import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import VideogameDetail from './components/VideogameDetail/VideogameDetail.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/videogames" component={Home} />
          <Route path="/videogame/:id" component={VideogameDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
