import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import Compressor from 'compressorjs';
import { fabric } from 'fabric';

import {
  GET_CATEGORY,
  GET_CATEGORY_TYPE,
  GET_PRODUCT,
  POST_IMAGE,
} from '../../constants/endpoints';
import Header from '../../components/Header';
import Body from '../../components/Body';
import SvgBack from '../../components/SvgBack';
import Loader from '../../components/Loader';

import './style.scss';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import usePersist from '../../hooks/usePersist';

let canvas;

export default function PageDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [images, setImages] = useState(null);
  const [swap, setSwap] = useState({ loading: false, show: false });
  const [selected, setSelected] = useState();
  const [loadingImage, setLoadingImage] = useState(false);
  const history = useHistory();
  const [drop, setDrop] = useState({
    result: null,
    filename: null,
    filetype: null,
    src: null,
    error: null,
  });
  const [dropping, setDropping] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [imgProc, setImgProc] = useState({});
  const [photo, setPhoto] = useState();
  const [, psetSelected] = usePersist('selected');

  const innerWidth = window.innerWidth > 505 ? 506 : window.innerWidth - 32;

  useEffect(() => {
    canvas = new fabric.Canvas('fabric-area');

    setLoading(true);
    fetch(GET_PRODUCT.replace('{id}', id))
      .then((res) => res.json())
      .then((res) => {
        console.log('selected', res);
        setLoading(false);
        setSelected(res);
      })
      .catch((e) => setLoading(false));

    return () => {
      canvas.dispose();
    };
  }, []);

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

    setImages([]);
    if (!category === 'selecione') {
      return;
    }

    if (category === 'enviar') {
      setDropping(true);
      setSwap({ loading: false, show: true });
      return;
    }

    setDropping(false);
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

  function onDrop(value) {
    console.log('onDrop', value);
    setDrop(value);
  }

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  function sendImage() {
    const { filename, filetype, result } = drop;
    console.log('image', { filename, filetype, result });

    setLoadingSend(true);
    const file = dataURLtoFile(result, 'image.jpg');
    new Compressor(file, {
      quality: 0.6,
      maxWidth: 1000,
      success(blob) {
        console.log('CompressorResult', blob);

        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          var base64data = reader.result;
          console.log(base64data);

          fetch(POST_IMAGE, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, filetype, result: base64data }),
          })
            .then((res) => res.json())
            .then((res) => {
              // setImages(res);

              console.log(res);
              setShowCanvas(true);
              setDropping(false);
              setLoadingSend(false);
              setImgProc(res);

              fabric.Image.fromURL(
                `https://imprima.app/img/default/${selected.type_id}.png`,
                function (oImg) {
                  oImg.scaleToWidth(innerWidth);
                  // canvas.add(oImg);
                  canvas.setBackgroundImage(oImg);
                },
                { crossOrigin: 'Anonymous' }
              );

              fabric.Image.fromURL(
                'https://imprima.app/' + res.image_out,
                function (oImg) {
                  console.log(oImg);
                  setPhoto(oImg);
                  oImg.scaleToWidth(180);
                  canvas.add(oImg);
                },
                { crossOrigin: 'Anonymous' }
              );
            })
            .catch((e) => setLoadingSend(false));
        };
      },
      error(err) {
        console.log(err.message);
        setLoadingSend(false);
      },
    });
  }

  function fabricAddText() {
    const textbox = new fabric.Textbox('Dois cliques aqui para editar', {
      fontSize: 20,
      left: 50,
      top: 100,
      width: 200,
    });
    canvas.add(textbox);
  }

  function toggleBackground() {
    setTimeout(() => {
      let imgTarget;
      const { checked } = document.querySelector('#fnd');
      console.log(checked);
      if (checked) {
        imgTarget = imgProc.image_out;
      } else {
        imgTarget = imgProc.image_in;
      }
      fabric.Image.fromURL('https://imprima.app/' + imgTarget, function (oImg) {
        canvas._objects.splice(
          canvas._objects.findIndex((o) => o.cacheKey === photo.cacheKey),
          1
        );
        oImg.top = photo.top;
        oImg.left = photo.left;
        oImg.scaleX = photo.scaleX;
        oImg.scaleY = photo.scaleY;
        setPhoto(oImg);
        canvas.add(oImg);
      });
    }, 300);
  }

  function saveAndGo() {
    psetSelected({
      ...selected,
      url: drop.filename ? canvas?.toDataURL() : selected?.url,
      name: drop.filename
        ? selected?.name.split(' ')[0] + ' personalizada'
        : selected?.name,
    });
    history.push(`/alo/merchant`);
  }

  useEffect(() => {
    if (dropping) {
      const dropzonei = document.querySelector('.dropzone-instructions--main');
      if (dropzonei) {
        dropzonei.innerText = 'Para enviar a imagem, clique ou arraste aqui.';
        const subinstructions = document.querySelectorAll(
          '.dropzone-instructions--sub'
        );
        subinstructions[0].innerText = 'Arquivos aceitos: .jpeg, .jpg, .png';
        subinstructions[1].innerText = 'Tamanho máximo: 10MB';
      }
    }
  }, [dropping]);

  const height = (innerWidth / 506) * 440;
  const canvasHeight = height > 300 ? height : 300;
  return (
    <>
      <Header stackclose={-2}>
        <div className="title">
          <div onClick={() => history.goBack()}>
            <SvgBack />
          </div>
          <div>
            {dropping || drop.filename
              ? selected?.name.split(' ')[0] + ' personalizada'
              : selected?.name}
          </div>
        </div>
      </Header>
      <Body>
        <div style={{ display: showCanvas ? 'block' : 'none' }}>
          <canvas id="fabric-area" width={innerWidth} height={canvasHeight} />
          <div className="text-info">arraste para fora para remover</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <button onClick={() => fabricAddText()}>adicionar texto</button>
            <label
              className="fnd"
              htmlFor="fnd"
              onClick={() => toggleBackground()}
            >
              <input id="fnd" name="fnd" type="checkbox" defaultChecked />
              imagem sem fundo
            </label>
          </div>
        </div>
        {(loading && (
          <div className="loader-container">
            <Loader size="large" />
          </div>
        )) || (
          <div className="page-detail">
            <div className={`item`}>
              {(dropping && (
                <>
                  <DropNCrop
                    onChange={onDrop}
                    value={drop}
                    maxFileSize={10485760}
                    canvasHeight={canvasHeight + 'px'}
                    cropperOptions={{
                      guides: true,
                      viewMode: 2,
                      autoCropArea: 1,
                      movable: false,
                      zoomable: false,
                      dragMode: 'none',
                      rotatable: false,
                      scalable: false,
                      checkOrientation: false,
                    }}
                  />
                  {(loadingSend && (
                    <div className="loader-container">
                      <Loader />
                    </div>
                  )) || (
                    <div className="btn-drop-container">
                      <button
                        className="btn-drop"
                        onClick={() => {
                          setDropping(false);
                          toggleSwap();
                        }}
                      >
                        ✖ cancelar
                      </button>
                      {drop.filename && (
                        <button
                          className="btn-drop confirm"
                          onClick={() => sendImage()}
                        >
                          ✔ enviar
                        </button>
                      )}
                    </div>
                  )}
                </>
              )) ||
                (!showCanvas && (
                  <img src={selected?.url} alt={selected?.name} />
                ))}
            </div>
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
                      <option value="enviar">Enviar foto</option>
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
