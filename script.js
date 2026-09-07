document.querySelector('#year').textContent = new Date().getFullYear();

// Bir sonraki fotoğraf yüklenmeden görünür arka planı değiştirme.
const scenes = [
  'assets/istanbul-blue.png',
  'assets/alps.png',
  'assets/kyoto.png',
  'assets/iceland.png',
  'assets/new-york.png',
  'assets/night-study.png'
];
const layers = [...document.querySelectorAll('.hero-scene')];
const dots = [...document.querySelectorAll('.scene-dot')];
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const interval = 8000;
let currentScene = 0;
let activeLayer = 0;
let timer;
let generation = 0;
const loadedImages = new Map();

function preload(source) {
  if (!loadedImages.has(source)) {
    loadedImages.set(source, new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(true);
      image.onerror = () => { loadedImages.delete(source); resolve(false); };
      image.src = source;
    }));
  }
  return loadedImages.get(source);
}

function schedule() {
  clearTimeout(timer);
  if (document.hidden || motionPreference.matches) return;
  const token = generation;
  timer = setTimeout(() => advance(token), interval);
}

async function advance(token) {
  // Bir görsel yüklenemezse sıradakini dene; mevcut fotoğraf ekranda kalır.
  for (let offset = 1; offset < scenes.length; offset++) {
    const nextScene = (currentScene + offset) % scenes.length;
    const ready = await preload(scenes[nextScene]);
    if (token !== generation || document.hidden || motionPreference.matches) return;
    if (!ready) continue;
    showScene(nextScene);
    break;
  }
  schedule();
}

function showScene(nextScene) {
  if (nextScene === currentScene) return;
    const nextLayer = 1 - activeLayer;
    layers[nextLayer].style.backgroundImage = `url("${scenes[nextScene]}")`;
    layers[nextLayer].style.backgroundPosition = scenes[nextScene].includes('night-study') ? 'center 62%' : 'center';
    layers[nextLayer].classList.add('is-active');
    layers[activeLayer].classList.remove('is-active');
    activeLayer = nextLayer;
    currentScene = nextScene;
    preload(scenes[(currentScene + 1) % scenes.length]);
  dots.forEach((dot, index) => dot.setAttribute('aria-pressed', String(index === currentScene)));
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', async () => {
    const token = ++generation;
    clearTimeout(timer);
    const ready = await preload(scenes[index]);
    if (token !== generation) return;
    if (ready) showScene(index);
    schedule();
  });
});

function refreshPlayback() {
  generation++;
  schedule();
}
document.addEventListener('visibilitychange', refreshPlayback);
motionPreference.addEventListener('change', refreshPlayback);
preload(scenes[1]);
schedule();
