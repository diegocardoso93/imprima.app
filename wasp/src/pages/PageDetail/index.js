import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { GET_PRODUCT } from '../../constants/endpoints';
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
  const [selected, setSelected] = useState();
  const history = useHistory();
  const customRef = useRef();
  const [xcanvas, setXCanvas] = useState();

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
  }, []);

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
            <div className="instructions">
              Você pode modificar a estampa como quiser, utilizando a barra de
              ferramentas ao lado.
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
