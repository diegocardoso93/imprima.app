import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageItems from './pages/PageItems';
import PageDetail from './pages/PageDetail';
import PageMerchant from './pages/PageMerchant';
import PageCheckout from './pages/PageCheckout';
import PageCheckoutInfo from './pages/PageCheckoutInfo';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/criador/" exact>
          <PageItems />
        </Route>
        <Route path="/criador/produto/:id">
          <PageDetail />
        </Route>
        <Route path="/criador/fornecedor">
          <PageMerchant />
        </Route>
        <Route path="/criador/pedido/:typeId/:merchantId">
          <PageCheckout />
        </Route>
        <Route path="/criador/pedido-info">
          <PageCheckoutInfo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
