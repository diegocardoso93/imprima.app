import { h, createRef, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

import "./style.scss";
import { Item, items } from '../../constants/items';
import Loader from "../loader";

interface PageParams {
  appState: any,
  setAppState: any
}


export default function PageCheckout({ appState, setAppState }: PageParams) {
  const { item, merchant } = appState.data;
console.log(appState);

  return (
    <div class="page-checkout">
      <div class="title">
        <div onClick={() => setAppState({page: 1, data: { item }})}>⇽</div>
        <div>{item.name} - {merchant.nome}</div>
      </div>
      <img src={item.image} alt={item.name} />
    </div>
  );
}
