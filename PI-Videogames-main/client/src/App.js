// Import react utilities:
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import components:
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import VideogameDetail from './components/VideogameDetail/VideogameDetail.jsx';
import CreateVideogame from './components/CreateVideogame/CreateVideogame.jsx';
import EditVideogame from './components/EditVideogame/EditVideogame.jsx'; // TODO: CHEQUEAR

// Import style:
import './App.css';

// Create App component:
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/videogames" component={Home} />
          <Route exact path="/videogames/edit" component={EditVideogame} />
          <Route path="/videogame/:id" component={VideogameDetail} />
          <Route path="/videogames/create" component={CreateVideogame} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
