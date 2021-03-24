import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import Body from '../../components/Body';
import { useHistory } from 'react-router';
import SvgBack from '../../components/SvgBack';

import './style.scss';
import { GET_CHECKOUT_PREFERENCE } from '../../constants/endpoints';
import Loader from '../../components/Loader';
import usePersist from '../../hooks/usePersist';

export default function PageCheckoutInfo() {
  const [checkout, _] = usePersist('checkout');
  const history = useHistory();
  const [loading, setLoading] = useState();
  const { attribute, merchant, product, quantity } = checkout;

  function buy() {
    setLoading(true);
    fetch(GET_CHECKOUT_PREFERENCE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: product?.id,
        merchant_type_attribute_id: attribute?.id,
        quantity: quantity,
        merchant: merchant?.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.sandbox_init_point) {
          parent.location.href = res.sandbox_init_point;
        }
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  }

  return (
    <>
      <Header stackclose={-4}>
        <div className="title">
          <div onClick={() => history.goBack()}>
            <SvgBack />
          </div>
          <div>Resumo do pedido</div>
        </div>
      </Header>
      <Body>
        <>
          <div className="page-checkout-info">
            <div className="product-details">
              {quantity} {product?.name}
              <br />
              {attribute?.type}: {attribute?.value}
              <br />
              Valor a pagar: R${quantity * attribute?.price}
            </div>
            <h5>
              Vendedor: <br />
              {merchant?.name} - {merchant?.phone}
              <div>
                {merchant?.address}, {merchant?.address_extra} -{' '}
                {merchant?.neighborhood}, {merchant?.city}, {merchant?.uf}
              </div>
            </h5>
            <div className="buyer">
              <div>Complete seus dados</div>
              <input placeholder="Nome completo" />
              <input placeholder="Rua, bairro, número, complemento" />
              <input placeholder="Cidade" />
              <input placeholder="Celular" />
              {(loading && <Loader />) || (
                <button onClick={() => buy()}>Pagar</button>
              )}
            </div>
          </div>
        </>
      </Body>
    </>
  );
}
