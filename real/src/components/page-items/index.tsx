import { h, createRef, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

import "./style.scss";
import { Item } from '../../constants/items';
import { GET_PRODUCT } from "../../constants/endpoints";
import { route } from "preact-router";
import Header from "../header";
import Body from "../body";
import Loader from "../loader";

const svgMore = (
  <svg width="23" height="39" viewBox="0 0 23 39" style="transform:scale(1);fill:#444;">
    <path class="slideshow-arrow" d="M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z" transform="translate(-855 -230)"></path>
  </svg>
);

interface PageParams {
  path: string,
  appState: any,
  setAppState: any
}

export default function PageItems({ appState, setAppState }: PageParams) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  function select(item: Item) {
    setAppState({page: 1, data: { item }});
    route('/alo/detalhes', true);
  }

  useEffect(() => {
    setLoading(true);
    fetch(GET_PRODUCT)
      .then(res => res.json())
      .then(val => {
        setItems(val);
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      <Header>
        <div class="logo">
          <a href="https://imprima.app" target="_blank" class="logo-link">
            <div class="inner">
              <img src="/img/logo_100.png" alt="" />
            </div>
          </a>

          <h1>
            Comprar personalizado
          </h1>
        </div>
      </Header>

      <Body>
        {loading && <div class="loader-container"><Loader /></div> || (
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
        )}
      </Body>
    </Fragment>
  );
}
