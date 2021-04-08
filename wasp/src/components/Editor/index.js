import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DropNCrop from '@synapsestudios/react-drop-n-crop';
import Compressor from 'compressorjs';
import { fabric } from 'fabric';
import { POST_IMAGE } from '../../constants/endpoints';
import Loader from '../../components/Loader';
import { dataURLtoFile } from '../../utils';
import './style.scss';

let canvas;
const defaultDrop = {
  result: null,
  filename: null,
  filetype: null,
  src: null,
  error: null,
};

export default function Editor({ type_id }) {
  const [drop, setDrop] = useState(defaultDrop);
  const [loadingSend, setLoadingSend] = useState(false);
  const [showCanvas, setShowCanvas] = useState(true);
  const [imgProcs, setImgProcs] = useState([]);
  const [dropping, setDropping] = useState();
  const [loadingImg, setLoadingImg] = useState(false);

  const innerWidth = window.innerWidth > 505 ? 506 : window.innerWidth - 32;

  useEffect(() => {
    canvas = new fabric.Canvas('fabric-area');
    fabricAddBackground(`https://imprima.app/img/default/${type_id}.png`);

    return () => {
      canvas.dispose();
    };
  }, []);

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

  function onDrop(value) {
    console.log('onDrop', value);
    setDrop(value);
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

          fetch(POST_IMAGE, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, filetype, result: base64data }),
          })
            .then((res) => res.json())
            .then((res) => {
              setShowCanvas(true);
              setDropping(false);
              setLoadingSend(false);

              setLoadingImg(true);
              fabric.Image.fromURL(
                'https://imprima.app/' + res.image_out,
                function (oImg) {
                  res.obj = oImg;
                  res.active = res.image_out;
                  oImg.scaleToWidth(180);
                  canvas.add(oImg);
                  setImgProcs([...imgProcs, res]);
                  setLoadingImg(false);
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

  function fabricAddBackground(url) {
    fabric.Image.fromURL(
      url,
      function (oImg) {
        oImg.scaleToWidth(innerWidth);
        canvas.setBackgroundImage(oImg);
        canvas.renderAll();
      },
      { crossOrigin: 'Anonymous' }
    );
  }

  function fabricAddText() {
    const textbox = new fabric.Textbox('', {
      fontSize: 26,
      left: 200,
      top: 100,
      width: 200,
    });
    textbox.enterEditing();
    textbox.hiddenTextarea.focus();
    canvas.setActiveObject(textbox);
    canvas.add(textbox);
  }

  function toggleBackground() {
    const activeObject = canvas.getActiveObject();
    if (!activeObject || loadingImg) {
      return;
    }

    let imgIdx = imgProcs.findIndex((i) => i.obj === activeObject);
    let imgActive = imgProcs[imgIdx];
    imgActive.active =
      imgActive.active === imgActive.image_in
        ? imgActive.image_out
        : imgActive.image_in;

    setLoadingImg(true);
    fabric.Image.fromURL(
      'https://imprima.app/' + imgActive.active,
      function (oImg) {
        canvas.remove(activeObject);
        oImg.top = imgActive.obj.top;
        oImg.left = imgActive.obj.left;
        oImg.scaleX = imgActive.obj.scaleX;
        oImg.scaleY = imgActive.obj.scaleY;
        imgActive.obj = oImg;
        canvas.add(oImg);
        canvas.setActiveObject(oImg);
        imgProcs.splice(imgIdx, 1);
        setImgProcs([imgActive, ...imgProcs]);
        setLoadingImg(false);
      }
    );
  }

  function fabricRemoveItem() {
    canvas.remove(canvas.getActiveObject());
  }

  function startAddImage() {
    setShowCanvas(false);
    setDropping(true);
    setDrop(defaultDrop);
  }

  function stopAddImage() {
    setShowCanvas(true);
    setDropping(false);
    setDrop(defaultDrop);
  }

  const height = (innerWidth / 506) * 440;
  const canvasHeight = height > 300 ? height : 300;

  return (
    <div className="editor">
      <div style={{ display: showCanvas ? 'flex' : 'none' }}>
        <div style={{ display: 'flex' }}>
          <canvas id="fabric-area" width={innerWidth} height={canvasHeight} />
          <div className="palet">
            <button onClick={() => fabricAddText()}>
              <IconText />
            </button>
            <button onClick={() => toggleBackground()}>
              <IconBackground />
            </button>
            <button onClick={() => startAddImage()}>
              <IconAddImage />
            </button>
            <button onClick={() => fabricRemoveItem()}>
              <IconRemove />
            </button>
          </div>
        </div>
      </div>

      {dropping && (
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
              <button className="btn-drop" onClick={() => stopAddImage()}>
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
      )}
    </div>
  );
}

Editor.propTypes = {
  type_id: PropTypes.number,
};

const IconBackground = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22 20.7L3.3 2L2 3.3L3 4.3V19C3 20.1 3.9 21 5 21H19.7L20.7 22L22 20.7M5 19V6.3L12.6 13.9L11.1 15.8L9 13.1L6 17H15.7L17.7 19H5M8.8 5L6.8 3H19C20.1 3 21 3.9 21 5V17.2L19 15.2V5H8.8"
    />
  </svg>
);

const IconBackgroundRemove = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z"
    />
  </svg>
);

const IconText = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z"
    />
  </svg>
);

const IconRemove = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
    />
  </svg>
);

const IconAddImage = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z"
    />
  </svg>
);
