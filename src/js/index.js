import '../scss/style.scss';
import '../img/1.jpg';

const $ = require('jquery');

const {
  identifiers,
  selectors
} = require('./handles.js');

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

const openBurger = document.getElementById(identifiers.openBurgerId);
const closeBurger = document.getElementById(identifiers.closeBurgerId);
const navList = document.getElementById(identifiers.navListId);
const skillButton = document.getElementById(identifiers.skillButtonId);
const copyButton = document.getElementById(identifiers.copyButtonId);
const copyInfo = document.getElementById(identifiers.copyInfoId);

const partsOfPage = document.querySelectorAll(selectors.partsOfPageSelector);
const technologies = document.querySelectorAll(selectors.technologiesSelector);
const listOfPageParts = document.querySelectorAll(selectors.listOfPagePartsSelector);

let currentPartOfPage = 0;

function checkScrollPosition() {
  const scrollPosition = window.pageYOffset;
  technologies.forEach(technology => {
    if (scrollPosition + window.innerHeight > $(technology).offset().top) {
      technology.classList.add('my-technologies__technology--scrolled')
    }
  })
  partsOfPage.forEach((partOfPage, i) => {
    if (scrollPosition > $(partOfPage).offset().top - 50) {
      listOfPageParts[currentPartOfPage].classList.remove('nav__list-item--actual');
      currentPartOfPage = i;
      listOfPageParts[currentPartOfPage].classList.add('nav__list-item--actual');
    }
  })
}
openBurger.addEventListener('click', () => {
  navList.classList.add('nav__list--open');
  openBurger.classList.remove('nav__open-menu--active');
  closeBurger.classList.add('nav__close-menu--active');
})

closeBurger.addEventListener('click', () => {
  navList.classList.remove('nav__list--open');
  openBurger.classList.add('nav__open-menu--active');
  closeBurger.classList.remove('nav__close-menu--active');
})

skillButton.addEventListener('click', () => {
  $('body, html').animate({
    scrollTop: $(partsOfPage[1]).offset().top
  }, 1000)
})

window.addEventListener('scroll', checkScrollPosition)

listOfPageParts.forEach((item, i) => {
  item.addEventListener('click', () => {
    $('body, html').animate({
      scrollTop: $(partsOfPage[i]).offset().top
    }, 1000)
  })
})

copyButton.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const myEmail = 'creend42@gmail.com';
  textarea.value = myEmail;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  copyInfo.classList.add('footer__copy-info--visible');
  setTimeout(() => {
    copyInfo.classList.remove('footer__copy-info--visible');
  }, 2000)
})
checkScrollPosition()