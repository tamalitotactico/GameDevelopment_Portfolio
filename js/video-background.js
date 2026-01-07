// scripts/video-background.js
document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.video-background video');
  const heroSection = document.getElementById('hero');
  
  if (video) {
    // Prevenir autoplay en móviles para ahorrar datos
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      video.removeAttribute('autoplay');
      video.pause();
    }
    
    // Reproducir video cuando esté en viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(e => console.log('Autoplay bloqueado:', e));
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(heroSection);
    
    // Añadir botón de control opcional
    const videoControl = document.createElement('button');
    videoControl.className = 'video-control';
    videoControl.innerHTML = '🔇';
    videoControl.title = 'Toggle video sound';
    videoControl.style.cssText = `
      position: absolute;
      bottom: 20px;
      right: 20px;
      background: rgba(0,0,0,0.5);
      border: none;
      color: white;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 100;
    `;
    
    heroSection.appendChild(videoControl);
    
    videoControl.addEventListener('click', () => {
      video.muted = !video.muted;
      videoControl.innerHTML = video.muted ? '🔇' : '🔊';
    });
  }
});