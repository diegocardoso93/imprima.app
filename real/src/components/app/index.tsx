import { h, createRef, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

import "./style.scss";
import {Item, items} from '../items';
import PageItems from "../page-items";
import PageDetail from "../page-detail";

interface AppParams {
  target: HTMLElement,
  onDispose: () => void
}

// const svgDetail = (
//   <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNMTguNjI5IDE1Ljk5N2wtNy4wODMtNy4wODFMMTMuNDYyIDdsOC45OTcgOC45OTdMMTMuNDU3IDI1bC0xLjkxNi0xLjkxNnoiLz48L3N2Zz4='/>
// );

const svgMore = (
  <svg width="23" height="39" viewBox="0 0 23 39" style="transform:scale(1);fill:#444;"><path class="slideshow-arrow" d="M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z" transform="translate(-855 -230)"></path></svg>
);

enum Page {
  Items = 0,
  Detail = 1
};

interface PageParams {
  [Page.Items]: null,
  [Page.Detail]: {
    item: Item[]
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
    }
  }

  return (
    <div ref={elRef} class="imprimapp-modal">
      <div class="header">
        <h1>
          Comprar personalizado
        </h1>
        <div class="close" onClick={dispose}>×</div>
      </div>

      <div class="body">
        {renderPage(appState.page)}
      </div>
    </div>
  );
}
