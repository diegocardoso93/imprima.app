import { h, createRef, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

import "./style.scss";
import { Merchant, merchants as lojas } from '../../constants/merchants';
import Loader from "../loader";

interface PageParams {
  appState: any,
  setAppState: any
}

const svgMore = (
  <svg width="23" height="39" viewBox="0 0 23 39" style="transform:scale(0.8);fill:#444;">
    <path class="slideshow-arrow" d="M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z" transform="translate(-855 -230)"></path>
  </svg>
);

export default function PageDetail({ appState, setAppState }: PageParams) {
  const { item } = appState.data;
  const [loading, setLoading] = useState(false);
  const [merchants, setMerchants] = useState([] as Merchant[]);

  function checkCEP(e: any) {
    console.log(e.target.value);
  }

  function findMerchant() {
    console.log('find');
    setLoading(true);
    // fetch('https://google.com.br')
      // .then(res => res.json())
      // .then(res => setLoading(false));
    setMerchants(lojas);
  }

  function select(l: Merchant) {
    setAppState({ page: 2, data: { item, merchant: l } });
  }

  return (
    <div class="page-detail">
      <div class="title">
        <div onClick={() => setAppState({page: 0})}>⇽</div>
        <div>{item.name}</div>
      </div>
      <img src={item.image} alt={item.name} />
      <div class="stores">
        <div class="find">
          <input onKeyUp={checkCEP} placeholder="Digite seu CEP" />
          <button onClick={() => findMerchant()}>
            {loading && <Loader /> || '🔍'}
          </button>
        </div>
        <div class="list">
          {merchants.length && (
            <div class="item">
              <div class="i1 b">Fornecedor</div>
              <div class="i2 b">Preço</div>
              <div class="i3 b">Frete</div>
              <span class="i5">&nbsp;</span>
            </div>
          ) || ''}
          {merchants.map(l => (
            <div class="item">
              <div class="i1">{l.nome}<br/>
                <span class="small">{l.cidade}</span>
              </div>
              <div class="i2">R${l.preco}</div>
              <div class="i3">R${l.frete}</div>
              <span class="i5" onClick={() => select(l)}>{svgMore}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
