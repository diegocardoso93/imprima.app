import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import Body from '../../components/Body';
import { useHistory } from 'react-router';
import SvgBack from '../../components/SvgBack';

import './style.scss';
import { GET_CHECKOUT_PREFERENCE } from '../../constants/endpoints';

export default function PageCheckoutInfo() {
  const history = useHistory();
  const [preference, setPreference] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(GET_CHECKOUT_PREFERENCE)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPreference(res);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  }, []);

  function buy() {
    location.href = preference.sandbox_init_point;
  }

  // useEffect(() => {
  //   if (preference) {
  //     const script = document.createElement('script');

  //     script.src =
  //       'https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js';
  //     script.async = true;
  //     script.setAttribute('data-preference-id', preference.id);

  //     document.body.appendChild(script);

  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }
  // }, [preference]);

  return (
    <>
      <Header stackclose={-4}>
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
              <div>Complete seus dados</div>
              <input placeholder="Nome completo" />
              <input placeholder="Rua, bairro, número, complemento" />
              <input placeholder="Cidade" />
              <input placeholder="Celular" />
              {preference && <button onClick={() => buy()}>Pagar</button>}
            </div>
          </div>
        </>
      </Body>
    </>
  );
}
