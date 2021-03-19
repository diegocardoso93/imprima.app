import { render } from "preact";
import App from "./components/app";


const imprimapp = document.getElementById('imprimapp');
if (imprimapp) {
  const urlParams = new URLSearchParams(window.location.search);
  localStorage.setItem('kindId', urlParams.get('kindId') || '');
  localStorage.setItem('imprimaId', urlParams.get('imprimaId') || '');
  
  render(App, document.body);
}
