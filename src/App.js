import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Wallet from './pages/Wallet';
// import Login from './pages/Login';
// import Teste from './pages/Teste';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Wallet } />
        {/* <Route
          exact
          path="/"
          render={
            (props) => <Teste { ...props } />
          }
        /> */}
      </Switch>
    );
  }
}

export default App;
