let mainColor = localStorage.getItem("option-color");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".color-list li").forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === mainColor) {
      li.classList.add("active");
    }
  });
}
let bgOptions = true;
let bgInterval;

let bgLocalItems = localStorage.getItem("background-option");

if (bgLocalItems !== null) {
  if (bgLocalItems === "true") {
    bgOptions = true;
  } else {
    bgOptions = false;
  }
  document.querySelectorAll(".random-backgrounds span").forEach((span) => {
    span.classList.remove("active");
  });

  if (bgLocalItems === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

let settingBox = document.querySelector(".setting-box");
let iconSetting = document.querySelector(".toggle-setting .icon");

iconSetting.onclick = function () {
  settingBox.classList.toggle("open");
  this.classList.toggle("fa-spin");
};

const colorLi = document.querySelectorAll(".color-list li");
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color,
    );
    localStorage.setItem("option-color", e.target.dataset.color);

    // colorLi.forEach((li) => {
    //   li.classList.remove("active");
    // });

    removeAddActive(e);
  });
});

const randomBg = document.querySelectorAll(".random-backgrounds span");
randomBg.forEach((span) => {
  span.addEventListener("click", (e) => {
    removeAddActive(e);

    if (e.target.dataset.bg === "yes") {
      bgOptions = true;
      randomizeOption();
      localStorage.setItem("background-option", true);
    } else {
      bgOptions = false;
      clearInterval(bgInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
function randomizeOption() {
  if (bgOptions === true) {
    bgInterval = setInterval(() => {
      let imgRandom = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage = `url(Images/${imgsArray[imgRandom]})`;
    }, 1000);
  }
}
randomizeOption();

let skillsPage = document.querySelector(".skills");
window.onscroll = function () {
  let skillsOffsetTop = skillsPage.offsetTop;
  let skillsHeight = skillsPage.offsetHeight;
  let innerHeight = this.innerHeight;
  let skillsPageY = this.pageYOffset;
  let scroll = skillsOffsetTop + skillsHeight - innerHeight;

  if (skillsPageY >= scroll) {
    let skillProgress = this.document.querySelectorAll(
      ".skill-box .skill-progress span",
    );
    skillProgress.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};
let gallaryImages = document.querySelectorAll(".gallery .images img");
gallaryImages.forEach((img) => {
  img.addEventListener("click", function (e) {
    let popupOverlay = document.createElement("div");

    popupOverlay.className = "popup-overlay";

    document.body.appendChild(popupOverlay);

    let popup = document.createElement("div");

    popup.className = "popup-box";
    if (img.alt !== null) {
      let h3 = document.createElement("h3");
      let h3Text = document.createTextNode(img.alt);
      h3.appendChild(h3Text);
      popup.appendChild(h3);
    }
    let popupImg = document.createElement("img");

    popupImg.src = img.src;

    popup.appendChild(popupImg);

    let span = document.createElement("span");
    span.className = "close-button";
    let spanText = document.createTextNode("X");
    span.appendChild(spanText);
    popup.appendChild(span);

    document.body.appendChild(popup);
  });
});
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    // e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

const bulletsNav = document.querySelectorAll(".nav-bullets .bullet");
const linksNav = document.querySelectorAll(".links a");

function scrollIntoViewEl(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollIntoViewEl(bulletsNav);
scrollIntoViewEl(linksNav);

function removeAddActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  event.target.classList.add("active");
}

let bulletContainer = document.querySelector(".nav-bullets");
let showBullets = document.querySelectorAll(".option-box .show-bullets span");
let bulletLocalItem = localStorage.getItem("option_bullets");
if (bulletLocalItem !== null) {
  showBullets.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletContainer.style.display = "block";
    document.querySelector(".show-bullets  span.yes").classList.add("active");
  } else {
    document.querySelector(".show-bullets  span.no").classList.add("active");
    bulletContainer.style.display = "none";
  }
}

showBullets.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.bullet === "show") {
      bulletContainer.style.display = "block";
      localStorage.setItem("option_bullets", "block");
    } else {
      bulletContainer.style.display = "none";
      localStorage.setItem("option_bullets", "none");
    }
    removeAddActive(e);
  });
});

document.querySelector(".reset-option").onclick = function () {
  localStorage.removeItem("option-color");
  localStorage.removeItem("background-option");
  localStorage.removeItem("option_bullets");
  window.location.reload();
};
let toggleMenu = document.querySelector(
  ".header-area .container-links .toggle-menu",
);
let tLinks = document.querySelector(".landing-page .header-area .links");
let container = document.querySelector(".container");
toggleMenu.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("active-menu");
  tLinks.classList.toggle("open");
};
document.addEventListener("click", function (e) {
  if (e.target !== toggleMenu && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleMenu.classList.toggle("active-menu");
      tLinks.classList.toggle("open");
    }
  }
});
tLinks.onclick = function (e) {
  e.stopPropagation();
};
