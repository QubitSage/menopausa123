// Utilities and tracking
(function(){
  const toTop = document.getElementById('toTop');
  const floatBuy = document.getElementById('float-buy');
  const hero = document.querySelector('.hero');
  function showControls(){
    const scrolled = window.scrollY > ((hero?.offsetHeight||300) * 0.6);
    toTop && toTop.classList.toggle('show', scrolled);
    if(floatBuy) floatBuy.style.display = scrolled ? 'inline-flex' : 'none';
  }
  window.addEventListener('scroll', showControls, {passive:true});
  window.addEventListener('load', showControls);
  toTop && toTop.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));

  // Smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id=a.getAttribute('href').slice(1);
      const el=document.getElementById(id);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  // ViewContent when #comprar enters viewport
  const target = document.querySelector('#comprar');
  if(target && 'IntersectionObserver' in window && typeof fbq === 'function'){
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ fbq('track','ViewContent',{content_name:'Emagreça 360 - Secao Compra'}); obs.disconnect(); }});
    }, {threshold:0.4});
    obs.observe(target);
  }

  // InitiateCheckout on click
  const btns=[document.getElementById('btn-checkout'), document.getElementById('float-buy')].filter(Boolean);
  btns.forEach(btn=>btn.addEventListener('click',()=>{ try{ fbq('track','InitiateCheckout',{value:29.90,currency:'BRL'});}catch(e){} }));
})();
