var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequire7bc7;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequire7bc7=n);var r=n("iQIUW");const i=document.querySelector("form"),u=document.querySelector('input[name="delay"]'),l=document.querySelector('input[name="step"]'),a=document.querySelector('input[name="amount"]');document.querySelector("button");function d(e,t){return new Promise(((o,n)=>{setTimeout((()=>{Math.random()>.3?o({position:e,delay:t}):n({position:e,delay:t})}),t)}))}i.addEventListener("submit",(e=>{e.preventDefault();const t=Number(a.value);let o=Number(u.value);const n=Number(l.value);i.reset();for(let e=0;e<t;e++)d(e+1,o).then((({position:e,delay:t})=>r.Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`))).catch((({position:e,delay:t})=>r.Notify.failure(`❌ Rejected promise ${e} in ${t}ms`))),o+=n}));
//# sourceMappingURL=03-promises.6d68cdae.js.map
