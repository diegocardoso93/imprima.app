import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageItems from './pages/PageItems';
import PageDetail from './pages/PageDetail';
import PageCheckout from './pages/PageCheckout';
import PageCheckoutInfo from './pages/PageCheckoutInfo';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/alo/" exact>
          <PageItems />
        </Route>
        <Route path="/alo/produto/:id">
          <PageDetail />
        </Route>
        <Route path="/alo/checkout/:productId/:merchantId">
          <PageCheckout />
        </Route>
        <Route path="/alo/checkout-info">
          <PageCheckoutInfo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
