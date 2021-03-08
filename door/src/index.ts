import habitat from "preact-habitat";

import Button from "./components/button";

const _button = habitat(Button);

window.onload = function () {
  const imgs = document.querySelectorAll("img");
  console.log("imgs", imgs);

  imgs.forEach(function (img, idx) {
    const span = document.createElement("span");
    span.classList.add("imprimapp");
    span.classList.add("imprimapp"+idx);
    span.style.position = "relative";
    span.style.right = "0";
    span.style.top = "-8px";
    span.style.marginLeft = "-30px";

    span.onclick = function (event) {
      event.stopImmediatePropagation();
      event.stopPropagation();
    };
    img.after(span);

    if (!img.style.maxWidth) {
      img.style.maxWidth = '100%';
    }

    _button.render({
      selector: '.imprimapp'+idx,
      clean: true,
      defaultProps: {
        target: img
      }
    });
  });
};
