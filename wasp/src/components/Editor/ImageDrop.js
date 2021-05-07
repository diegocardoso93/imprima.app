import React, { useState, useEffect } from 'react';
import Compressor from 'compressorjs';
import PropTypes from 'prop-types';
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import { POST_IMAGE } from '../../constants/endpoints';
import Loader from '../Loader';
import { dataURLtoFile } from '../../utils';
import { defaultDrop } from './consts';

export function ImageDrop({
  drop,
  dropping,
  onDrop,
  imgProcs,
  setDrop,
  setShowCanvas,
  setDropping,
  setImgProcs,
  setLoadingImg,
  canvasHeight,
  canvas,
}) {
  const [loadingSend, setLoadingSend] = useState(false);

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
              setLoadingSend(false);
              setLoadingImg(true);

              fabric.Image.fromURL(
                'https://imprima.app/' + res.image_out,
                function (oImg) {
                  res.obj = oImg;
                  res.active = res.image_out;
                  oImg.scaleToWidth(180);
                  oImg.type = 'photo';
                  canvas.add(oImg);
                  setImgProcs([...imgProcs, res]);
                  setLoadingImg(false);
                  setDropping(false);
                  setShowCanvas(true);
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

  function stopAddImage() {
    setShowCanvas(true);
    setDropping(false);
    setDrop(defaultDrop);
  }

  return (
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
            <button className="btn-drop confirm" onClick={() => sendImage()}>
              ✔ enviar
            </button>
          )}
        </div>
      )}
    </>
  );
}

ImageDrop.propTypes = {
  dropping: PropTypes.bool,
  drop: PropTypes.objectOf(PropTypes.any),
  onDrop: PropTypes.func,
  imgProcs: PropTypes.array,
  setDrop: PropTypes.func,
  setShowCanvas: PropTypes.func,
  setDropping: PropTypes.func,
  setImgProcs: PropTypes.func,
  setLoadingImg: PropTypes.func,
  canvasHeight: PropTypes.number,
  canvas: PropTypes.any,
};
