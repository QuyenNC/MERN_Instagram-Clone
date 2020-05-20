import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route component={Landing} />
      </Switch>
      <Footer />
    </Router>
  </Provider>
);

export default App;
