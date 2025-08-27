// Navigation active link effect
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    // For anchor links, allow scroll, for # only, prevent default
    if (this.getAttribute("href") === "#") e.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// Typewriter effect for typing-text
const roles = [
  "Web Developer",
  "Java Developer",
  "Web Designer",
  "Software Engineer",
  "Full-stack Developer",
];
const typingSpan = document.querySelector(".typing-text span");
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingSpeed = 100;
let erasingSpeed = 60;
let delayBetweenRoles = 1200;

function typeRole() {
  const currentRole = roles[roleIdx];
  if (!isDeleting) {
    typingSpan.textContent = currentRole.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, delayBetweenRoles);
    } else {
      setTimeout(typeRole, typingSpeed);
    }
  } else {
    typingSpan.textContent = currentRole.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeRole, typingSpeed);
    } else {
      setTimeout(typeRole, erasingSpeed);
    }
  }
}
typeRole();

// Hamburger menu toggle
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("head");
navToggle.addEventListener("click", function () {
  nav.classList.toggle("active");
  navToggle.classList.toggle("open");
});

// --- Section observer for nav highlighting ---
const sections = document.querySelectorAll("section");
const navLinksArr = Array.from(navLinks);

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5, // 50% of section visible
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    const navLink = navLinksArr.find(
      (link) => link.getAttribute("href") === `#${id}`
    );
    if (entry.isIntersecting && navLink) {
      navLinks.forEach((l) => l.classList.remove("active"));
      navLink.classList.add("active");
    }
  });
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
