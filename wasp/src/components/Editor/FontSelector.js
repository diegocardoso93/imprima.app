import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FontFaceObserver from 'fontfaceobserver';

export default function FontSelector({ canvas, visible }) {
  var fonts = [
    'Arial Black',
    'Pacifico',
    'Zilla Slab Highlight',
    'Quicksand',
    'VT323',
  ];

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
        alert('font loading failed ' + font);
      });
  }

  function onChange(event) {
    if (event.target.value !== 'Arial Black') {
      loadAndUse(event.target.value);
    } else {
      canvas.getActiveObject().set('fontFamily', event.target.value);
      canvas.requestRenderAll();
    }
  }

  if (!visible) {
    return <></>;
  }

  return (
    <div className="font-selector">
      <label>Fonte de letra: </label>
      <select onChange={onChange}>
        {fonts.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
    </div>
  );
}

FontSelector.propTypes = {
  canvas: PropTypes.any,
  visible: PropTypes.bool,
};
