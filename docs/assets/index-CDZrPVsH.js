(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();let d=1;const u=50,h=5e3;let a=!1;document.querySelector("#app").innerHTML=`
  <div class="select-wrapper">
    <label class="select-wrapper__label">Users</label>
    <button id="selectButton" class="select-button">
      <span>LastName FirstName, jobTitle</span>
      <img src="src/downarrow.svg" alt="Icon" class="arrow" />
    </button>
    <ul id="dropdown" class="select-dropdown hidden">
    </ul>
  </div>
`;const p=document.getElementById("selectButton"),o=document.getElementById("dropdown"),g=p.querySelector("span");let c=null;const y=async()=>{o.classList.toggle("hidden"),!c&&o.childElementCount===0&&await f()},w=e=>{c&&c.classList.remove("selected"),e.classList.add("selected"),c=e;const t=e.querySelector("span");t&&(g.textContent=t.textContent,o.classList.add("hidden"))},b=async(e,t)=>(await(await fetch(`https://frontend-test-middle.vercel.app/api/users?page=${e}&limit=${t}`)).json()).data,v=e=>{if(e.forEach(t=>{const r=document.createElement("li");r.className="dropdown-item",r.innerHTML=`
      <div class="circle">${t.last_name.charAt(0)}</div>
      <span>${t.last_name} ${t.first_name}, ${t.job||"No job title"}</span>
    `,r.addEventListener("click",()=>w(r)),o.appendChild(r)}),e.length>0){const t=o.lastElementChild;t&&m.observe(t)}},f=async()=>{if(!a){a=!0;try{const e=await b(d,u);v(e),d++}catch(e){console.error("Ошибка при получении данных:",e)}finally{a=!1}}},m=new IntersectionObserver(e=>{e[0].isIntersecting&&d*u<h&&(m.unobserve(e[0].target),f())},{root:o,threshold:1});p.addEventListener("click",y);
