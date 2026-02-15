import lottieWeb from 'https://cdn.skypack.dev/lottie-web';

const isometricContainer = document.querySelector('.potential__isometric');

lottieWeb.loadAnimation({
  container: isometricContainer,
  path: 'assets/net-circle.json',
  renderer: 'svg',
  loop: true,
  autoplay: true,
  name: 'Demo Animation',
});

const loader = document.querySelector('.loader');

lottieWeb.loadAnimation({
  container: loader,
  path: 'assets/load.json',
  renderer: 'svg',
  loop: true,
  autoplay: true,
  name: 'load Animation',
});

window.addEventListener('load', () => {
  loader.className += ' hidden';
});
