const sliderItems = document.querySelector(".slider-band");
const slides = document.querySelectorAll(".slide");

const dotsBlock = document.querySelector(".dots-block");
const dots = document.querySelectorAll(".dots-item");

const buttonPrev = document.querySelector(".prev-button");
const buttonNext = document.querySelector(".next-button");

let slideIndex = 0;
let offset = 0;
let animation;
let isClicked = false;

const slidesLength = slides.length;
const firstSlide = slides[slideIndex];
const lastSlide = slides[slidesLength - 1];
const cloneFirst = firstSlide.cloneNode(true);
const cloneLast = lastSlide.cloneNode(true);

buttonPrev.addEventListener("click", () => {
  if (isClicked) {
    return false;
  }
  if (slideIndex === 0) {
    let offsetLastSlide = -600 * (slidesLength + 1);
    sliderItems.appendChild(cloneLast).style.marginLeft =
      offsetLastSlide + "px";
    cloneFirst.remove();
  }
  isClicked = true;
  slideIndex--;
  sliderMove("left");
});

buttonNext.addEventListener("click", () => {
  if (slideIndex === slidesLength - 1) {
    sliderItems.appendChild(cloneFirst);
    cloneLast.remove();
  }
  if (isClicked) {
    return false;
  }
  isClicked = true;
  slideIndex++;
  sliderMove("right");
});

function sliderMove(side) {
  side = side === "left" ? -1 : 1;
  animation = setInterval(function () {
    offset = offset + side;
    sliderItems.style.marginLeft = offset * -30 + "px";

    if (offset === 20 * slideIndex) {
      clearInterval(animation);
      isClicked = false;
      checkLastOrFirst();
    }
    switchingDots();
  }, 15);
}

function switchingDots() {
  if (slideIndex < slidesLength && slideIndex !== -1) {
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    dots[slideIndex].classList.add("active");
  }
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (isClicked) {
      return false;
    }
    isClicked = false;
    dotSwitchSlide(index);
  });
});

function dotSwitchSlide(index) {
  if (index > slideIndex) {
    side = 1;
  } else if (index < slideIndex) {
    side = -1;
  } else {
    return (isClicked = false);
  }

  animation = setInterval(function () {
    offset = offset + side;
    sliderItems.style.marginLeft = offset * -30 + "px";

    if (offset === 20 * index) {
      clearInterval(animation);
      checkLastOrFirst();
    }
    slideIndex = index;
    switchingDots();
  }, 5);
}

function checkLastOrFirst() {
  if (slideIndex < 0) {
    let length = slidesLength - 1;
    offset = 20 * length;

    slideIndex = slidesLength - 1;
    sliderItems.style.marginLeft = offset * -30 + "px";
  }

  if (slideIndex >= slidesLength) {
    offset = 1;
    slideIndex = 0;
    sliderItems.style.marginLeft = 0 + "px";
  }
}
