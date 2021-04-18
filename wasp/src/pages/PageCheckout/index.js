import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Loader from '../../components/Loader';
import Header from '../../components/Header';
import Body from '../../components/Body';
import { useHistory, useParams } from 'react-router';
import SvgBack from '../../components/SvgBack';
import { GET_ATTRIBUTES } from '../../constants/endpoints';
import usePersist from '../../hooks/usePersist';

import './style.scss';

export default function PageCheckout() {
  const { typeId, merchantId } = useParams();
  const history = useHistory();
  const [_, setCheckout] = usePersist('checkout');

  const [loading, setLoading] = useState(false);
  const [pSelected, setpSelected] = usePersist('selected');
  const [merchant, setMerchant] = useState();
  const [attributes, setAttributes] = useState();
  const [attributesOriginal, setAttributesOriginal] = useState();
  const [subselect, setSubselect] = useState();
  const [attribute, selectAttribute] = useState();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [priceTotal, setPriceTotal] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      GET_ATTRIBUTES.replace('{typeId}', typeId).replace(
        '{merchantId}',
        merchantId
      ),
      { mode: 'cors' }
    )
      .then((res) => res.json())
      .then((res) => {
        setAttributesOriginal(res.attributes);
        let attrs = res.attributes.filter((a) => !a.price);
        attrs = attrs?.length ? attrs : res.attributes;
        setAttributes(attrs);
        setMerchant(res.merchant);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  }, []);

  function next() {
    if (!cart.length) {
      toast.info('🛒 Coloque o produto no carrinho.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    setCheckout({
      merchant,
      cart,
    });

    history.push(`/alo/checkout-info`);
  }

  function updatePrice(q, p) {
    setPrice(p);
    setPriceTotal(q * p);
  }

  function addCart() {
    const t1 = attributesOriginal?.find((a) => a.id === subselect);
    const t2 = attributesOriginal?.find((a) => a.id === attribute.id);
    let detail = `${t1.value === t2.value ? '' : t1.value + ' '}${t2.name} ${
      t2.value
    }`;
    if (cart.find((c) => c.detail === detail)) {
      toast.info('🛒 Produto já adicionado no carrinho.', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setCart([
        ...cart,
        {
          id: t2.id,
          detail,
          price,
          quantity,
        },
      ]);
    }
    selectAttribute(null);
    setSubselect(null);
    updatePrice(null);
  }

  function changeQuantity(pos, qtd) {
    let newQtd = cart[pos].quantity + qtd;
    let x = [...cart];
    if (newQtd === 0) {
      x.splice(pos, pos + 1);
    } else {
      x[pos].quantity = newQtd;
    }
    setCart(x);
  }

  return (
    <>
      <Header stackclose={-3}>
        <div className="title">
          <div onClick={() => history.goBack()}>
            <SvgBack />
          </div>
          <div>{merchant?.name}</div>
        </div>
      </Header>
      <Body>
        {(loading && (
          <div className="loader-container">
            <Loader size="large" />
          </div>
        )) || (
          <>
            <div className="page-checkout">
              <h5>{pSelected?.name}</h5>
              <div className="first">
                <div className="left-container">
                  <img src={pSelected?.url} alt={pSelected?.name} />
                </div>
                <div className="right-container">
                  <div className="attributes-container">
                    {attributes && attributes[0].name}
                    <div className="options">
                      {attributes?.map((a, i) => (
                        <div
                          key={i}
                          className={`button-check ${
                            subselect === a.id && 'selected'
                          }`}
                          onClick={() => {
                            setSubselect(a.id);
                            if (a.price) {
                              selectAttribute(a);
                            } else {
                              selectAttribute(null);
                            }
                            updatePrice(quantity, a.price);
                          }}
                        >
                          {a.value}
                        </div>
                      ))}
                    </div>
                  </div>

                  {subselect &&
                    attributesOriginal?.find(
                      (a) => a.merchant_type_attribute_id === subselect
                    )?.name && (
                      <div className="attributes-container">
                        {
                          attributesOriginal?.find(
                            (a) => a.merchant_type_attribute_id === subselect
                          )?.name
                        }
                        <div className="options">
                          {attributesOriginal
                            .filter(
                              (a) => a.merchant_type_attribute_id === subselect
                            )
                            ?.map((a, i) => (
                              <div
                                key={i}
                                className={`button-check ${
                                  attribute?.id === a.id && 'selected'
                                }`}
                                onClick={() => {
                                  updatePrice(quantity, a.price);
                                  selectAttribute(a);
                                }}
                              >
                                {a.value}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  {(priceTotal && (
                    <div className="price-container">
                      <div>
                        <span>Preço</span>
                        <div>
                          {(priceTotal && `R$${priceTotal}`) || (
                            <small>selecione</small>
                          )}
                        </div>
                      </div>
                      <div>
                        <button
                          className="button-cart-add"
                          onClick={() => addCart()}
                        >
                          <AddCartIcon />
                        </button>
                      </div>
                    </div>
                  )) ||
                    ''}
                </div>
              </div>
              <div>
                {/* <!-- carrinho --> */}
                <div className="list">
                  {(cart && cart?.length && (
                    <>
                      <div className="item">
                        <div className="i1 b">Resumo</div>
                        <div className="i2 b">Preço</div>
                        <div className="i3 b">Quantidade</div>
                      </div>
                      <div className="items">
                        {cart.map((l, k) => (
                          <div key={k} className="item">
                            <div className="i1">{l.detail}</div>
                            <div className="i2">R${l.price}</div>
                            <div className="i3">
                              <input
                                type="button"
                                value="-"
                                onClick={() => changeQuantity(k, -1)}
                              />
                              <span>{l.quantity}</span>
                              <input
                                type="button"
                                value="+"
                                onClick={() => changeQuantity(k, +1)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="total">
                        Total: R$
                        {cart.reduce((a, c) => a + c.price * c.quantity, 0)}
                      </div>
                    </>
                  )) ||
                    ''}
                </div>
              </div>
              <div className="next">
                <button onClick={() => next()}>Continuar</button>
              </div>
            </div>
          </>
        )}
      </Body>
    </>
  );
}

const AddCartIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M9 20C9 21.11 8.11 22 7 22S5 21.11 5 20 5.9 18 7 18 9 18.9 9 20M17 18C15.9 18 15 18.9 15 20S15.9 22 17 22 19 21.11 19 20 18.11 18 17 18M7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L21.16 4.96L19.42 4H19.41L18.31 6L15.55 11H8.53L8.4 10.73L6.16 6L5.21 4L4.27 2H1V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.11 5.9 17 7 17H19V15H7.42C7.29 15 7.17 14.89 7.17 14.75M18 2.76L16.59 1.34L11.75 6.18L9.16 3.59L7.75 5L11.75 9L18 2.76Z"
    ></path>
  </svg>
);
