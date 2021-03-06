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

  return (
    <div ref={elRef} class="imprimapp-modal">
      <div class="header">
        <div class="logo">
          <a href="https://imprima.app" target="_blank">
            <img src="data:image/png;base64,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" />
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
