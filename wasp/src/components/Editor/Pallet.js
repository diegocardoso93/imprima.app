import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { defaultDrop } from './consts';

import {
  IconAddImage,
  IconSearch,
  IconText,
  IconSmile,
  IconBackground,
  IconRemove,
  IconChevronDown,
  IconChevronUp,
} from './icons';

export function Pallet({
  canvas,
  imgProcs,
  setDrop,
  setShowCanvas,
  setDropping,
  setImgProcs,
  loadingImg,
  setLoadingImg,
  setModal,
}) {
  const [textSelected, setTextSelected] = useState();
  const [photoSelected, setPhotoSelected] = useState();
  const [emojiSelected, setEmojiSelected] = useState();
  const [repoSelected, setRepoSelected] = useState();

  function onSelection(event) {
    const selected = event.selected[0];
    switch (selected.type) {
      case 'text':
        setTextSelected(true);
        break;
      case 'photo':
        setPhotoSelected(true);
        break;
      case 'emoji':
        setEmojiSelected(true);
        break;
      case 'repo':
        setRepoSelected(true);
        break;
    }
  }

  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', onSelection);
      canvas.on('selection:updated', onSelection);
      canvas.on('selection:cleared', () => {
        setTextSelected(false);
        setPhotoSelected(false);
        setEmojiSelected(false);
        setRepoSelected(false);
      });
    }
  }, [canvas]);

  function startAddImage() {
    setShowCanvas(false);
    setDropping(true);
    setDrop(defaultDrop);
  }

  function fabricAddText() {
    const textbox = new fabric.Textbox('', {
      fontSize: 26,
      fontFamily: 'Arial Black',
      left: 140,
      top: 100,
      width: 80,
      fill: 'black',
    });

    textbox.type = 'text';
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
        oImg.type = 'photo';
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
    setModal({ open: 'emoji', title: 'Escolha o emoji para adicionar' });
  }

  function fabricOpenRepo() {
    setModal({ open: 'repo', title: 'Escolha o modelo para adicionar' });
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
      <button onClick={() => fabricOpenRepo()}>
        <IconSearch />
      </button>
      <button onClick={() => fabricAddText()}>
        <IconText />
      </button>
      <button onClick={() => fabricOpenEmoji()}>
        <IconSmile />
      </button>
      {photoSelected && (
        <button onClick={() => toggleBackground()}>
          <IconBackground />
        </button>
      )}
      {(textSelected || photoSelected || emojiSelected || repoSelected) && (
        <>
          <button onClick={() => fabricRemoveItem()}>
            <IconRemove />
          </button>
          <button onClick={() => fabricMoveBack()}>
            <IconChevronDown />
          </button>
          <button onClick={() => fabricMoveFront()}>
            <IconChevronUp />
          </button>
        </>
      )}
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
  setModal: PropTypes.func,
};
