// ================= MOBILE NAV TOGGLE =================
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

// ================= SMOOTH SCROLL NAV LINKS =================
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth",
      });
    }

    // Close mobile menu
    navLinksContainer.classList.remove("nav-active");
    hamburger.classList.remove("toggle");
  });
});

// ================= HERO IMAGE ON LOAD =================
const heroImage = document.querySelector(".hero-img img");

window.addEventListener("load", () => {
  heroImage.style.opacity = "1";
  heroImage.style.transform = "scale(1)";
});

heroImage.style.transition = "1s ease";
heroImage.style.opacity = "0";
heroImage.style.transform = "scale(0.8)";

// ================= FADE-IN SECTIONS =================
const faders = document.querySelectorAll(
  ".about, .projects, .skills, .contact"
);

const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

faders.forEach((fader) => {
  fader.classList.add("fade-section");
  appearOnScroll.observe(fader);
});

// ================= CONTACT FORM =================
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

  const successMsg = document.createElement("p");
  successMsg.textContent = `Thanks ${name}! Your message has been sent.`;
  successMsg.style.color = "var(--primary)";
  successMsg.style.fontWeight = "600";
  successMsg.style.marginTop = "10px";

  contactForm.appendChild(successMsg);
  contactForm.reset();

  setTimeout(() => successMsg.remove(), 4000);
});

// ================= SCROLL-ACTIVE NAV HIGHLIGHT =================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const offset = section.offsetTop - 100;
    if (scrollY >= offset && scrollY < offset + section.offsetHeight) {
      currentSection = section.id;
    }
  });

  navItems.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href").includes(currentSection)
    );
  });
});

// ================= SKILL BARS ANIMATION =================
const skillCards = document.querySelectorAll(".skill-card");
const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const fill = entry.target.querySelector(".skill-fill");
      fill.style.width = fill.dataset.skill;
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

skillCards.forEach((card) => skillObserver.observe(card));

// ================= TYPED TEXT ANIMATION =================
const roles = ["Web Developer", "UI/UX Designer", "React Enthusiast"];
let i = 0;
let j = 0;
let isDeleting = false;
const typedText = document.getElementById("typed-text");

function type() {
  const current = roles[i];

  typedText.textContent = current.substring(0, j);

  if (!isDeleting && j < current.length) {
    j++;
  } else if (isDeleting && j > 0) {
    j--;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % roles.length;
    setTimeout(type, 800);
    return;
  }

  setTimeout(type, isDeleting ? 50 : 120);
}

document.addEventListener("DOMContentLoaded", type);

// ================= PROJECT FILTER =================
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      card.style.opacity = "0";

      setTimeout(() => {
        if (filter === "all" || card.classList.contains(filter)) {
          card.style.display = "block";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
        }
      }, 200);
    });
  });
});
