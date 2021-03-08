import { h, createRef } from "preact";
import { useState } from "preact/hooks";

import "./style.scss";

interface AppParams {
  target: HTMLElement,
  onDispose: () => void
}

export default function App({ target, onDispose }: AppParams) {
  const elRef = createRef();
  const [loading, setLoading] = useState(false);

  function dispose() {
    elRef.current.parentElement.removeChild(elRef.current);
    onDispose();
  }

  function onLoad(e: any) {
    console.log('loaded', e);
    setLoading(false);
  }

  function onLoadStart(e: any) {
    setLoading(true);
  }

  // window.history.pushState
  // window.onpopstate = (e) => console.log(e.state);

  return (
    <div ref={elRef} class="imprimapp-modal">
      <div class="close" onClick={dispose}>×</div>
      {loading && <div class="loading-overlay" />}
      <iframe src="https://imprima.app" onLoadStart={onLoadStart} onLoad={onLoad} />
    </div>
  );
}
