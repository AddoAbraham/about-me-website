// ====== MOBILE NAV TOGGLE ======
const nav = document.querySelector(".nav");
const navLinksContainer = document.querySelector(".nav-links");

// Create hamburger menu dynamically
const hamburger = document.createElement("div");
hamburger.classList.add("hamburger");
hamburger.innerHTML = `<span></span><span></span><span></span>`;
nav.appendChild(hamburger);

hamburger.addEventListener("click", () => {
  navLinksContainer.classList.toggle("nav-active");
  hamburger.classList.toggle("toggle");
});

// ====== SMOOTH SCROLL FOR NAVIGATION ======
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth",
      });
    }

    // Close mobile nav after clicking
    if (navLinksContainer.classList.contains("nav-active")) {
      navLinksContainer.classList.remove("nav-active");
      hamburger.classList.remove("toggle");
    }
  });
});

// ====== HERO IMAGE ANIMATION ON LOAD ======
const heroImage = document.querySelector(".hero-img img");
window.addEventListener("load", () => {
  heroImage.style.transform = "scale(1)";
  heroImage.style.opacity = "1";
});

// ====== FADE-IN SECTIONS ON SCROLL ======
const faders = document.querySelectorAll(
  ".about, .projects, .skills, .contact"
);

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => {
  fader.classList.add("fade-section");
  appearOnScroll.observe(fader);
});

// ====== CONTACT FORM HANDLING ======
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields!");
    return;
  }

  alert(`Thanks ${name}! Your message has been sent.`);
  contactForm.reset();
});

// ====== HERO IMAGE INITIAL STYLING ======
heroImage.style.transition = "all 1s ease";
heroImage.style.transform = "scale(0.8)";
heroImage.style.opacity = "0";

// ====== SCROLL-ACTIVE NAV HIGHLIGHT ======
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 70;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields!");
    return;
  }

  const successMsg = document.createElement("p");
  successMsg.textContent = `Thanks ${name}! Your message has been sent.`;
  successMsg.style.color = "var(--primary)";
  successMsg.style.fontWeight = "600";
  contactForm.appendChild(successMsg);

  contactForm.reset();

  setTimeout(() => {
    successMsg.remove();
  }, 4000);
});

// Animate skill bars when section is in view
const skillCards = document.querySelectorAll(".skill-card");

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector(".skill-fill");
        fill.style.width = fill.getAttribute("data-skill");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

skillCards.forEach((card) => skillObserver.observe(card));

// Typed text for Hero Subtitle
const roles = ["Web Developer", "UI/UX Designer", "React Enthusiast"];
let i = 0;
let j = 0;
let currentRole = "";
let isDeleting = false;
const typedText = document.getElementById("typed-text");

function type() {
  if (i >= roles.length) i = 0;
  currentRole = roles[i];

  if (isDeleting) {
    typedText.textContent = currentRole.substring(0, j--);
    if (j < 0) {
      isDeleting = false;
      i++;
    }
  } else {
    typedText.textContent = currentRole.substring(0, j++);
    if (j > currentRole.length) {
      isDeleting = true;
      setTimeout(type, 1500); // wait before deleting
      return;
    }
  }
  setTimeout(type, isDeleting ? 50 : 150);
}

document.addEventListener("DOMContentLoaded", type);

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
