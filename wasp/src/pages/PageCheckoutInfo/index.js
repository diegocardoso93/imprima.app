import React from 'react';

import Header from '../../components/Header';
import Body from '../../components/Body';
import { useHistory } from 'react-router';
import SvgBack from '../../components/SvgBack';

import './style.scss';

export default function PageCheckoutInfo() {
  const history = useHistory();

  function buy() {}

  return (
    <>
      <Header>
        <div className="title">
          <div onClick={() => history.goBack()}>
            <SvgBack />
          </div>
          {/* <div>{product?.name}</div> */}
        </div>
      </Header>
      <Body>
        <>
          <div className="page-checkout-info">
            {/* <h5>{merchant?.name}</h5> */}
            <div className="buyer">
              <div>Endereço de entrega</div>
              <input placeholder="Nome" />
              <input placeholder="Rua, bairro, número, complemento" />
              <input placeholder="Cidade" />
              <input placeholder="Celular" />
              <button onClick={() => buy()}>Pagar</button>
            </div>
          </div>
        </>
      </Body>
    </>
  );
}
