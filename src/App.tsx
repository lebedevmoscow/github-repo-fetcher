import React from 'react';
import './App.sass';

import {Switch, Route} from 'react-router-dom'

// Components
import Headline from './Components/Headline'
import List from './Components/List'

const App = () => {
  return (
    <div className="app">
      <Route path="/" component={Headline}/>
      <Route path="/:company?/:page?" component={List}/>
    </div>
  )
}

export default App;
