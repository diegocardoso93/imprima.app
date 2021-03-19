(function () {

var styleEl = document.createElement('style')
styleEl.innerText = `
  .pg-imprima-ad {
    margin: 0;
    padding: 0;
    width: 300px;
    height: 250px;
  }
  .pg-imprima-ad.full {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
  .pg-imprima-ad .lds-ring {
    position: relative;
    margin: auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .pg-imprima-ad .lds-ring div {
    box-sizing: border-box;
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 36px;
    height: 36px;
    margin: 9px 3px;
    border: 4px solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }
  .pg-imprima-ad .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .pg-imprima-ad .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .pg-imprima-ad .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .pg-imprima-ad .loading {
    position: relative;
    width: 300px;
    height: 250px;
    background-color: white;
    margin-top: -257px;
    display: none;
  }
  .pg-imprima-ad .loading.full {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    margin-top: 0;
  }
  .pg-imprima-ad .iframe-app {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
  }
  .pg-imprima-ad iframe {
    width: 300px;
    height: 250px;
    position: unset;
  }`;

window.onload = () => {
  const imprimaAd = document.querySelector('.pg-imprima-ad');

  function IframeControl() {
    const iframeEl = document.createElement('iframe');
    const bodyEl = document.querySelector('body');
    const loadingEl = document.createElement('div');
    const defaultOverflow = bodyEl.style.overflow;
    let clicked = false;

    loadingEl.classList.add('loading');
    loadingEl.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'

    document.querySelector('head').appendChild(styleEl);

    imprimaAd.appendChild(iframeEl);
    imprimaAd.appendChild(loadingEl);

    const setBanner = (init) => {
      clicked = false;
      iframeEl.src = "https://imprima.app/banner?imprimaId=" +
        imprimaAd.getAttribute('data-imprima-id') +
        "&url=" + window.location.href +
        "&query=" + btoa(document.title);
      iframeEl.classList.remove('iframe-app');

      if (!init) {
        imprimaAd.classList.remove('full');
        loadingEl.classList.remove('full');
        loadingEl.style.display = 'block';
        iframeEl.onload = function () {
          loadingEl.style.display = 'none';
        }
      }

      bodyEl.style.overflow = defaultOverflow;
    }

    const setApp = (kindId, imprimaId) => {
      if (!clicked) {
        iframeEl.src = `https://imprima.app/alo?kindId=${kindId}&imprimaId=${imprimaId}`;
        iframeEl.classList.add('iframe-app');

        imprimaAd.classList.add('full');
        loadingEl.classList.add('full');
        loadingEl.style.display = 'block';
        iframeEl.onload = function () {
          loadingEl.style.display = 'none';
          iframeEl.contentWindow.history.back = window.history.back;
        }
        bodyEl.style.overflow = 'hidden';
        clicked = true;
      }
    }

    window.addEventListener('message', (e) => {
      const { active, kindId, imprimaId } = e.data; 
      if (active) {
        setApp(kindId, imprimaId);
        return;
      }
      setBanner();
    }, false);

    setBanner(true);
  }

  IframeControl();

}

})();
