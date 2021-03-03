import { h, createRef, Fragment } from "preact";
import { useEffect } from "preact/hooks";

import "./style.scss";
import { Item, items } from '../../constants/items';

const svgMore = (
  <svg width="23" height="39" viewBox="0 0 23 39" style="transform:scale(1);fill:#444;">
    <path class="slideshow-arrow" d="M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z" transform="translate(-855 -230)"></path>
  </svg>
);

interface PageParams {
  appState: any,
  setAppState: any
}

export default function PageItems({ appState, setAppState }: PageParams) {

  function select(item: Item) {
    setAppState({page: 1, data: { item }});
  }

  return (
    <div class="page-items">
      <div class="options">
        {items.map((item: Item) => (
          <div class="option" onClick={() => select(item)}>
            <div class="left">
              <img src={item.image} alt="" class="image" />
              <span>{item.name}</span>
            </div>
            <span class="select">{svgMore}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
