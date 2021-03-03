import { h } from "preact";

import "./style.scss";

export default function Loader() {
  return (
    <div class="lds-ring">
      <div></div><div></div><div></div><div></div>
    </div>
  );
}
