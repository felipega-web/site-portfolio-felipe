const track = document.querySelector('#projetos .track');
const prevBtn = document.querySelector('#projetos .prev');
const nextBtn = document.querySelector('#projetos .next');

let slides = Array.from(track.children);
let slideWidth;
let index = 1;
let isMobile = window.innerWidth <= 767;

function setupCarousel() {
  // Resetar track
  track.style.transition = 'none';
  track.style.transform = 'none';
  index = 1;

  if (window.innerWidth > 767) {
    isMobile = false;

    // Remover clones anteriores (se existirem)
    track.querySelectorAll('.clone').forEach((clone) => clone.remove());

    slides = Array.from(track.children);

    slideWidth = slides[0].offsetWidth;

    // Criar clones
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    firstClone.classList.add('clone');
    lastClone.classList.add('clone');

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    index = 1;
    track.style.transform = `translateX(${-slideWidth * index}px)`;

    // Mostrar botões
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
  } else {
    isMobile = true;

    // No mobile → apenas lista vertical
    track.querySelectorAll('.clone').forEach((clone) => clone.remove());

    track.style.transform = 'none';
    track.style.transition = 'none';

    // Esconder botões
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
}

function moveToSlide() {
  track.style.transition = 'transform 0.4s ease';
  track.style.transform = `translateX(${-slideWidth * index}px)`;
}

// Navegação desktop
nextBtn.addEventListener('click', () => {
  if (isMobile) return;
  index++;
  moveToSlide();
});

prevBtn.addEventListener('click', () => {
  if (isMobile) return;
  index--;
  moveToSlide();
});

// Resetar ao fim da transição (desktop)
track.addEventListener('transitionend', () => {
  if (isMobile) return;

  if (track.children[index].classList.contains('clone')) {
    track.style.transition = 'none';
    if (index === 0) {
      index = slides.length;
    } else if (index === track.children.length - 1) {
      index = 1;
    }
    track.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

// Recalcular ao redimensionar
window.addEventListener('resize', () => {
  setupCarousel();
  if (!isMobile) {
    slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

// Inicialização
setupCarousel();
