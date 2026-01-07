document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  const items = track.children;
  
  let index = 0;
  let isAnimating = false;
  const animationDuration = 500;
  
  // Calcular el ancho de cada item incluyendo el gap
  const itemWidth = items[0].offsetWidth;
  const gap = parseInt(window.getComputedStyle(track).gap) || 0;
  const step = itemWidth + gap;
  
  function update() {
    if (isAnimating) return;
    
    isAnimating = true;
    track.style.transition = `transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    track.style.transform = `translateX(-${index * step}px)`;
    
    // Actualizar estado de botones
    prev.style.opacity = index === 0 ? '0.5' : '1';
    prev.style.cursor = index === 0 ? 'default' : 'pointer';
    next.style.opacity = index >= items.length - 1 ? '0.5' : '1';
    next.style.cursor = index >= items.length - 1 ? 'default' : 'pointer';
    
    // Resetear animación
    setTimeout(() => {
      isAnimating = false;
    }, animationDuration);
  }
  
  // Event listeners
  next.addEventListener('click', () => {
    if (index < items.length - 1 && !isAnimating) {
      index++;
      update();
    }
  });
  
  prev.addEventListener('click', () => {
    if (index > 0 && !isAnimating) {
      index--;
      update();
    }
  });
  
  // Touch support para móviles
  let startX = 0;
  let endX = 0;
  
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && index < items.length - 1) {
        // Swipe izquierda
        index++;
      } else if (diff < 0 && index > 0) {
        // Swipe derecha
        index--;
      }
      update();
    }
  }
  
  // Redimensionar ventana
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Recalcular step después del resize
      const newItemWidth = items[0].offsetWidth;
      const newGap = parseInt(window.getComputedStyle(track).gap) || 0;
      step = newItemWidth + newGap;
      update();
    }, 250);
  });
  
  // Inicializar
  update();
  
  // Auto-play opcional (descomentar si quieres)
  /*
  setInterval(() => {
    if (index < items.length - 1) {
      index++;
    } else {
      index = 0;
    }
    update();
  }, 5000);
  */
});