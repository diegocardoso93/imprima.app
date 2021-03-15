import { h } from "preact";

import "./style.scss";

export default function Body({ children }: any) {
  return (
    <div class="body">
      {children}
    </div>
  );
}
