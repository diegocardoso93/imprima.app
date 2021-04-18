import React, { useState } from 'react';

import Header from '../../components/Header';
import Body from '../../components/Body';
import { useHistory } from 'react-router';
import SvgBack from '../../components/SvgBack';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import './style.scss';
import { GET_CHECKOUT_PREFERENCE } from '../../constants/endpoints';
import Loader from '../../components/Loader';
import usePersist from '../../hooks/usePersist';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
  cellphone: yup.string().required('Campo obrigatório'),
  note: yup.string(),
});

export default function PageCheckoutInfo() {
  const [pcheckout] = usePersist('checkout');
  const [pselected] = usePersist('selected');
  const history = useHistory();
  const [loading, setLoading] = useState();
  const { cart, merchant } = pcheckout;
  const [detailVisible, setDetailVisible] = useState(false);

  function buy(values) {
    const { name, cellphone, address, note } = values;
    setLoading(true);
    fetch(GET_CHECKOUT_PREFERENCE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: {
          merchant_id: merchant?.id,

          name,
          cellphone,
          address,
          note,
          origin: localStorage.getItem('origin'),

          product_name: pselected.name,
          image: pselected.url,
          type_id: pselected.type_id,
        },
        order_items: cart, // { detail: "Masculina Tamanho P", id, price, quantity }
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.init_point) {
          parent.location.href = res.init_point;
        }
        setLoading(false);
      })
      .catch((e) => {
        alert('erro');
        setLoading(false);
      });
  }

  function getProductTitle() {
    return `${pselected?.name}`;
  }

  function getProductDetails() {
    return (
      <div>
        {cart.map((c, k) => (
          <div style={{ fontSize: '12px' }} key={k}>
            {c.quantity + 'x ' + c.detail + ' R$' + c.price}
          </div>
        ))}
        Total: R$
        {cart.reduce((a, c) => a + c.price * c.quantity, 0)}
      </div>
    );
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
        <div className="page-checkout-info">
          <div className="product-details">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {getProductTitle()}
              <div
                className="link-detail"
                onClick={() => setDetailVisible(!detailVisible)}
              >
                {detailVisible ? 'esconder' : 'ver'} detalhes
              </div>
            </div>
            {(detailVisible && getProductDetails()) || ''}
          </div>
          <h5>Vendedor:</h5>
          <div className="seller">
            {merchant?.name}
            <br />
            {merchant?.address}, {merchant?.address_extra} -{' '}
            {merchant?.neighborhood}, {merchant?.city}, {merchant?.uf}
          </div>

          <Formik
            initialValues={{ name: '', address: '', city: '', cellphone: '' }}
            onSubmit={async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              buy(values);
            }}
            validationSchema={schema}
          >
            <Form className="buyer">
              <div>Complete seus dados</div>
              <Field name="name" placeholder="Nome completo" type="text" />
              <ErrorMessage component="span" name="name" />
              <Field
                name="address"
                placeholder="Rua, bairro, número, complemento, cidade"
                type="text"
              />
              <ErrorMessage component="span" name="address" />
              <Field
                name="cellphone"
                placeholder="Celular com DDD"
                type="text"
              />
              <ErrorMessage component="span" name="cellphone" />
              <Field
                name="note"
                placeholder="Informações adicionais"
                type="text"
              />
              <ErrorMessage component="span" name="note" />
              {(loading && <Loader />) || <button type="submit">Pagar</button>}
            </Form>
          </Formik>
        </div>
      </Body>
    </>
  );
}
