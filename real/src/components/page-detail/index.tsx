import { h, createRef, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

import "./style.scss";
import { Merchant } from '../../constants/merchants';
import Loader from "../loader";
import { GET_MERCHANT, GET_CATEGORY, GET_CATEGORY_TYPE } from '../../constants/endpoints';
import Header from "../header";
import Body from "../body";

interface PageParams {
  appState: any,
  setAppState: any
}

const svgMore = (
  <svg width="23" height="39" viewBox="0 0 23 39" style="transform:scale(0.8);fill:#444;">
    <path class="slideshow-arrow" d="M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z" transform="translate(-855 -230)"></path>
  </svg>
);

const svgBack = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <g fill="none" fill-rule="evenodd">
      <path d="M0 0H16V16H0z" transform="matrix(1 0 0 -1 0 16)"></path>
        <path fill="#444" fill-rule="nonzero" d="M7.631 1.333L6.368 0 0 6.667 6.368 13.333 7.631 12.001 3.428 7.6 13.333 7.601 13.333 5.743 3.418 5.742z" transform="matrix(1 0 0 -1 0 16) translate(1.333 1.333)"></path>
      </g>
  </svg>
);

export default function PageDetail({ appState, setAppState }: PageParams) {
  const { item } = appState.data;
  const [loading, setLoading] = useState(false);
  const [merchants, setMerchants] = useState<any>(null);
  const [categories, setCategories] = useState<any>(null);
  const [images, setImages] = useState<any>(null);
  const [swap, setSwap] = useState({loading: false, show: false});
  const cepRef = createRef();
  const [selected, setSelected] = useState<any>({});
  const [loadingImage, setLoadingImage] = useState(false);

  function checkCEP(e: any) {
    console.log(e.target.value);
    if (e.key === 'Enter') {
      findMerchant();
    }
  }

  useEffect(() => {
    setSelected(item);
    // window.history.pushState(null, 'modalimprima', '/alo/detalhes');
    const taddress = localStorage.getItem('address');
    const address = JSON.parse(taddress === 'undefined' ? '{}' : taddress as string);
    if (address.zip) {
      cepRef.current.value = address.zip;
      findMerchant();
    }
  }, []);

  function findMerchant() {
    setLoading(true);
    const cep = cepRef.current.value;
    fetch(GET_MERCHANT.replace('{id}', item.id).replace('{cep}', cep), { mode: 'cors' })
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setMerchants(res.merchants);
        localStorage.setItem('address', JSON.stringify(res.address));
      })
      .catch(e => setLoading(false));
  }

  function select(l: Merchant) {
    setAppState({ page: 2, data: { item, merchant: l } });
  }

  function toggleSwap() {
    if (!swap.show) {
      setSwap({loading: true, show: true});
      fetch(GET_CATEGORY, { mode: 'cors' })
        .then(res => res.json())
        .then(res => {
          setSwap({loading: false, show: true});
          setCategories(res);
        })
        .catch(e => setSwap({loading: false, show: false}));
    } else {
      setSwap({loading: false, show: false});
    }
  }

  function onSelectCategory(event: any) {
    const category = event.target.value;
    setLoadingImage(true);
    fetch(
      GET_CATEGORY_TYPE
      .replace('{categoryId}', category)
      .replace('{typeId}', item.type_id),
      { mode: 'cors' }
    )
    .then(res => res.json())
    .then(res => {
      setImages(res);
      setLoadingImage(false);
    })
    .catch(e => setLoadingImage(false));
  }

  function selectImage(image: any) {
    console.log(image);
    setSelected({...selected, id: image.id, url: image.url});
  }

  return (
  <Fragment>
    <Header>
      <div class="title">
        <div onClick={() => setAppState({page: 0})}>{svgBack}</div>
        <div>{selected.name}</div>
      </div>
    </Header>
    <Body>
      <div class="page-detail">
        <div class="hcategory">
          <div class="switch-container">
            trocar estampa 
            <label class="switch">
              <input type="checkbox" onChange={toggleSwap}/>
              <span class="slider round"></span>
            </label>
          </div>
          <div class="category-container">
            {swap.show && (swap.loading && <Loader /> || (
              <select onChange={onSelectCategory}>
                <option>selecione</option>
                {categories.map((c: any) => <option value={c.id}>{c.name}</option>)}
              </select>
            ))}
          </div>
        </div>
        <div class="image-list">
          {swap.show && (loadingImage && <Loader /> || (
            images && images.map((i: any) => <img src={i.thumb_url} onClick={() => selectImage(i)}/>)
          ))}
        </div>

        <img src={selected.url} alt={selected.name} />
        <div class="stores">
          <div class="find">
            <input ref={cepRef} onKeyUp={checkCEP} placeholder="Digite seu CEP" autofocus />
            <button onClick={() => findMerchant()}>
              {loading && <Loader /> || '🔍'}
            </button>
          </div>
          <div class="list">
            {(merchants && (merchants.length && (
              <Fragment>
                <div class="item">
                  <div class="i1 b">Fornecedor</div>
                  <div class="i2 b">Preço</div>
                  <div class="i3 b">Frete</div>
                  <span class="i5">&nbsp;</span>
                </div>
                {merchants.map((l: Merchant) => (
                  <div class="item">
                    <div class="i1">{l.name}<br/>
                      <span class="small">{l.city} - {l.uf}</span>
                    </div>
                    {/* <div class="i2">R${l.preco}</div> */}
                    <div class="i2">
                      <div class="small">a partir de</div>R${l.price}
                    </div>
                    <div class="i3">{l.delivery}</div>
                    <span class="i5" onClick={() => select(l)}>{svgMore}</span>
                  </div>
                ))}
              </Fragment>
            ) || <h3>Nenhum fornecedor na sua localidade.</h3>))}
          </div>
        </div>
      </div>
    </Body>
  </Fragment>
  );
}
