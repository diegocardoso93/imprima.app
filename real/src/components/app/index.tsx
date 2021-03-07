import { h, createRef, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

import "./style.scss";
import {Item, items} from '../../constants/items';
import PageItems from "../page-items";
import PageDetail from "../page-detail";
import Loader from "../loader";
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

export default function App({ target, onDispose }: AppParams) {
  console.log('App', target);
  const elRef = createRef();

  function dispose() {
    elRef.current.parentElement.removeChild(elRef.current);
    onDispose();
  }

  const [appState, setAppState] = useState({page: Page.Items, data: null} as AppState);

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

  // window.history.pushState
  // window.onpopstate = (e) => console.log(e.state);

  return (
    <div ref={elRef} class="imprimapp-modal">
      <div class="header">
        <div class="logo">
          <a href="https://imprima.app" target="_blank" class="logo-link">
            <div class="inner">
              <button>i</button>
              <div class="name-container">
                <span class="high">imprima</span>
                <span><b>.</b>app</span>
              </div>
            </div>
          </a>

          <h1>
            Comprar personalizado
          </h1>
        </div>
        <div class="close" onClick={dispose}>×</div>
      </div>

      <div class="body">
        {renderPage(appState.page)}
      </div>
    </div>
  );
}
