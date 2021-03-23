import React, { useEffect, useRef, useState } from 'react';

import './style.scss';
import Loader from '../../components/Loader';
import {
  GET_MERCHANT,
  GET_CATEGORY,
  GET_CATEGORY_TYPE,
  GET_PRODUCT,
} from '../../constants/endpoints';
import Header from '../../components/Header';
import Body from '../../components/Body';
import { useHistory, useParams } from 'react-router';
import SvgMore from '../../components/SvgMore';
import SvgBack from '../../components/SvgBack';

export default function PageDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [loadingMerchants, setLoadingMerchants] = useState(false);
  const [merchants, setMerchants] = useState(null);
  const [categories, setCategories] = useState(null);
  const [images, setImages] = useState(null);
  const [swap, setSwap] = useState({ loading: false, show: false });
  const [expand, setExpand] = useState(true);
  const cepRef = useRef();
  const [selected, setSelected] = useState();
  const [loadingImage, setLoadingImage] = useState(false);
  const history = useHistory();

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

  function toggleSwap() {
    if (!swap.show) {
      setSwap({ loading: true, show: true });
      fetch(GET_CATEGORY, { mode: 'cors' })
        .then((res) => res.json())
        .then((res) => {
          setSwap({ loading: false, show: true });
          setCategories(res);
        })
        .catch((e) => setSwap({ loading: false, show: false }));
    } else {
      setSwap({ loading: false, show: false });
    }
  }

  function onSelectCategory(event) {
    const category = event.target.value;
    setLoadingImage(true);
    fetch(
      GET_CATEGORY_TYPE.replace('{categoryId}', category).replace(
        '{typeId}',
        selected.type_id
      ),
      { mode: 'cors' }
    )
      .then((res) => res.json())
      .then((res) => {
        setImages(res);
        setLoadingImage(false);
      })
      .catch((e) => setLoadingImage(false));
  }

  function selectImage(image) {
    setSelected(image);
  }

  return (
    <>
      <Header stackclose={-2}>
        <div className="title">
          <div onClick={() => history.goBack()}>
            <SvgBack />
          </div>
          <div>{selected?.name}</div>
        </div>
      </Header>
      <Body>
        {(loading && (
          <div className="loader-container">
            <Loader size="large" />
          </div>
        )) || (
          <div className="page-detail">
            <div className={`item ${!expand && 'hidden'}`}>
              <img src={selected?.url} alt={selected?.name} />

              <div className="hcategory">
                <div className="switch-container">
                  trocar estampa
                  <label className="switch">
                    <input type="checkbox" onChange={toggleSwap} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="category-container">
                  {swap.show &&
                    ((swap.loading && <Loader />) || (
                      <select onChange={onSelectCategory}>
                        <option>selecione</option>
                        {categories?.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    ))}
                </div>
              </div>
              <div className="image-list">
                {swap.show &&
                  ((loadingImage && <Loader />) ||
                    (images &&
                      images.map((i) => (
                        <img
                          key={i.id}
                          src={i.thumb_url}
                          onClick={() => selectImage(i)}
                        />
                      ))))}
              </div>
            </div>

            <div className="stores">
              <div className="find">
                <button onClick={() => setExpand(!expand)}>
                  <span className={`${expand ? 'bottom' : 'top'}`}>»</span>
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
                          <div className="i3">{l.delivery}</div>
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
        )}
      </Body>
    </>
  );
}
