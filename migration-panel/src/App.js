import React from 'react';
import './App.css';
import Panel from './components/Panel'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {


  return (
    <Router>
            <Switch>
                <Route path="/">
                     <Panel />
                </Route>
            </Switch>
    </Router>
  )
}

export default App
