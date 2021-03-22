import React, { useEffect, useState } from 'react';

import Loader from '../../components/Loader';
import Header from '../../components/Header';
import Body from '../../components/Body';
import { useHistory, useParams } from 'react-router';
import SvgBack from '../../components/SvgBack';
import { GET_ATTRIBUTES } from '../../constants/endpoints';

import './style.scss';

export default function PageCheckout() {
  const { productId, merchantId } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();
  const [merchant, setMerchant] = useState();
  const [attributes, setAttributes] = useState();
  const [attribute, selectAttribute] = useState();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(
      GET_ATTRIBUTES.replace('{productId}', productId).replace(
        '{merchantId}',
        merchantId
      )
    )
      .then((res) => res.json())
      .then((res) => {
        setProduct(res.product);
        setAttributes(res.attributes);
        setMerchant(res.merchant);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  }, []);

  function next() {
    if (!price) {
      alert('escolha o tamanho e a quantidade');
      return;
    }

    history.push(`/alo/checkout-info${location.search}`);
    // store preço quantidade, tamanho
  }

  function updatePrice(q, p) {
    setPrice(p);
    setPriceTotal(q * p);
  }

  return (
    <>
      <Header>
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
              <h5>{product?.name}</h5>
              <div className="first">
                <div className="left-container">
                  <img src={product?.url} alt={product?.name} />
                </div>
                <div className="right-container">
                  <div className="attributes-container">
                    {attributes && attributes[0].type}
                    <div className="options">
                      {attributes?.map((a, i) => (
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
                  <div className="quantity-container">
                    <span>Quantidade</span>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        updatePrice(e.target.value, price);
                        setQuantity(e.target.value);
                      }}
                    />
                  </div>
                  <div className="price-container">
                    <span>Preço final</span>
                    <div>R${priceTotal}</div>
                  </div>
                </div>
              </div>
              <div className="next">
                <button onClick={() => next()}>Prosseguir</button>
              </div>
            </div>
          </>
        )}
      </Body>
    </>
  );
}
