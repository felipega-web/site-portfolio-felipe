const track = document.querySelector('#projetos .track');
const slides = Array.from(track.children).filter(slide => !slide.classList.contains('clone'));
const prevBtn = document.querySelector('#projetos .prev');
const nextBtn = document.querySelector('#projetos .next');

let slideWidth = slides[0].getBoundingClientRect().width;

// Clona primeiro e último
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.classList.add('clone');
lastClone.classList.add('clone');

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

let index = 1;
track.style.transform = `translateX(${-slideWidth * index}px)`;


function moveToSlide() {
  track.style.transition = 'transform 0.4s ease';
  track.style.transform = `translateX(${-slideWidth * index}px)`;
}

nextBtn.addEventListener('click', () => {
  index++;
  moveToSlide();
});

prevBtn.addEventListener('click', () => {
  index--;
  moveToSlide();
});

track.addEventListener('transitionend', () => {
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

window.addEventListener('resize', () => {
  slideWidth = slides[0].offsetWidth;
  track.style.transition = 'none';
  track.style.transform = `translateX(${-slideWidth * index}px)`;
});