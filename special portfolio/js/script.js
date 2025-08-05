// Load color from localStorage
let mainColor = localStorage.getItem("color-option");
let landingImg = localStorage.getItem("landing-img");
let aboutImg = localStorage.getItem("about-img");

if (mainColor !== null) {
  document.documentElement.style.setProperty('--main-color', mainColor);
  document.querySelector('.landing-page').style.backgroundImage = `url("imgs/${landingImg}")`;
  document.querySelector('.about-img').src = `imgs/${aboutImg}`;
  
  document.querySelectorAll('.colors-list li').forEach(el => {
    el.classList.remove("active");
    if (el.dataset.color === mainColor) {
      el.classList.add("active");
    }
  });
}

// Apply temporary default style if no color is stored
if (!mainColor) {
  let defaultColor = "#ffe206";
  let defaultLanding = "1.jpg";
  let defaultAbout = "6.png";

  document.documentElement.style.setProperty('--main-color', defaultColor);
  document.querySelector('.landing-page').style.backgroundImage = `url("imgs/${defaultLanding}")`;
  document.querySelector('.about-img').src = `imgs/${defaultAbout}`;
}

// Toggle settings box
document.querySelector(".toggle-setting .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// Handle color change
document.querySelectorAll(".colors-list li").forEach(li => {
  li.addEventListener("click", (e) => {
    const color = e.target.dataset.color;
    const landing = e.target.dataset.landing;
    const about = e.target.dataset.about;

    // Change color
    document.documentElement.style.setProperty('--main-color', color);
    localStorage.setItem("color-option", color);

    // Change background and about image
    document.querySelector('.landing-page').style.backgroundImage = `url("imgs/${landing}")`;
    document.querySelector('.about-img').src = `imgs/${about}`;

    // Save to localStorage
    localStorage.setItem("landing-img", landing);
    localStorage.setItem("about-img", about);

    // Update active class
    e.target.parentElement.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
    e.target.classList.add("active");
  });
});

// Skills animation
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach(skill => {
      skill.style.width = "0";
    });
  }
};

// Gallery popup
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
  img.addEventListener('click', (e) => {
    let overlay = document.createElement("div");
    overlay.className = 'popup-overlay';
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = 'popup-box';

    if (img.alt !== "" && img.alt.startsWith("http")) {
      let imgLink = document.createElement("a");
      imgLink.href = img.alt;
      imgLink.textContent = "زيارة المشروع";
      imgLink.target = "_blank";
      imgLink.style.display = "block";
      imgLink.style.marginBottom = "10px";
      popupBox.appendChild(imgLink);
    }

    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);

    let closeButton = document.createElement("span");
    closeButton.className = 'close-button';
    closeButton.textContent = "X";
    popupBox.appendChild(closeButton);

    document.body.appendChild(popupBox);
  });
});

// Close popup
document.addEventListener("click", function (e) {
  if (e.target.className === 'close-button') {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Smooth scroll for bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach(bullet => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Smooth scroll for links
const allLinks = document.querySelectorAll(".links a");

allLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

tLinks.onclick = function (e) {
  e.stopPropagation();
};

// Contact form submission
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("تم إرسال النموذج! (هذه رسالة تجريبية، يجب إضافة معالجة حقيقية)");
  this.reset();
});