import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import {
  GET_CATEGORY,
  GET_CATEGORY_TYPE,
  GET_PRODUCT,
} from '../../constants/endpoints';
import Header from '../../components/Header';
import Body from '../../components/Body';
import SvgBack from '../../components/SvgBack';
import Loader from '../../components/Loader';

import './style.scss';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import usePersist from '../../hooks/usePersist';
import Editor from '../../components/Editor';

export default function PageDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [images, setImages] = useState(null);
  const [swap, setSwap] = useState({ loading: false, show: false });
  const [selected, setSelected] = useState();
  const [loadingImage, setLoadingImage] = useState(false);
  const history = useHistory();
  const customRef = useRef();
  const [xcanvas, setXCanvas] = useState();

  const [custom, setCustom] = useState(false);
  const [, psetSelected] = usePersist('selected');

  useEffect(() => {
    setLoading(true);
    fetch(GET_PRODUCT.replace('{id}', id))
      .then((res) => res.json())
      .then((res) => {
        console.log('selected', res);
        setLoading(false);
        setSelected(res);
      })
      .catch((e) => setLoading(false));

    setSwap({ loading: true, show: true });
    fetch(GET_CATEGORY, { mode: 'cors' })
      .then((res) => res.json())
      .then((res) => {
        setSwap({ loading: false, show: true });
        setCategories(res);
      })
      .catch((e) => setSwap({ loading: false, show: false }));
  }, []);

  function onSelectCategory(event) {
    const category = event.target.value;

    setImages([]);
    if (category === 'selecione') {
      return;
    }

    if (category === 'enviar') {
      setCustom(true);
      setSwap({ loading: false, show: true });
      return;
    }

    setCustom(false);
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

  function saveAndGo() {
    xcanvas?.discardActiveObject();
    xcanvas?.renderAll();

    psetSelected({
      ...selected,
      url: customRef.current?.toDataURL({ multiplier: 3 }),
      name: selected?.name.split(' ')[0] + ' personalizada',
    });

    // gravar imagem no backend!?

    history.push(`/alo/merchant`);
  }

  return (
    <>
      <Header stackclose={-2}>
        <div className="title">
          <div onClick={() => history.goBack()}>
            <SvgBack />
          </div>
          <div>{selected?.name.split(' ')[0] + ' personalizada'}</div>
        </div>
      </Header>
      <Body>
        {(loading && (
          <div className="loader-container">
            <Loader size="large" />
          </div>
        )) || (
          <div className="page-detail">
            <div className="item">
              {selected?.type_id && (
                <Editor
                  ref={customRef}
                  type_id={selected?.type_id}
                  xcanvas={xcanvas}
                  setXCanvas={setXCanvas}
                  startImage={selected?.url}
                />
              )}
            </div>
            {/* <div className="hcategory">
              <div className="switch-container">
                trocar estampa:
              </div>
              <div className="category-container">
                {swap.show &&
                  ((swap.loading && <Loader />) || (
                    <select onChange={onSelectCategory}>
                      <option value="selecione">selecione</option>
                      <option value="enviar">Personalizada</option>
                      {categories?.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  ))}
              </div>
            </div> */}
            <div className="image-list">
              {swap.show &&
                ((loadingImage && <Loader />) ||
                  (images &&
                    images?.map((i) => (
                      <img
                        key={i.id}
                        src={i.thumb_url}
                        onClick={() => selectImage(i)}
                      />
                    ))))}
            </div>
            <div className="btn-next">
              <button className="next" onClick={saveAndGo}>
                Continuar
              </button>
            </div>
          </div>
        )}
      </Body>
    </>
  );
}
