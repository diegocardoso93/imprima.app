(this.webpackJsonpwasp=this.webpackJsonpwasp||[]).push([[0],{197:function(e,t,c){"use strict";c.r(t);var n=c(1),i=c.n(n),a=c(73),s=c.n(a),r=(c(85),c(80)),o=c(3),l=c(2),d="https://imprima.app/api",j="".concat(d,"/kind/{id}"),u="".concat(d,"/product/{id}"),b="".concat(d,"/cep/{id}/{cep}"),h="".concat(d,"/category"),O="".concat(d,"/category/{categoryId}/type/{typeId}"),m="".concat(d,"/attributes/{productId}/{merchantId}"),v="".concat(d,"/checkout/preference"),x=(c(86),c(0));function p(e){var t=e.children,c=e.stackclose;return Object(x.jsxs)("div",{className:"header",children:[t,Object(x.jsx)("div",{className:"close",onClick:function(){history.go(c),parent.postMessage({active:!1},"*")},children:"\xd7"})]})}c(88);function f(e){var t=e.children;return Object(x.jsx)("div",{className:"body",children:t})}c(89);function g(e){var t=e.size;return Object(x.jsxs)("div",{className:"lds-ring ".concat(t),children:[Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{})]})}c(90);function N(e){var t=e.size;return Object(x.jsx)("svg",{width:"23",height:"39",viewBox:"0 0 23 39",style:{transform:"scale(".concat("small"===t?"1":"0.8",")"),fill:"#444"},children:Object(x.jsx)("path",{className:"slideshow-arrow",d:"M857.005,231.479L858.5,230l18.124,18-18.127,18-1.49-1.48L873.638,248Z",transform:"translate(-855 -230)"})})}function w(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),c=t[0],i=t[1],a=Object(n.useState)(!1),s=Object(l.a)(a,2),r=s[0],d=s[1],u=Object(o.f)();Object(n.useEffect)((function(){var e=0;return window.onbeforeunload=function(t){0==e&&(b(),e=1)},window.onpopstate=function(e){b()},function(){window.onbeforeunload=function(){},window.onpopstate=function(){}}}),[]);var b=function(){parent.postMessage({active:!1},"*")};return Object(n.useEffect)((function(){d(!0),fetch(j.replace("{id}",localStorage.getItem("kindId")||"")).then((function(e){return e.json()})).then((function(e){i(e),d(!1)}))}),[]),Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(p,{stackclose:-1,children:Object(x.jsxs)("div",{className:"logo",children:[Object(x.jsx)("a",{href:"https://imprima.app",target:"_blank",rel:"noreferrer",className:"logo-link",children:Object(x.jsx)("div",{className:"inner",children:Object(x.jsx)("img",{src:"/img/logo_100.png",alt:""})})}),Object(x.jsx)("h1",{children:"Comprar personalizado"})]})}),Object(x.jsx)(f,{children:r&&Object(x.jsx)("div",{className:"loader-container",children:Object(x.jsx)(g,{size:"large"})})||Object(x.jsx)("div",{className:"page-items",children:Object(x.jsx)("div",{className:"options",children:c.map((function(e){return Object(x.jsxs)("div",{className:"option",onClick:function(){return function(e){u.push("/alo/produto/".concat(e.id).concat(location.search))}(e)},children:[Object(x.jsxs)("div",{className:"left",children:[Object(x.jsx)("img",{src:e.thumb_url,alt:"",className:"image"}),Object(x.jsx)("span",{children:e.name})]}),Object(x.jsx)("span",{className:"select",children:Object(x.jsx)(N,{})})]},e.name)}))})})})]})}c(95);function y(){return Object(x.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16",children:Object(x.jsxs)("g",{fill:"none",fillRule:"evenodd",children:[Object(x.jsx)("path",{d:"M0 0H16V16H0z",transform:"matrix(1 0 0 -1 0 16)"}),Object(x.jsx)("path",{fill:"#444",fillRule:"nonzero",d:"M7.631 1.333L6.368 0 0 6.667 6.368 13.333 7.631 12.001 3.428 7.6 13.333 7.601 13.333 5.743 3.418 5.742z",transform:"matrix(1 0 0 -1 0 16) translate(1.333 1.333)"})]})})}function k(){var e=Object(o.g)().id,t=Object(n.useState)(!1),c=Object(l.a)(t,2),i=c[0],a=c[1],s=Object(n.useState)(!1),r=Object(l.a)(s,2),d=r[0],j=r[1],m=Object(n.useState)(null),v=Object(l.a)(m,2),w=v[0],k=v[1],S=Object(n.useState)(null),I=Object(l.a)(S,2),C=I[0],_=I[1],z=Object(n.useState)(null),F=Object(l.a)(z,2),R=F[0],q=F[1],B=Object(n.useState)({loading:!1,show:!1}),E=Object(l.a)(B,2),J=E[0],M=E[1],P=Object(n.useState)(!0),L=Object(l.a)(P,2),D=L[0],$=L[1],T=Object(n.useRef)(),V=Object(n.useState)(),W=Object(l.a)(V,2),H=W[0],U=W[1],K=Object(n.useState)(!1),Q=Object(l.a)(K,2),Z=Q[0],A=Q[1],G=Object(o.f)();function X(){j(!0);var t=T.current.value;fetch(b.replace("{id}",e).replace("{cep}",t)).then((function(e){return e.json()})).then((function(e){j(!1),k(e.merchants),localStorage.setItem("address",JSON.stringify(e.address))})).catch((function(e){return j(!1)}))}return Object(n.useEffect)((function(){a(!0),fetch(u.replace("{id}",e)).then((function(e){return e.json()})).then((function(e){a(!1),U(e);var t=JSON.parse(localStorage.getItem("address"));(null===t||void 0===t?void 0:t.zip)&&(T.current.value=t.zip,X())})).catch((function(e){return a(!1)}))}),[]),Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(p,{stackclose:-2,children:Object(x.jsxs)("div",{className:"title",children:[Object(x.jsx)("div",{onClick:function(){return G.goBack()},children:Object(x.jsx)(y,{})}),Object(x.jsx)("div",{children:null===H||void 0===H?void 0:H.name})]})}),Object(x.jsx)(f,{children:i&&Object(x.jsx)("div",{className:"loader-container",children:Object(x.jsx)(g,{size:"large"})})||Object(x.jsxs)("div",{className:"page-detail",children:[Object(x.jsxs)("div",{className:"item ".concat(!D&&"hidden"),children:[Object(x.jsx)("img",{src:null===H||void 0===H?void 0:H.url,alt:null===H||void 0===H?void 0:H.name}),Object(x.jsxs)("div",{className:"hcategory",children:[Object(x.jsxs)("div",{className:"switch-container",children:["trocar estampa",Object(x.jsxs)("label",{className:"switch",children:[Object(x.jsx)("input",{type:"checkbox",onChange:function(){J.show?M({loading:!1,show:!1}):(M({loading:!0,show:!0}),fetch(h,{mode:"cors"}).then((function(e){return e.json()})).then((function(e){M({loading:!1,show:!0}),_(e)})).catch((function(e){return M({loading:!1,show:!1})})))}}),Object(x.jsx)("span",{className:"slider round"})]})]}),Object(x.jsx)("div",{className:"category-container",children:J.show&&(J.loading&&Object(x.jsx)(g,{})||Object(x.jsxs)("select",{onChange:function(e){var t=e.target.value;A(!0),fetch(O.replace("{categoryId}",t).replace("{typeId}",H.type_id),{mode:"cors"}).then((function(e){return e.json()})).then((function(e){q(e),A(!1)})).catch((function(e){return A(!1)}))},children:[Object(x.jsx)("option",{children:"selecione"}),null===C||void 0===C?void 0:C.map((function(e){return Object(x.jsx)("option",{value:e.id,children:e.name},e.id)}))]}))})]}),Object(x.jsx)("div",{className:"image-list",children:J.show&&(Z&&Object(x.jsx)(g,{})||R&&R.map((function(e){return Object(x.jsx)("img",{src:e.thumb_url,onClick:function(){U(e)}},e.id)})))})]}),Object(x.jsxs)("div",{className:"stores",children:[Object(x.jsxs)("div",{className:"find",children:[Object(x.jsx)("button",{onClick:function(){return $(!D)},children:Object(x.jsx)("span",{className:"".concat(D?"bottom":"top"),children:Object(x.jsx)("svg",{focusable:"false",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:Object(x.jsx)("path",{d:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"})})})}),Object(x.jsx)("input",{ref:T,onKeyUp:function(e){"Enter"===e.key&&X()},placeholder:"Digite seu CEP",onFocus:function(){return window.innerWidth<600&&$(!1)}}),Object(x.jsx)("button",{onClick:function(){return X()},children:d&&Object(x.jsx)(g,{})||"\ud83d\udd0d"})]}),Object(x.jsx)("div",{className:"list",children:w&&((null===w||void 0===w?void 0:w.length)&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)("div",{className:"item",children:[Object(x.jsx)("div",{className:"i1 b",children:"Fornecedor"}),Object(x.jsx)("div",{className:"i2 b",children:"Pre\xe7o"}),Object(x.jsx)("div",{className:"i3 b",children:"Frete"}),Object(x.jsx)("span",{className:"i5",children:"\xa0"})]}),w.map((function(e){return Object(x.jsxs)("div",{className:"item",children:[Object(x.jsxs)("div",{className:"i1",children:[e.name,Object(x.jsx)("br",{}),Object(x.jsxs)("span",{className:"small",children:[e.city," - ",e.uf]})]}),Object(x.jsxs)("div",{className:"i2",children:[Object(x.jsx)("div",{className:"small",children:"a partir de"}),"R$",e.price]}),Object(x.jsx)("div",{className:"i3 ".concat("gr\xe1tis"===e.delivery?"green":"red"),children:e.delivery}),Object(x.jsx)("span",{className:"i5",onClick:function(){return function(e){G.push("/alo/checkout/".concat(H.id,"/").concat(e.id).concat(location.search))}(e)},children:Object(x.jsx)(N,{size:"small"})})]},e.id)}))]})||Object(x.jsx)("h3",{children:"Nenhum fornecedor na sua localidade."}))})]})]})})]})}function S(e){var t=function(e,t){return localStorage.setItem(e,JSON.stringify(t))},c=e?function(c){return t(e,c)}:function(e,c){return t(e,c)},n=function(e){return JSON.parse(localStorage.getItem(e))};return[e?n(e):function(e){return n(e)},c]}c(96);function I(){var e,t,c,i=Object(o.g)(),a=i.productId,s=i.merchantId,r=Object(o.f)(),d=S("checkout"),j=Object(l.a)(d,2),u=(j[0],j[1]),b=Object(n.useState)(!1),h=Object(l.a)(b,2),O=h[0],v=h[1],N=Object(n.useState)(),w=Object(l.a)(N,2),k=w[0],I=w[1],C=Object(n.useState)(),_=Object(l.a)(C,2),z=_[0],F=_[1],R=Object(n.useState)(),q=Object(l.a)(R,2),B=q[0],E=q[1],J=Object(n.useState)(),M=Object(l.a)(J,2),P=M[0],L=M[1],D=Object(n.useState)(),$=Object(l.a)(D,2),T=$[0],V=$[1],W=Object(n.useState)(),H=Object(l.a)(W,2),U=H[0],K=H[1],Q=Object(n.useState)(1),Z=Object(l.a)(Q,2),A=Z[0],G=Z[1],X=Object(n.useState)(0),Y=Object(l.a)(X,2),ee=Y[0],te=Y[1],ce=Object(n.useState)(),ne=Object(l.a)(ce,2),ie=ne[0],ae=ne[1];function se(e,t){te(t),ae(e*t)}return Object(n.useEffect)((function(){v(!0),fetch(m.replace("{productId}",a).replace("{merchantId}",s)).then((function(e){return e.json()})).then((function(e){var t;I(e.product),L(e.attributes);var c=e.attributes.filter((function(e){return!e.price}));c=(null===(t=c)||void 0===t?void 0:t.length)?c:e.attributes,E(c),F(e.merchant),v(!1)})).catch((function(e){return v(!1)}))}),[]),Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(p,{stackclose:-3,children:Object(x.jsxs)("div",{className:"title",children:[Object(x.jsx)("div",{onClick:function(){return r.goBack()},children:Object(x.jsx)(y,{})}),Object(x.jsx)("div",{children:null===z||void 0===z?void 0:z.name})]})}),Object(x.jsx)(f,{children:O&&Object(x.jsx)("div",{className:"loader-container",children:Object(x.jsx)(g,{size:"large"})})||Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)("div",{className:"page-checkout",children:[Object(x.jsx)("h5",{children:null===k||void 0===k?void 0:k.name}),Object(x.jsxs)("div",{className:"first",children:[Object(x.jsx)("div",{className:"left-container",children:Object(x.jsx)("img",{src:null===k||void 0===k?void 0:k.url,alt:null===k||void 0===k?void 0:k.name})}),Object(x.jsxs)("div",{className:"right-container",children:[Object(x.jsxs)("div",{className:"attributes-container",children:[B&&B[0].name,Object(x.jsx)("div",{className:"options",children:null===B||void 0===B?void 0:B.map((function(e,t){return Object(x.jsx)("div",{className:"button-check ".concat(T===e.id&&"selected"),onClick:function(){V(e.id),e.price?K(e):K(null),se(A,e.price)},children:e.value},t)}))})]}),T&&(null===P||void 0===P||null===(e=P.find((function(e){return e.merchant_type_attribute_id===T})))||void 0===e?void 0:e.name)&&Object(x.jsxs)("div",{className:"attributes-container",children:[null===P||void 0===P||null===(t=P.find((function(e){return e.merchant_type_attribute_id===T})))||void 0===t?void 0:t.name,Object(x.jsx)("div",{className:"options",children:null===(c=P.filter((function(e){return e.merchant_type_attribute_id===T})))||void 0===c?void 0:c.map((function(e,t){return Object(x.jsx)("div",{className:"button-check ".concat((null===U||void 0===U?void 0:U.id)===e.id&&"selected"),onClick:function(){se(A,e.price),K(e)},children:e.value},t)}))})]}),Object(x.jsxs)("div",{className:"quantity-container",children:[Object(x.jsx)("span",{children:"Quantidade"}),Object(x.jsx)("input",{type:"number",value:A,onChange:function(e){se(e.target.value,ee),G(e.target.value)}})]}),Object(x.jsxs)("div",{className:"price-container",children:[Object(x.jsx)("span",{children:"Pre\xe7o final"}),Object(x.jsx)("div",{children:ie&&"R$".concat(ie)||"selecione"})]})]})]}),Object(x.jsx)("div",{className:"next",children:Object(x.jsx)("button",{onClick:function(){ee?(u({attribute:U,product:k,merchant:z,quantity:A}),r.push("/alo/checkout-info".concat(location.search))):alert("escolha o tamanho e a quantidade")},children:"Continuar"})})]})})})]})}var C=c(48),_=c.n(C),z=c(74),F=c(10),R=(c(98),c(20)),q=R.a().shape({name:R.b().required("Campo obrigat\xf3rio"),address:R.b().required("Campo obrigat\xf3rio"),cellphone:R.b().required("Campo obrigat\xf3rio"),note:R.b()});function B(){var e=S("checkout"),t=Object(l.a)(e,2),c=t[0],i=(t[1],Object(o.f)()),a=Object(n.useState)(),s=Object(l.a)(a,2),r=s[0],d=s[1],j=c.attribute,u=c.merchant,b=c.product,h=c.quantity;function O(e){var t=e.name,c=e.cellphone,n=e.address,i=e.note;d(!0),fetch(v,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({order:{merchant_id:null===u||void 0===u?void 0:u.id,name:t,cellphone:c,address:n,note:i,origin:localStorage.getItem("origin")},orderItem:{product_id:null===b||void 0===b?void 0:b.id,merchant_type_attribute_id:null===j||void 0===j?void 0:j.id,name:m(),description:N(),quantity:h}})}).then((function(e){return e.json()})).then((function(e){console.log(e),e.init_point&&(parent.location.href=e.init_point),d(!1)})).catch((function(e){alert("erro"),d(!1)}))}function m(){return"".concat(h,"x ").concat(null===b||void 0===b?void 0:b.name)}function N(){return"".concat(null===j||void 0===j?void 0:j.type," ").concat(null===j||void 0===j?void 0:j.value," - R$").concat(h*(null===j||void 0===j?void 0:j.price))}return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(p,{stackclose:-4,children:Object(x.jsxs)("div",{className:"title",children:[Object(x.jsx)("div",{onClick:function(){return i.goBack()},children:Object(x.jsx)(y,{})}),Object(x.jsx)("div",{children:"Resumo do pedido"})]})}),Object(x.jsx)(f,{children:Object(x.jsxs)("div",{className:"page-checkout-info",children:[Object(x.jsxs)("div",{className:"product-details",children:[m(),Object(x.jsx)("br",{}),N()]}),Object(x.jsx)("h5",{children:"Vendedor:"}),Object(x.jsxs)("div",{className:"seller",children:[null===u||void 0===u?void 0:u.name," - ",null===u||void 0===u?void 0:u.phone,Object(x.jsx)("br",{}),null===u||void 0===u?void 0:u.address,", ",null===u||void 0===u?void 0:u.address_extra," -"," ",null===u||void 0===u?void 0:u.neighborhood,", ",null===u||void 0===u?void 0:u.city,", ",null===u||void 0===u?void 0:u.uf]}),Object(x.jsx)(F.d,{initialValues:{name:"",address:"",city:"",cellphone:""},onSubmit:function(){var e=Object(z.a)(_.a.mark((function e(t){return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){return setTimeout(e,500)}));case 2:O(t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),validationSchema:q,children:Object(x.jsxs)(F.c,{className:"buyer",children:[Object(x.jsx)("div",{children:"Complete seus dados"}),Object(x.jsx)(F.b,{name:"name",placeholder:"Nome completo",type:"text"}),Object(x.jsx)(F.a,{component:"span",name:"name"}),Object(x.jsx)(F.b,{name:"address",placeholder:"Rua, bairro, n\xfamero, complemento, cidade",type:"text"}),Object(x.jsx)(F.a,{component:"span",name:"address"}),Object(x.jsx)(F.b,{name:"cellphone",placeholder:"Celular com DDD",type:"text"}),Object(x.jsx)(F.a,{component:"span",name:"cellphone"}),Object(x.jsx)(F.b,{name:"note",placeholder:"Observa\xe7\xe3o, exemplo: fazer a estampa menor, etc",type:"text"}),Object(x.jsx)(F.a,{component:"span",name:"note"}),r&&Object(x.jsx)(g,{})||Object(x.jsx)("button",{type:"submit",children:"Pagar"})]})})]})})]})}var E=function(){return Object(x.jsx)(r.a,{children:Object(x.jsxs)(o.c,{children:[Object(x.jsx)(o.a,{path:"/alo/",exact:!0,children:Object(x.jsx)(w,{})}),Object(x.jsx)(o.a,{path:"/alo/produto/:id",children:Object(x.jsx)(k,{})}),Object(x.jsx)(o.a,{path:"/alo/checkout/:productId/:merchantId",children:Object(x.jsx)(I,{})}),Object(x.jsx)(o.a,{path:"/alo/checkout-info",children:Object(x.jsx)(B,{})})]})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var J=new URLSearchParams(window.location.search);localStorage.setItem("kindId",J.get("kindId")||"2"),localStorage.setItem("imprimaId",J.get("imprimaId")||""),localStorage.setItem("origin",J.get("origin")||""),s.a.render(Object(x.jsx)(i.a.StrictMode,{children:Object(x.jsx)(E,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},85:function(e,t,c){},86:function(e,t,c){},88:function(e,t,c){},89:function(e,t,c){},90:function(e,t,c){},95:function(e,t,c){},96:function(e,t,c){},98:function(e,t,c){}},[[197,1,2]]]);
//# sourceMappingURL=main.9d6aba7e.chunk.js.map