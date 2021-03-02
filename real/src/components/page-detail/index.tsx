import { h, createRef, Fragment } from "preact";
import { useEffect } from "preact/hooks";

import "./style.scss";
import { Item, items } from '../items';

interface PageParams {
  appState: any,
  setAppState: any
}

const lojas = [
  {
    nome: 'Personalizados',
    cidade: 'Tubarão SC',
    preco: 72.00,
    frete: 18.00
  },
  {
    nome: 'Artisticos',
    cidade: 'Tubarão SC',
    preco: 69.00,
    frete: 19.00
  }
];

export default function PageDetail({ appState, setAppState }: PageParams) {
  const { item } = appState.data;

  function checkCEP(e: any) {
    console.log(e.target.value);
  }

  function findMerchant() {
    console.log('find')
  }

  return (
    <div class="page-detail">
      <div class="title">
        <div onClick={() => setAppState({page: 0})}>⇽</div>
        <div>{item.name}</div>
      </div>
      <img src={item.image} alt={item.name} />
      <div class="stores">
        <div class="title">Lojas</div>
        <div class="find">
          <input onKeyUp={checkCEP} placeholder="Digite seu CEP" />
          <button onClick={() => findMerchant()}>🔍</button>
        </div>
        <div class="list">
          {lojas.map(l => (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '350px'}}>
              <div>{l.nome}</div>
              <div>{l.cidade}</div>
              <div>{l.preco}</div>
              <div>{l.frete}</div>
              <div>{l.preco + l.frete}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
