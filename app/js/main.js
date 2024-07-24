let counterFavoriteItems = 0;
const addFavoriteBtnSelector = ".trandItem_favoriteBtn";
const activeFavoriteBtnSelector = ".trandItem_favoriteBtn-active";
const favoriteCounterSelector =
  "header .navBlock_actionsList .navBlock_favorite_counter";
const favoriteCounterEl = document.querySelector(favoriteCounterSelector);
const activeFavoriteCounterClass = "navBlock_favorite_counter-active";

function incrementFavorite(target) {
  counterFavoriteItems++;
  if (!favoriteCounterEl.classList.contains(activeFavoriteCounterClass)) {
    favoriteCounterEl.classList.add(activeFavoriteCounterClass);
  }
  favoriteCounterEl.textContent = counterFavoriteItems;
  target.classList.add(activeFavoriteBtnSelector.slice(1));
}

function decrementFavorite(target) {
  counterFavoriteItems--;
  favoriteCounterEl.textContent = counterFavoriteItems;
  target.classList.remove(activeFavoriteBtnSelector.slice(1));
  if (counterFavoriteItems === 0) {
    favoriteCounterEl.classList.remove(activeFavoriteCounterClass);
  }
}

document.querySelectorAll(addFavoriteBtnSelector).forEach((item) => {
  item.addEventListener("click", (el) => {
    if (!el.target.classList.contains(activeFavoriteBtnSelector.slice(1))) {
      return incrementFavorite(el.target);
    }
    return decrementFavorite(el.target);
  });
});

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
    display: "flex",
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
