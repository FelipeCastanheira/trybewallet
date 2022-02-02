import './App.css';
import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Table from './components/Table';
import Login from './components/Login';

class App extends React.Component {
  render() {
    return (
      <>
        <Login />
        <Header />
        <Form />
        <Table />
      </>
    );
  }
}

export default App;
