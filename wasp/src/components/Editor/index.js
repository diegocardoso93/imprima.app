import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fabric } from 'fabric';
import 'fabric-history';

import FontSelector from './FontSelector';
import { Pallet } from './Pallet';
import { ImageDrop } from './ImageDrop';
import { defaultDrop, repo } from './consts';
import './style.scss';
import Modal from '../Modal';

let canvas;

export const Editor = forwardRef(
  ({ type_id, xcanvas, setXCanvas, startImage }, ref) => {
    const [drop, setDrop] = useState(defaultDrop);
    const [showCanvas, setShowCanvas] = useState(true);
    const [imgProcs, setImgProcs] = useState([]);
    const [dropping, setDropping] = useState();
    const [fontSelectorVisible, setFontSelectorVisible] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [modal, setModal] = useState({});

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

    function addEmoji(identifier) {
      fabric.Image.fromURL(
        `https://imprima.app/img/emoji/${identifier}.png`,
        function (oImg) {
          oImg.scaleToWidth(70);
          oImg.type = 'emoji';
          canvas.add(oImg);
        },
        { crossOrigin: 'Anonymous' }
      );
      setModal({});
    }

    function addRepo(identifier) {
      fabric.Image.fromURL(
        `https://imprima.app/img/repo/${identifier}`,
        function (oImg) {
          oImg.scaleToWidth(120);
          oImg.type = 'repo';
          canvas.add(oImg);
        },
        { crossOrigin: 'Anonymous' }
      );
      setModal({});
    }

    useEffect(() => {
      if (startImage) {
        fabric.Image.fromURL(
          startImage,
          function (oImg) {
            console.log('oImg', oImg, canvas);
            oImg.scaleToWidth(180);
            // oImg.set('center', 200);
            oImg.set('top', 10);
            // oImg.set('left', '40%');
            oImg.setCoords();
            oImg.type = 'repo';
            canvas.add(oImg);
          },
          { crossOrigin: 'Anonymous' }
        );
      }
    }, [startImage]);

    const height = (innerWidth / 506) * 440;
    const canvasHeight = height;

    return (
      <div className="editor">
        <div style={{ display: showCanvas ? 'flex' : 'none' }}>
          <div style={{ display: 'flex', width: innerWidth + 16 + 'px' }}>
            <canvas
              ref={ref}
              id="fabric-area"
              width={innerWidth - 26}
              height={canvasHeight}
            />
            <FontSelector
              canvas={xcanvas}
              visible={fontSelectorVisible}
              width={innerWidth - 26}
              setFontSelectorVisible={setFontSelectorVisible}
            />
            <Pallet
              canvas={xcanvas}
              imgProcs={imgProcs}
              setDrop={setDrop}
              setShowCanvas={setShowCanvas}
              setDropping={setDropping}
              setImgProcs={setImgProcs}
              loadingImg={loadingImg}
              setLoadingImg={setLoadingImg}
              setModal={setModal}
            />
          </div>
        </div>

        <Modal
          title={modal.title}
          open={modal.open === 'emoji'}
          innerWidth={innerWidth}
          onClose={() => setModal({})}
        >
          {Array(323)
            .fill()
            .map((v, i) => (
              <img
                className="emoji"
                key={i}
                src={`https://imprima.app/img/emoji/${i + 111}.png`}
                onClick={() => addEmoji(i + 111)}
              />
            ))}
        </Modal>

        <Modal
          title={modal.title}
          open={modal.open === 'repo'}
          innerWidth={innerWidth}
          onClose={() => setModal({})}
        >
          {repo.map((r, i) => (
            <img
              className="repo"
              key={i}
              src={`https://imprima.app/img/repo/${r}`}
              onClick={() => addRepo(r)}
            />
          ))}
        </Modal>

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
  }
);

Editor.propTypes = {
  type_id: PropTypes.number,
  xcanvas: PropTypes.any,
  setXCanvas: PropTypes.func,
  startImage: PropTypes.string,
};

export default Editor;
