const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.querySelector("body");let a=null;t.disabled=!0;const l=()=>{d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`};e.addEventListener("click",(e=>{e.target.disabled=!0,t.disabled=!1,a=setInterval(l,1e3)})),t.addEventListener("click",(()=>{e.disabled=!1,t.disabled=!0,clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.8bbd2858.js.map