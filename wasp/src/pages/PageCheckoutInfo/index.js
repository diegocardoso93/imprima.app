import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import Body from '../../components/Body';
import { useHistory } from 'react-router';
import SvgBack from '../../components/SvgBack';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import InputMask from 'react-input-mask';
import { cpf } from 'cpf-cnpj-validator';

import './style.scss';
import { CREATE_ORDER } from '../../constants/endpoints';
import Loader from '../../components/Loader';
import usePersist from '../../hooks/usePersist';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  street: yup.string().required('Campo obrigatório'),
  neighborhood: yup.string().required('Campo obrigatório'),
  note: yup.string(),
});

export default function PageCheckoutInfo() {
  const [pcheckout] = usePersist('checkout');
  const [pselected] = usePersist('selected');
  const [paddress] = usePersist('address');
  const history = useHistory();
  const [loading, setLoading] = useState();
  const { cart, merchant } = pcheckout;
  const [detailVisible, setDetailVisible] = useState(false);

  function buy(values) {
    const {
      name,
      cellphone,
      cpf,
      street,
      number,
      neighborhood,
      complement,
      note,
    } = values;

    setLoading(true);
    fetch(CREATE_ORDER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: {
          merchant_id: merchant?.id,

          name,
          cpf,
          cellphone,
          street,
          number,
          neighborhood,
          complement,
          zip: paddress.cep,
          city: paddress.localidade,
          uf: paddress.uf,
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
            initialValues={{
              name: '',
              cpf: '',
              street: paddress.logradouro,
              neighborhood: paddress.bairro,
              cellphone: '',
            }}
            onSubmit={async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              console.log('values', values);
              values.cpf = values.cpf.replace(/[^0-9\.]+/g, '');
              if (!cpf.isValid(values.cpf)) {
                toast.error('CPF inválido.', {
                  position: toast.POSITION.TOP_CENTER,
                });
                return;
              }
              values.cellphone = values.cellphone.replace(/[^0-9\.]+/g, '');
              if (values.cellphone.length < 10) {
                toast.error('Informe o celular com DDD.', {
                  position: toast.POSITION.TOP_CENTER,
                });
                return;
              }
              buy(values);
            }}
            validationSchema={schema}
          >
            {({ setFieldValue }) => (
              <Form className="buyer">
                <div>Complete seus dados</div>
                <div style={{ display: 'flex', width: '100%' }}>
                  <Field
                    name="name"
                    placeholder="Nome completo"
                    type="text"
                    style={{ width: '50%' }}
                  />
                  <Field
                    component={InputMask}
                    mask="999.999.999-99"
                    name="cpf"
                    placeholder="CPF"
                    type="text"
                    style={{ width: '50%' }}
                    onChange={(e) => {
                      setFieldValue('cpf', e.target.value || '');
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                  }}
                >
                  <ErrorMessage component="span" name="name" />
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                  <Field
                    name="street"
                    placeholder="Rua"
                    type="text"
                    style={{ width: '70%' }}
                  />
                  <Field
                    name="number"
                    placeholder="Número"
                    type="text"
                    style={{ width: '30%' }}
                  />
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                  <ErrorMessage component="span" name="street" />
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                  <Field
                    name="neighborhood"
                    placeholder="Bairro"
                    type="text"
                    style={{ width: '50%' }}
                  />
                  <Field
                    name="complement"
                    placeholder="Complemento"
                    type="text"
                    style={{ width: '50%' }}
                  />
                </div>
                <div style={{ display: 'flex', width: '100%' }}>
                  <ErrorMessage component="span" name="neighborhood" />
                </div>
                <Field
                  component={InputMask}
                  mask="(99) 999999999"
                  name="cellphone"
                  placeholder="Celular com DDD"
                  onChange={(e) => {
                    setFieldValue('cellphone', e.target.value || '');
                  }}
                  type="text"
                />
                <ErrorMessage component="span" name="cellphone" />
                <Field
                  name="note"
                  placeholder="Informações adicionais"
                  type="text"
                />
                <ErrorMessage component="span" name="note" />
                {(loading && <Loader />) || (
                  <button type="submit">Pagar</button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </Body>
    </>
  );
}
