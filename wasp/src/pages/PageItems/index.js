import React, { useEffect, useState } from 'react';

import { GET_PRODUCTS_BY_KIND } from '../../constants/endpoints';
import Header from '../../components/Header';
import Body from '../../components/Body';
import Loader from '../../components/Loader';

import './style.scss';
import { useHistory } from 'react-router';
import SvgMore from '../../components/SvgMore';

export default function PageItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let x = 0;
    window.onbeforeunload = (e) => {
      if (x == 0) {
        dispose();
        x = 1;
      }
    };
    window.onpopstate = (e) => {
      dispose();
    };

    return () => {
      window.onbeforeunload = () => {};
      window.onpopstate = () => {};
    };
  }, []);

  const dispose = () => {
    parent.postMessage({ active: false }, '*');
  };

  function select(item) {
    history.push(`/alo/produto/${item.id}${location.search}`);
  }

  useEffect(() => {
    setLoading(true);
    fetch(
      GET_PRODUCTS_BY_KIND.replace(
        '{kindId}',
        localStorage.getItem('kindId') || ''
      )
    )
      .then((res) => res.json())
      .then((val) => {
        setItems(val);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header stackclose={-1}>
        <div className="logo">
          <a
            href="https://imprima.app"
            target="_blank"
            rel="noreferrer"
            className="logo-link"
          >
            <div className="inner">
              <img src="/img/logo_100.png" alt="" />
            </div>
          </a>

          <h1>Comprar personalizado</h1>
        </div>
      </Header>

      <Body>
        {(loading && (
          <div className="loader-container">
            <Loader size="large" />
          </div>
        )) || (
          <div className="page-items">
            <div className="options">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="option"
                  onClick={() => select(item)}
                >
                  <div className="left">
                    <img src={item.thumb_url} alt="" className="image" />
                    <span>{item.name}</span>
                  </div>
                  <span className="select">
                    <SvgMore />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Body>
    </>
  );
}
