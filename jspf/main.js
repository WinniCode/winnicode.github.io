document.addEventListener("DOMContentLoaded", () => {

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);

/* =========================================
   SECTION NAVIGATION
========================================= */

const sections = [
  "#home",
  "#projects",
  "#project-2",
  "#project-3",
  "#contact"
];

let currentSection = 0;
let isAnimating = false;

const upBtn = document.querySelector("#nav-up");
const downBtn = document.querySelector("#nav-down");
const sectionNav = document.querySelector(".section-nav");
const projectsLink = document.querySelector('.hero-menu a[href="#projects"]');

function hideNav() {
  gsap.to(sectionNav, {
    opacity: 0,
    pointerEvents: "none",
    duration: 0.25
  });
}

function showNav() {
  gsap.to(sectionNav, {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.4
  });
}

function updateNavButtons() {
  upBtn.disabled = currentSection === 0;
  downBtn.disabled = currentSection === sections.length - 1;

  if (currentSection === 0) {
    hideNav();
  } else {
    showNav();
  }
}

function revealCurrentSection() {
  const section = document.querySelector(sections[currentSection]);
  if (!section) return;

  const reveal = section.querySelector(".reveal");

  if (reveal) {
    gsap.to(reveal, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "power3.out"
    });
  }
}

function goToSection(index) {
  if (isAnimating) return;
  if (index < 0 || index >= sections.length) return;

  isAnimating = true;
  currentSection = index;
  
  // UNLOCK the scroll so GSAP can actually move the window
  document.body.classList.remove("no-free-scroll"); 

  gsap.to(window, {
    duration: index === 1 ? 7.5 : 2.2,
    scrollTo: { y: sections[index], autoKill: false },
    ease: "power2.inOut",
    onComplete: () => {
      // RE-LOCK after movement
      document.body.classList.add("no-free-scroll"); 
      revealCurrentSection();
      isAnimating = false;
    }
  });
}

/* block manual scrolling */
function blockManualScroll(event) {
  event.preventDefault();
}


window.addEventListener("keydown", (event) => {
  const blockedKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];

  if (blockedKeys.includes(event.key)) {
    event.preventDefault();
  }
});

/* nav buttons */
upBtn.addEventListener("click", () => {
  goToSection(currentSection - 1);
});

downBtn.addEventListener("click", () => {
  goToSection(currentSection + 1);
});

/* hero menu */
if (projectsLink) {
  projectsLink.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation(); // Stop the event from bubbling up to the window blockers
    goToSection(1);
  });
}

document.querySelector('.hero-menu a[href="#"]')?.addEventListener("click", (event) => {
  event.preventDefault();
});

updateNavButtons();

/* =========================================
   HERO PARALLAX
========================================= */

const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

heroTl
  .to(".hero-far", { y: 150, scale: 1.05, ease: "none" }, 0)
  .to(".hero-middle", { y: 280, ease: "none" }, 0)
  .to(".hero-near", { y: 450, ease: "none" }, 0)
  .to(".scroll-indicator", { opacity: 0, y: 30, ease: "none" }, 0);

gsap.to(".hero-sky", {
  opacity: 0,
  ease: "power1.inOut",
  scrollTrigger: {
    trigger: ".hero",
    start: "30% top",
    end: "80% top",
    scrub: true
  }
});

gsap.to(".hero-near", {
  opacity: 0,
  ease: "none",
  immediateRender: false,
  scrollTrigger: {
    trigger: ".hero",
    start: "70% top",
    end: "bottom top",
    scrub: true
  }
});

gsap.to(".project-bg-fade", {
  opacity: 1,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".first-project",
    start: "top 10%",
    end: "top top",
    scrub: true
  }
});

/* =========================================
   INITIAL REVEAL STATES
========================================= */

gsap.set(".reveal", {
  opacity: 0,
  y: 80
});

/* =========================================
   PROJECT IMAGE DEPTH
========================================= */

gsap.utils.toArray(".project-image img, .project-image video").forEach((media) => {
  gsap.fromTo(
    media,
    { scale: 1.08 },
    {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: media,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    }
  );
});

});
