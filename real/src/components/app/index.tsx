import { h, createRef, Fragment } from "preact";
import { useEffect } from "preact/hooks";

import "./style.scss";

interface AppParams {
  target: HTMLElement,
  onDispose: () => void
}

const options = [
  {
    name: 'camiseta',
    image: '/camiseta1.png'
  },
  {
    name: 'caneca de porcelana',
    image: '/caneca1.png'
  },
  {
    name: 'boné',
    image: '/bone1.png'
  },
  {
    name: 'chapéu',
    image: '/chapeu.png'
  },
  {
    name: 'almofada',
    image: '/almofada.png'
  },
  {
    name: 'quadro',
    image: '/quadro.png'
  },
];

const svgDetail = (
  <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNMTguNjI5IDE1Ljk5N2wtNy4wODMtNy4wODFMMTMuNDYyIDdsOC45OTcgOC45OTdMMTMuNDU3IDI1bC0xLjkxNi0xLjkxNnoiLz48L3N2Zz4='/>
);

export default function App({ target, onDispose }: AppParams) {
  console.log('App', target);
  const elRef = createRef();

  function dispose() {
    elRef.current.parentElement.removeChild(elRef.current);
    onDispose();
  }

  return (
    <div ref={elRef} class="imprimapp-modal">
      <div class="header">
        <h1>
          Comprar personalizado
        </h1>
        <div class="close" onClick={dispose}>×</div>
      </div>

      <div class="body">
        <div class="options">
          {options.map(o => (
            <div class="option">
              <div class="left">
                <img src={o.image} alt="" class="image" />
                <span>{o.name}</span>
              </div>
              <span class="select">{svgDetail}</span>
            </div>
          ))}
          </div>
      </div>
    </div>
  );
}
