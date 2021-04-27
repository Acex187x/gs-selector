import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import ClassSelect from './Screens/ClassSelect'
import styled from 'styled-components';
import Footer from './Components/Footer';
import ClassRoom from './Screens/ClassRoom';
import NewClass from './Screens/NewClass';
import { useEffect } from 'react';
import { newClass } from './core';

function App() {

  return (
    <StyledApp>
      <Router>
        <Switch>
          <Route exact path='/'>
            <ClassSelect />
          </Route>
          <Route exact path='/new-class'>
            <NewClass />
          </Route>
          <Route exact path='/classroom/:classname'>
            <ClassRoom />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  height: calc(100vh - 2rem);
`

export default App;
