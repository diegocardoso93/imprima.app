import { render } from "preact";
import App from "./components/app";


const imprimapp = document.getElementById('imprimapp');
if (imprimapp) {
  render(App, document.body);
}
