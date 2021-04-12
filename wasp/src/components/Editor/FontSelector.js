import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FontFaceObserver from 'fontfaceobserver';
import { fonts } from './consts';

export default function FontSelector({
  canvas,
  visible,
  width,
  setFontSelectorVisible,
}) {
  const selectRef = useRef();
  const colorRef = useRef();

  function onSelection(event) {
    const selected = event.selected[0];
    if (selected.type === 'text') {
      setFontSelectorVisible(true);
      setTimeout(() => {
        selectRef.current.value = selected.get('fontFamily');
        colorRef.current.value = selected.get('fill');
      }, 100);
    } else {
      setFontSelectorVisible(false);
    }
  }

  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', onSelection);
      canvas.on('selection:updated', onSelection);
      canvas.on('selection:cleared', () => setFontSelectorVisible(false));
    }
  }, [canvas]);

  function loadAndUse(font) {
    var myfont = new FontFaceObserver(font);
    myfont
      .load()
      .then(function () {
        canvas.getActiveObject().set('fontFamily', font);
        canvas.requestRenderAll();
      })
      .catch(function (e) {
        console.log(e);
        alert('erro ao carregar a fonte ' + font);
      });
  }

  function onFontChange(event) {
    if (event.target.value !== 'Arial Black') {
      loadAndUse(event.target.value);
    } else {
      canvas.getActiveObject().set('fontFamily', event.target.value);
      canvas.requestRenderAll();
    }
  }

  function onColorChange(event) {
    canvas.getActiveObject().set('fill', event.target.value);
    canvas.requestRenderAll();
  }

  if (!visible) {
    return <></>;
  }

  return (
    <div className="font-selector" style={{ width: width + 'px' }}>
      <label>Estilo da letra: </label>
      <select ref={selectRef} onChange={onFontChange}>
        {fonts.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
      <input
        ref={colorRef}
        className="input-color"
        type="color"
        name="color"
        value="#000000"
        onChange={onColorChange}
      />
    </div>
  );
}

FontSelector.propTypes = {
  canvas: PropTypes.any,
  visible: PropTypes.bool,
  width: PropTypes.number,
  setFontSelectorVisible: PropTypes.func,
};
