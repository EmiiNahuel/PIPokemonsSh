import './App.css';
import React from 'react'
import { Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home'
import Navbar from './components/Navbar';
import CreatePokemon from './components/CreatePokemon';
import DetailsPokemon from './components/DetailsPokemon';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path={'/home'}>
        <Navbar />
          <Home />
        </Route>
        <Route path='/createPokemon'>
          <CreatePokemon/>
        </Route>
        <Route path='/detailsPokemon/:id'>
          <DetailsPokemon/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
