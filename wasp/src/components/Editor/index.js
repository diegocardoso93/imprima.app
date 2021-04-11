import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fabric } from 'fabric';
import FontSelector from './FontSelector';
import { Pallet } from './Pallet';
import { ImageDrop } from './ImageDrop';
import { defaultDrop } from './consts';
import './style.scss';

let canvas;

export const Editor = forwardRef(({ type_id }, ref) => {
  const [drop, setDrop] = useState(defaultDrop);
  const [showCanvas, setShowCanvas] = useState(true);
  const [imgProcs, setImgProcs] = useState([]);
  const [dropping, setDropping] = useState();
  const [xcanvas, setXCanvas] = useState();
  const [fontSelectorVisible, setFontSelectorVisible] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);

  const innerWidth = window.innerWidth > 505 ? 506 : window.innerWidth - 32;

  useEffect(() => {
    fabricAddBackground(`https://imprima.app/img/default/${type_id}.png`);
    canvas = new fabric.Canvas('fabric-area', {
      preserveObjectStacking: true,
    });

    setXCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  function onDrop(value) {
    console.log('onDrop', value);
    setDrop(value);
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

  const height = (innerWidth / 506) * 440;
  const canvasHeight = height > 300 ? height : 250;

  return (
    <div className="editor">
      <div style={{ display: showCanvas ? 'flex' : 'none' }}>
        <div style={{ display: 'flex' }}>
          <canvas
            ref={ref}
            id="fabric-area"
            width={innerWidth}
            height={canvasHeight}
          />
          <FontSelector canvas={xcanvas} visible={fontSelectorVisible} />
          <Pallet
            canvas={xcanvas}
            imgProcs={imgProcs}
            setDrop={setDrop}
            setShowCanvas={setShowCanvas}
            setDropping={setDropping}
            setImgProcs={setImgProcs}
            loadingImg={loadingImg}
            setLoadingImg={setLoadingImg}
            setFontSelectorVisible={setFontSelectorVisible}
          />
        </div>
      </div>

      <div className="modal-options">
        <div className="motitle">
          <span className="motext">Fonte de letra</span>
          <span className="moclose">×</span>
        </div>
        <div>body</div>
      </div>

      {dropping && (
        <ImageDrop
          canvas={xcanvas}
          drop={drop}
          dropping={dropping}
          onDrop={onDrop}
          imgProcs={imgProcs}
          setDrop={setDrop}
          setShowCanvas={setShowCanvas}
          setDropping={setDropping}
          setImgProcs={setImgProcs}
          loadingImg={loadingImg}
          setLoadingImg={setLoadingImg}
          canvasHeight={canvasHeight}
        />
      )}
    </div>
  );
});

Editor.propTypes = {
  type_id: PropTypes.number,
};

export default Editor;
