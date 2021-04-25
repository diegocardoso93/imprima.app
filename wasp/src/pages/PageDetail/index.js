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

    history.push(`/criador/fornecedor`);
  }

  return (
    <>
      <Header stackclose={-2}>
        <div className="title">
          <div onClick={() => history.goBack()}>
            <SvgBack />
          </div>
          <div>
            {selected ? selected?.name.split(' ')[0] + ' personalizada' : ''}
          </div>
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
              <IconInfo />
              <span>Arraste a imagem para reposicionar.</span>
            </div>
            <div className="instructions">
              <IconInfo />
              <span>
                Você pode modificar a estampa como quiser, ou enviar a sua
                imagem, experimente a barra de ferramentas ao lado.
              </span>
            </div>
            <div className="instructions">
              <IconInfo />
              <span>
                Ao adicionar texto, clique fora da caixa e resselecione para
                mover.
              </span>
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

const IconInfo = () => (
  <svg className="icon-info" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
    ></path>
  </svg>
);
