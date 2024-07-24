const swiper = new Swiper(".swiper", {
  freeMode: true,
  breakpoints: {
    375: {
      slidesPerView: 1,
      spaceBetween: 8,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },
});

const menuOpenBtnId = "#menuOverlay";
const menuCloseBtnSelector = ".menuOverlay_header_closeBtn";
const menuOverlaySelector = ".menuOverlay_container";
const durMenuAnimation = 0.2;

document.querySelector(menuOpenBtnId).addEventListener("click", () => {
  const tl = gsap.timeline();

  tl.to(menuOverlaySelector, {
    display: "block",
    duration: 0.01,
  }).to(menuOverlaySelector, {
    opacity: 1,
    duration: durMenuAnimation,
    onStart: () => {
      document.querySelector(menuOverlaySelector).style.overflow = "auto";
      document.querySelector("body").style.overflow = "hidden";
    },
  });
});

document.querySelector(menuCloseBtnSelector).addEventListener("click", () => {
  const tl = gsap.timeline();
  tl.to(menuOverlaySelector, {
    opacity: 0,
    duration: durMenuAnimation,
    onStart: () => {
      document
        .querySelector(menuOverlaySelector)
        .style.removeProperty("overflow");
      document.querySelector("body").style.removeProperty("overflow");
    },
  }).to(menuOverlaySelector, {
    display: "none",
    duration: 0.01,
  });
});
