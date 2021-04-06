import React, { useEffect, useRef, useState } from 'react';

import Loader from '../../components/Loader';
import { GET_MERCHANT, GET_PRODUCT } from '../../constants/endpoints';
import Header from '../../components/Header';
import Body from '../../components/Body';
import { useHistory, useParams } from 'react-router';
import SvgMore from '../../components/SvgMore';
import SvgBack from '../../components/SvgBack';
import './style.scss';

export default function PageMerchant() {
  const { id } = useParams();

  const [loadingMerchants, setLoadingMerchants] = useState(false);
  const [merchants, setMerchants] = useState(null);
  const [expand, setExpand] = useState(true);
  const cepRef = useRef();
  const [selected, setSelected] = useState();
  const history = useHistory();
  const [loading, setLoading] = useState();

  function checkCEP(e) {
    if (e.key === 'Enter') {
      findMerchant();
    }
  }

  useEffect(() => {
    setLoading(true);
    fetch(GET_PRODUCT.replace('{id}', id))
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setSelected(res);

        const address = JSON.parse(localStorage.getItem('address'));
        if (address?.zip) {
          cepRef.current.value = address.zip;
          findMerchant();
        }
      })
      .catch((e) => setLoading(false));
  }, []);

  function findMerchant() {
    setLoadingMerchants(true);
    const cep = cepRef.current.value;
    fetch(GET_MERCHANT.replace('{id}', id).replace('{cep}', cep))
      .then((res) => res.json())
      .then((res) => {
        setLoadingMerchants(false);
        setMerchants(res.merchants);
        localStorage.setItem('address', JSON.stringify(res.address));
      })
      .catch((e) => setLoadingMerchants(false));
  }

  function select(l) {
    history.push(`/alo/checkout/${selected.id}/${l.id}${location.search}`);
  }

  return (
    <>
      <Header stackclose={-2}>
        <div className="title">
          <div onClick={() => history.goBack()}>
            <SvgBack />
          </div>
          <div>Selecionar fornecedor</div>
        </div>
      </Header>
      <Body>
        <div className="page-merchant">
          <div className="stores">
            <div className="find">
              <button onClick={() => setExpand(!expand)}>
                <span className={`${expand ? 'top' : 'bottom'}`}>
                  <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                  </svg>
                </span>
              </button>
              <input
                ref={cepRef}
                onKeyUp={checkCEP}
                placeholder="Digite seu CEP"
                onFocus={() => window.innerWidth < 600 && setExpand(false)}
              />
              <button onClick={() => findMerchant()}>
                {(loadingMerchants && <Loader />) || '🔍'}
              </button>
            </div>
            <div className="list">
              {merchants &&
                ((merchants?.length && (
                  <>
                    <div className="item">
                      <div className="i1 b">Fornecedor</div>
                      <div className="i2 b">Preço</div>
                      <div className="i3 b">Frete</div>
                      <span className="i5">&nbsp;</span>
                    </div>
                    {merchants.map((l) => (
                      <div key={l.id} className="item">
                        <div className="i1">
                          {l.name}
                          <br />
                          <span className="small">
                            {l.city} - {l.uf}
                          </span>
                        </div>
                        <div className="i2">
                          <div className="small">a partir de</div>R$
                          {l.price}
                        </div>
                        <div
                          className={`i3 ${
                            (l.delivery === 'grátis' && 'green') || 'red'
                          }`}
                        >
                          {l.delivery}
                        </div>
                        <span className="i5" onClick={() => select(l)}>
                          <SvgMore size="small" />
                        </span>
                      </div>
                    ))}
                  </>
                )) || <h3>Nenhum fornecedor na sua localidade.</h3>)}
            </div>
          </div>
        </div>
      </Body>
    </>
  );
}
