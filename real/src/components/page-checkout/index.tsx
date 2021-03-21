import { h, createRef, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

import "./style.scss";
import Loader from "../loader";
import Header from "../header";
import Body from "../body";

const svgBack = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <g fill="none" fill-rule="evenodd">
      <path d="M0 0H16V16H0z" transform="matrix(1 0 0 -1 0 16)"></path>
        <path fill="#444" fill-rule="nonzero" d="M7.631 1.333L6.368 0 0 6.667 6.368 13.333 7.631 12.001 3.428 7.6 13.333 7.601 13.333 5.743 3.418 5.742z" transform="matrix(1 0 0 -1 0 16) translate(1.333 1.333)"></path>
      </g>
  </svg>
);

interface PageParams {
  appState: any,
  setAppState: any
}

export default function PageCheckout({ appState, setAppState }: PageParams) {
  const { item, merchant } = appState.data;
  // console.log(appState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // fetch(
    //   GET_ATTRIBUTES
    //   .replace('{categoryId}', category)
    //   .replace('{typeId}', item.type_id),
    //   { mode: 'cors' }
    // )
    // .then(res => res.json())
    // .then(res => {
    //   setImages(res);
    //   setLoading(false);
    // })
    // .catch(e => setLoading(false));
  }, []);

  function buy() {
    
  }

  return (
    <Fragment>
      <Header>
        <div class="title">
          <div onClick={() => setAppState({ ...appState, page: 1 })}>{svgBack}</div>
          <div>{item.name}</div>
        </div>
      </Header>
      <Body>
        <h5>{merchant.name}</h5>
        <div class="page-checkout">
          <img src={item.url} alt={item.name} />
        </div>
        {/* <div>{attribute.name}</div> */}
        <div>
          Quantidade <input type="number" value="1" />
          {/* // tamanho P M G */}
        </div>
        <div>Endereço de entrega</div>
        {/* width: calc(100% - 30px); */}
        <input placeholder="Rua, bairro, número, complemento" />
        <input placeholder="Cidade" />
        <input placeholder="Celular" />
        <div>Preço final</div>
        <button onClick={() => buy()}>Pagar</button>
      </Body>
    </Fragment>
  );
}
