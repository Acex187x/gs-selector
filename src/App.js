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
            <Footer />
          </Route>
          <Route exact path='/new-class'>
            <NewClass />
            <Footer />
          </Route>
          <Route exact path='/classroom/:classname'>
            <ClassRoom />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  height: calc(100vh - 2rem);
`

export default App;
