import React, { useEffect, useState } from 'react';

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
    if (!price) {
      alert('escolha o tamanho e a quantidade');
      return;
    }

    setCheckout({
      attribute,
      merchant,
      quantity,
    });

    history.push(`/alo/checkout-info`);
  }

  function updatePrice(q, p) {
    setPrice(p);
    setPriceTotal(q * p);
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
                    <div>
                      {(priceTotal && `R$${priceTotal}`) || 'selecione'}
                    </div>
                  </div>
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
