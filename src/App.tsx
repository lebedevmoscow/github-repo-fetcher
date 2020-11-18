import React from 'react';
import './App.sass';

// Components
import Headline from './Components/Headline'
import List from './Components/List'

const App = () => {
  return (
    <div className="app">
      <Headline />
      <List />
    </div>
  )
}

export default App;
