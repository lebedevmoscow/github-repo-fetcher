import React from 'react';
import './App.sass';

import {Switch, Route} from 'react-router-dom'

// Components
import Headline from './Components/Headline'
import List from './Components/List'

import {SERVER_BASE_URL} from './config'

const App = () => {
  return (
    <div className="app">
      <Route path="/:company?/:page?" component={Headline}/>
      <Route path="/" component={List}/>
    </div>
  )
}

export default App;
