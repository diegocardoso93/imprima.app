import { h, createRef, Fragment } from "preact";
import { useState } from "preact/hooks";

import "./style.scss";
import { Merchant } from '../../constants/merchants';
import Loader from "../loader";
import { GET_MERCHANT } from '../../constants/endpoints';

interface PageParams {
  appState: any,
  setAppState: any
}

const svgMore = (
  <svg width="23" height="39" viewBox="0 0 23 39" style="transform:scale(0.8);fill:#444;">
    <path class="slideshow-arrow" d="M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z" transform="translate(-855 -230)"></path>
  </svg>
);

const svgBack = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <g fill="none" fill-rule="evenodd">
      <path d="M0 0H16V16H0z" transform="matrix(1 0 0 -1 0 16)"></path>
        <path fill="#444" fill-rule="nonzero" d="M7.631 1.333L6.368 0 0 6.667 6.368 13.333 7.631 12.001 3.428 7.6 13.333 7.601 13.333 5.743 3.418 5.742z" transform="matrix(1 0 0 -1 0 16) translate(1.333 1.333)"></path>
      </g>
  </svg>
);

export default function PageDetail({ appState, setAppState }: PageParams) {
  const { item } = appState.data;
  const [loading, setLoading] = useState(false);
  const [merchants, setMerchants] = useState([] as Merchant[]);
  const cepRef = createRef();

  function checkCEP(e: any) {
    console.log(e.target.value);
    if (e.key === 'Enter') {
      findMerchant();
    }
  }

  function findMerchant() {
    console.log('find');
    setLoading(true);
    const cep = cepRef.current.value;
    fetch(GET_MERCHANT.replace('{id}', item.id).replace('{cep}', cep), { mode: 'cors' })
      .then(res => res.json())
      .then(val => {
        console.log('red',val);
        setLoading(false);
        setMerchants(val);
      })
      .catch(e => setLoading(false));
  }

  function select(l: Merchant) {
    setAppState({ page: 2, data: { item, merchant: l } });
  }

  return (
    <div class="page-detail">
      <div class="title">
        <div onClick={() => setAppState({page: 0})}>{svgBack}</div>
        <div>{item.name}</div>
      </div>
      <img src={item.image} alt={item.name} />
      <div class="stores">
        <div class="find">
          <input ref={cepRef} onKeyUp={checkCEP} placeholder="Digite seu CEP" autofocus />
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
              <div class="i1">{l.name}<br/>
                <span class="small">{l.city}</span>
              </div>
              {/* <div class="i2">R${l.preco}</div> */}
              <div class="i2">a partir de R$10,00</div>
              <div class="i3">{l.delivery}</div>
              <span class="i5" onClick={() => select(l)}>{svgMore}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
