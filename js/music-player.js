// js/music-player.js
document.addEventListener('DOMContentLoaded', function() {
  // Control del carousel de música
  const musicCarousel = document.querySelector('.music-carousel');
  if (!musicCarousel) return;
  
  const track = musicCarousel.querySelector('.carousel-track');
  const prevBtn = musicCarousel.querySelector('.prev');
  const nextBtn = musicCarousel.querySelector('.next');
  const cards = track.querySelectorAll('.music-card');
  
  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 32; // width + gap
  const maxIndex = cards.length - 1;
  
  // Actualizar posición
  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    // Actualizar estado de botones
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
    
    // Actualizar indicadores
    updateIndicators();
  }
  
  // Navegación
  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });
  
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
  
  // Touch/swipe para móviles
  let startX = 0;
  let isDragging = false;
  
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });
  
  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });
  
  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < maxIndex) {
        currentIndex++;
      } else if (diff < 0 && currentIndex > 0) {
        currentIndex--;
      }
      updateCarousel();
    }
    
    isDragging = false;
  });
  
  // Control de audio
  const audioPlayers = document.querySelectorAll('.music-card audio');
  const musicCards = document.querySelectorAll('.music-card');
  
  audioPlayers.forEach((audio, index) => {
    const card = musicCards[index];
    
    audio.addEventListener('play', () => {
      // Pausar otros audios
      audioPlayers.forEach((otherAudio, otherIndex) => {
        if (otherIndex !== index) {
          otherAudio.pause();
          musicCards[otherIndex].classList.remove('playing');
        }
      });
      
      // Marcar card como playing
      card.classList.add('playing');
    });
    
    audio.addEventListener('pause', () => {
      card.classList.remove('playing');
    });
    
    audio.addEventListener('ended', () => {
      card.classList.remove('playing');
    });
  });
  
  // Indicadores del carousel
  function createIndicators() {
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carousel-indicators';
    
    cards.forEach((_, index) => {
      const indicator = document.createElement('button');
      indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
      indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
      
      indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
      
      indicatorsContainer.appendChild(indicator);
    });
    
    musicCarousel.appendChild(indicatorsContainer);
  }
  
  function updateIndicators() {
    const indicators = musicCarousel.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Inicializar
  createIndicators();
  updateCarousel();
  
  // Auto-play opcional (descomentar si quieres)
  /*
  setInterval(() => {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }, 5000);
  */
});