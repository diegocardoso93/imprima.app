import React from 'react';
import PropTypes from 'prop-types';

import { defaultDrop } from './consts';

export function Pallet({
  canvas,
  imgProcs,
  setDrop,
  setShowCanvas,
  setDropping,
  setImgProcs,
  loadingImg,
  setLoadingImg,
  setFontSelectorVisible,
}) {
  function startAddImage() {
    setShowCanvas(false);
    setDropping(true);
    setDrop(defaultDrop);
  }

  function fabricAddText() {
    const textbox = new fabric.Textbox('', {
      fontSize: 26,
      fontFamily: 'Arial Black',
      left: 200,
      top: 100,
      width: 200,
      fill: 'black',
    });

    textbox.enterEditing();
    textbox.hiddenTextarea.focus();
    canvas.setActiveObject(textbox);
    canvas.add(textbox);
    textbox.on('selected', () => {
      setFontSelectorVisible(true);
    });
    setFontSelectorVisible(true);
    canvas.on('selection:cleared', () => setFontSelectorVisible(false));
  }

  function toggleBackground() {
    const activeObject = canvas.getActiveObject();
    if (!activeObject || loadingImg) {
      return;
    }

    let imgIdx = imgProcs.findIndex((i) => i.obj === activeObject);
    if (imgIdx === -1) {
      return;
    }
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

  function fabricOpenEmoji() {
    fabric.Image.fromURL(
      'https://imprima.app/img/emoji/grinning-face_1f600.png',
      function (oImg) {
        oImg.scaleToWidth(70);
        canvas.add(oImg);
      },
      { crossOrigin: 'Anonymous' }
    );
  }

  function fabricMoveBack() {
    canvas.getActiveObject().sendToBack();
  }

  function fabricMoveFront() {
    canvas.getActiveObject().bringToFront();
  }

  return (
    <div className="palet">
      <button onClick={() => startAddImage()}>
        <IconAddImage />
      </button>
      <button onClick={() => fabricAddText()}>
        <IconText />
      </button>
      <button onClick={() => fabricOpenEmoji()}>
        <IconSmile />
      </button>
      <button onClick={() => toggleBackground()}>
        <IconBackground />
      </button>
      <button onClick={() => fabricRemoveItem()}>
        <IconRemove />
      </button>
      <button onClick={() => fabricMoveBack()}>
        <IconChevronDown />
      </button>
      <button onClick={() => fabricMoveFront()}>
        <IconChevronUp />
      </button>
    </div>
  );
}

Pallet.propTypes = {
  canvas: PropTypes.any,
  imgProcs: PropTypes.array,
  setDrop: PropTypes.func,
  setShowCanvas: PropTypes.func,
  setDropping: PropTypes.func,
  setImgProcs: PropTypes.func,
  setLoadingImg: PropTypes.func,
  loadingImg: PropTypes.any,
  setFontSelectorVisible: PropTypes.func,
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

const IconSmile = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
    />
  </svg>
);

const IconChevronUp = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
    />
  </svg>
);

const IconChevronDown = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
    />
  </svg>
);
