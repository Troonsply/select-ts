(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const g="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20129%20129'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20enable-background='new%200%200%20129%20129'%3e%3cg%3e%3cpath%20d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2%200,5.8l53.9,53.9c0.8,0.8%201.8,1.2%202.9,1.2%201,0%202.1-0.4%202.9-1.2l53.9-53.9c1.7-1.6%201.7-4.2%200.1-5.8z'/%3e%3c/g%3e%3c/svg%3e";let d=1;const p=50,w=5e3;let a=!1;document.querySelector("#app").innerHTML=`
  <div class="select-wrapper">
    <label class="select-wrapper__label">Users</label>
    <button id="selectButton" class="select-button">
      <span>LastName FirstName, jobTitle</span>
      <img src="${g}" alt="Icon" class="arrow" />
    </button>
    <ul id="dropdown" class="select-dropdown hidden">
    </ul>
  </div>
`;const u=document.getElementById("selectButton"),r=document.getElementById("dropdown"),h=u.querySelector("span");let c=null;const v=async()=>{r.classList.toggle("hidden"),!c&&r.childElementCount===0&&await f()},y=e=>{c&&c.classList.remove("selected"),e.classList.add("selected"),c=e;const t=e.querySelector("span");t&&(h.textContent=t.textContent,r.classList.add("hidden"))},b=async(e,t)=>(await(await fetch(`https://frontend-test-middle.vercel.app/api/users?page=${e}&limit=${t}`)).json()).data,L=e=>{if(e.forEach(t=>{const o=document.createElement("li");o.className="dropdown-item",o.innerHTML=`
      <div class="circle">${t.last_name.charAt(0)}</div>
      <span>${t.last_name} ${t.first_name}, ${t.job||"No job title"}</span>
    `,o.addEventListener("click",()=>y(o)),r.appendChild(o)}),e.length>0){const t=r.lastElementChild;t&&m.observe(t)}},f=async()=>{if(!a){a=!0;try{const e=await b(d,p);L(e),d++}catch(e){console.error("Ошибка при получении данных:",e)}finally{a=!1}}},m=new IntersectionObserver(e=>{e[0].isIntersecting&&d*p<w&&(m.unobserve(e[0].target),f())},{root:r,threshold:1});u.addEventListener("click",v);
