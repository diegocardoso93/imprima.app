import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import { createPortal } from "preact/compat";

import "./style.scss";
import App from "../app";

interface ButtonParams {
  target: HTMLElement
}

export default function Button({ target }: ButtonParams) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    window.history.pushState(null, 'modalimprima', '');
    setOpen(true);
  }

  function handleClose() {
    window.history.back();
    setOpen(false);
  }

  window.onpopstate = (e: any) => {
    console.log(e.state);
    setOpen(false);
  }

  return (
    <Fragment>
      <button onClick={handleOpen}>
        i
      </button>
      {open ?
      createPortal(
        <App target={target} onDispose={handleClose} />,
        document.body
      ) : null}
    </Fragment>
  );
}
