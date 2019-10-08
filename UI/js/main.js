/* eslint-disable no-param-reassign */
const selectedButton = document.querySelectorAll('.selected');

// eslint-disable-next-line no-plusplus
for (let i = 0; i < selectedButton.length; i++) {
  selectedButton[i].addEventListener('click', function() {
    selectedButton[0].classList.remove('on');
    selectedButton[1].classList.remove('on');
    selectedButton[2].classList.remove('on');
    this.classList.add('on');
  });
}

const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.links');
  const navLinks = document.querySelectorAll('.links li');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        // eslint-disable-next-line prettier/prettier
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        // eslint-disable-next-line prettier/prettier
            }
    });

    burger.classList.toggle('animate');
  });
};

navSlide();
