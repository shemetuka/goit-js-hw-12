import{a as b,S as w,i as n}from"./assets/vendor-cf86d4d0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const y=s=>s.map(({webformatURL:t,largeImageURL:o,tags:i,likes:e,views:r,comments:c,downloads:L})=>`
  <li class="gallery-item">
  <a class="gallery-link" href="${o}">
    <img
      class="gallery-image"
      src="${t}"
      alt="${i}"
    />
  </a>
    <div class="small-content">
        <small class="text-body-likes"><span class="text-body">Likes:</span> <span class="quantity">${e}</span></small>
        <small class="text-body-views"><span class="text-body">Views:</span> <span class="quantity">${r}</span></small>
        <small class="text-body-comments"><span class="text-body">Comments:</span> <span class="quantity">${c}</span></small>
        <small class="text-body-downloads"><span class="text-body">Dowloads:</span> <span class="quantity">${L}</span></small>
    </div>
 
    </li>
`).join(""),v="https://pixabay.com/api/",E="43896740-362a21d10e9d41ec216c05f15",g=async(s,t=1,o=15)=>{const i=new URLSearchParams({key:E,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:o});try{return(await b.get(`${v}?${i}`)).data}catch(e){throw console.log(e),e}},m=document.querySelector(".js-gallery"),P=document.querySelector(".js-search-form"),a=document.querySelector(".js-load-more"),p=document.querySelector(".js-loader");let l=1,u="";const h=15;let f=new w(".js-gallery a"),d=0;async function x(s){if(s.preventDefault(),u=s.target.elements.searchKeyword.value.trim(),u===""){m.innerHTML="",s.target.reset(),n.error({title:"Error",message:"Illegal operation",position:"topRight",timeout:2e3});return}l=1,d=0,m.innerHTML="",a.classList.add("is-hidden"),p.classList.remove("is-hidden");try{const t=await g(u,l,h);d=t.totalHits,d===0?n.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:2e3,color:"red"}):(m.innerHTML=y(t.hits),f.refresh(),t.hits.length<h||d<=l*h?(n.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3,color:"red"}),a.classList.add("is-hidden")):a.classList.remove("is-hidden"))}catch(t){console.log(t),n.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight",timeout:2e3})}finally{s.target.reset(),p.classList.add("is-hidden")}}async function S(){l+=1,p.classList.remove("is-hidden"),a.classList.add("is-hidden");try{const s=await g(u,l,h),t=y(s.hits);m.insertAdjacentHTML("beforeend",t),f.refresh(),a.classList.remove("is-hidden"),(s.hits.length===0||d<=l*h)&&(n.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3,color:"red"}),a.classList.add("is-hidden"));const{height:o}=m.firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}catch(s){console.error(s),n.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight",timeout:2e3})}finally{p.classList.add("is-hidden")}}P.addEventListener("submit",x);a.addEventListener("click",S);
//# sourceMappingURL=commonHelpers.js.map
