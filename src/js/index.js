import $ from 'jquery';
import { identifiers, selectors } from './handles';
import '../scss/style.scss';
import '../img/1.jpg';

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

const burger = document.getElementById(identifiers.burgerId);
const navList = document.getElementById(identifiers.navListId);
const skillButton = document.getElementById(identifiers.skillButtonId);
const copyButton = document.getElementById(identifiers.copyButtonId);
const copyInfo = document.getElementById(identifiers.copyInfoId);

const burgerBars = document.querySelectorAll(selectors.burgerBars)
const partsOfPage = document.querySelectorAll(selectors.partsOfPageSelector);
const technologies = document.querySelectorAll(selectors.technologiesSelector);
const listOfPageParts = document.querySelectorAll(selectors.listOfPagePartsSelector);

let currentPartOfPage = 0;

const checkScrollPosition = () => {
  const scrollPosition = window.pageYOffset;
  technologies.forEach((technology) => {
    if (scrollPosition + window.innerHeight > $(technology).offset().top) {
      technology.classList.add('my-technologies__technology--scrolled');
    }
  });
  partsOfPage.forEach((partOfPage, i) => {
    if (scrollPosition > $(partOfPage).offset().top - 50) {
      listOfPageParts[currentPartOfPage].classList.remove('nav__list-item--actual');
      currentPartOfPage = i;
      listOfPageParts[currentPartOfPage].classList.add('nav__list-item--actual');
    }
  });
};

checkScrollPosition();

window.addEventListener('scroll', checkScrollPosition);

burger.addEventListener('click', () => {
  navList.classList.toggle('nav__list--open');
  burgerBars.forEach(bar => {
    bar.classList.toggle('hamburger-icon__bar--clicked');
  })
})

skillButton.addEventListener('click', () => {
  $('body, html').animate({
      scrollTop: $(partsOfPage[1]).offset().top,
    },1000
  );
});

listOfPageParts.forEach((item, i) => {
  item.addEventListener('click', () => {
    $('body, html').animate(
      {
        scrollTop: $(partsOfPage[i]).offset().top,
      },
      1000
    );
  });
});

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
  }, 2000);
});

