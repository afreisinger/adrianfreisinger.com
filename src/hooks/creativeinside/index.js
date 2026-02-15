////////////////// js-scroll events

///////// scroll animation

const header = document.querySelector('header');
const logoText = document.querySelector('.resize-logo');
const main = document.querySelector('#main');

const scrollElements = document.querySelectorAll('.js-scroll');

let throttleTimer;
let isNavSticky = false;
let isNavOn = false;

const throttle = (callback, time) => {
  if (throttleTimer) {return;}

  throttleTimer = true;
  callback();

  setTimeout(() => {
    throttleTimer = false;
  }, time);
};

const elementInView = (el, scrollPercent = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  scrollPercent = parseInt(el.dataset.scroll) || 100;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) * (scrollPercent / 100)
  );
};

const displayScrollElement = element => {
  element.classList.add('scrolled');
};

const handleScrollAnimation = () => {
  scrollElements.forEach(el => {
    if (elementInView(el, 70)) {
      displayScrollElement(el);
    }
  });
};

const handleStickyNavBar = () => {
  // on open navbar stop scroll animation
  if (isNavOn && !isNavSticky) {return;} else if ((isNavOn && isNavSticky) || (main.getBoundingClientRect().y > 30 && isNavSticky)) {
    header.classList.remove('sticky');
    logoText.classList.remove('resize');
    isNavSticky = false;
  } else if (main.getBoundingClientRect().y < 30 && !isNavSticky) {
    header.classList.add('sticky');
    logoText.classList.add('resize');
    isNavSticky = true;
  }
};

window.addEventListener('scroll', () => {
  throttle(() => {
    handleStickyNavBar();
    handleScrollAnimation();
  }, 100);
});

///////////////// logo events

/* 
1. on scroll see if timer is true then return else call below 
check function and also after fixed time make timer false
2. for each animated element check if it is in view 
2. if yes then add animation class to that element 
2. else continue

*/

/////////////// navigation event

const navButton = document.querySelector('.navigation input');

navButton.addEventListener('click', () => {
  isNavOn = !isNavOn;

  // when nav is sticky remove it
  handleStickyNavBar();

  document.querySelector('.logo-text').classList.toggle('text-white');
  document.querySelector('.nav__link-box').classList.toggle('d-flex');
  document.querySelectorAll('.nav__link-box .link').forEach(el => {
    el.classList.toggle('link-light');
  });
});
