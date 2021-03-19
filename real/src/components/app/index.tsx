import { h, createRef } from "preact";
import { useEffect, useState } from "preact/hooks";
import Router from 'preact-router';

import "./style.scss";
import {Item} from '../../constants/items';
import PageItems from "../page-items";
import PageDetail from "../page-detail";
import { Merchant } from "../../constants/merchants";
import PageCheckout from "../page-checkout";

interface AppParams {
  target: HTMLElement,
  onDispose: () => void
}

const svgMore = (
  <svg width="23" height="39" viewBox="0 0 23 39" style="transform:scale(1);fill:#444;"><path class="slideshow-arrow" d="M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z" transform="translate(-855 -230)"></path></svg>
);

enum Page {
  Items = 0,
  Detail = 1,
  Checkout = 2
};

interface PageParams {
  [Page.Items]: null,
  [Page.Detail]: {
    item: Item[]
  },
  [Page.Checkout]: {
    item: Item[],
    merchant: Merchant
  }
}

interface AppState {
  page: number;
  data: any;
}

function App() {
  const elRef = createRef();

  const [appState, setAppState] = useState({page: Page.Items, data: null} as AppState);

  useEffect(() => {
    // window.history.pushState(null, 'modalimprima', '');
    let x = 0;
    window.onbeforeunload = (e: any) => {
      if (x == 0) {
        dispose();
        x = 1;
      }
    };
    window.onpopstate = (e: any) => {
      dispose();
    }
  }, []);

  const dispose = () => {
    parent.postMessage({ active: false }, '*');
  };

  function renderPage(page: Page) {
    switch (page) {
      case Page.Items:
        return <PageItems appState={appState} setAppState={setAppState} />
      case Page.Detail:
        return <PageDetail appState={appState} setAppState={setAppState} />
      case Page.Checkout:
        return <PageCheckout appState={appState} setAppState={setAppState} />
    }
  }

  return (
    <div ref={elRef} class="imprimapp-modal">
      {renderPage(appState.page)}
    </div>
  );
}

const MyApp = <App />

export default MyApp;
