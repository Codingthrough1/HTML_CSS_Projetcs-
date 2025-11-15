<script>
(function(){
  const gallery = Array.from(document.querySelectorAll('.thumb'));
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lb-image');
  const lbCaption = document.getElementById('lb-caption');
  const btnClose = document.getElementById('lb-close');
  const btnPrev = document.getElementById('lb-prev');
  const btnNext = document.getElementById('lb-next');

  let currentIndex = -1;

  function openLightbox(idx){
    const el = gallery[idx];
    if(!el) return;
    const src = el.dataset.full || el.src;
    lbImage.src = src;
    lbImage.alt = el.alt || '';
    lbCaption.textContent = el.alt || '';
    currentIndex = idx;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function closeLightbox(){
    lightbox.setAttribute('aria-hidden', 'true');
    lbImage.src = '';
    document.body.style.overflow = '';
    currentIndex = -1;
  }

  function showNext(){
    if(currentIndex < 0) return;
    const next = (currentIndex + 1) % gallery.length;
    openLightbox(next);
  }
  function showPrev(){
    if(currentIndex < 0) return;
    const prev = (currentIndex - 1 + gallery.length) % gallery.length;
    openLightbox(prev);
  }

  gallery.forEach((img, i) => {
    img.tabIndex = 0;
    img.addEventListener('click', () => openLightbox(i));
    img.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' ') openLightbox(i);
    });
  });

  btnClose.addEventListener('click', closeLightbox);
  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);

  // keyboard actions
  document.addEventListener('keydown', (e) => {
    if(lightbox.getAttribute('aria-hidden') === 'false'){
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowRight') showNext();
      if(e.key === 'ArrowLeft') showPrev();
    }
  });

  // click outside image closes
  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
  });
})();
</script>
