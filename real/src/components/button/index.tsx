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
  return (
    <Fragment>
      <button onClick={() => setOpen(!open)}>
        i
      </button>
      {open ?
      createPortal(
        <App target={target} onDispose={() => setOpen(false)} />,
        document.body
      ) : null}
    </Fragment>
  );
}
