import React, { useEffect, useRef, useState } from 'react';

import Loader from '../../components/Loader';
import { GET_MERCHANT, GET_PRODUCT } from '../../constants/endpoints';
import Header from '../../components/Header';
import Body from '../../components/Body';
import { useHistory } from 'react-router';
import SvgMore from '../../components/SvgMore';
import SvgBack from '../../components/SvgBack';
import './style.scss';
import usePersist from '../../hooks/usePersist';

export default function PageMerchant() {
  const [loadingMerchants, setLoadingMerchants] = useState(false);
  const [merchants, setMerchants] = useState(null);
  const cepRef = useRef();
  const history = useHistory();
  const [pselected] = usePersist('selected');

  function checkCEP(e) {
    if (e.key === 'Enter') {
      findMerchant();
    }
  }

  useEffect(() => {
    const address = JSON.parse(localStorage.getItem('address'));
    if (address?.zip) {
      cepRef.current.value = address.zip;
      findMerchant();
    }
  }, []);

  function findMerchant() {
    setLoadingMerchants(true);
    const cep = cepRef.current.value;
    fetch(
      GET_MERCHANT.replace('{id}', pselected.type_id).replace('{cep}', cep),
      { mode: 'cors' }
    )
      .then((res) => res.json())
      .then((res) => {
        setLoadingMerchants(false);
        setMerchants(res.merchants);
        localStorage.setItem('address', JSON.stringify(res.address || '{}'));
      })
      .catch((e) => setLoadingMerchants(false));
  }

  function select(l) {
    history.push(`/alo/checkout/${pselected.type_id}/${l.id}`);
  }

  return (
    <>
      <Header stackclose={-2}>
        <div className="title">
          <div onClick={() => history.goBack()}>
            <SvgBack />
          </div>
          <div>Selecione fornecedor</div>
        </div>
      </Header>
      <Body>
        <div className="page-merchant">
          <div className="stores">
            <div className="find">
              <input
                ref={cepRef}
                onKeyUp={checkCEP}
                placeholder="Digite seu CEP"
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
