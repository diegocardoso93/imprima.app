import { h } from "preact";

import "./style.scss";

export default function Header({ children }: any) {
  const dispose = () => {
    parent.postMessage({ active: false }, '*');
  };

  return (
    <div class="header">
      {children}
      <div class="close" onClick={dispose}>×</div>
    </div>
  );
}
