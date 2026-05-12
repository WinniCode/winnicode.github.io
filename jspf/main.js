gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

function updateNavButtons(){

  /* Hide nav entirely on hero */
  if(currentSection === 0){
    gsap.to(".section-nav", {
      opacity:0,
      pointerEvents:"none",
      duration:0.4
    });
  }

  else{
    gsap.to(".section-nav", {
      opacity:1,
      pointerEvents:"auto",
      duration:0.4
    });
  }

  upBtn.disabled = currentSection === 0;
  downBtn.disabled = currentSection === sections.length - 1;
}

function goToSection(index){
  if (isAnimating) return;
  if (index < 0 || index >= sections.length) return;

  isAnimating = true;
  currentSection = index;
  updateNavButtons();

  document.body.classList.remove("no-free-scroll");

  gsap.to(window, {
    duration: window.innerWidth <= 900 ? 1.8 : 2.2,
    scrollTo: {
      y: sections[currentSection],
      offsetY: 0
    },
    ease: "power3.inOut",
    onComplete: () => {
      document.body.classList.add("no-free-scroll");
      isAnimating = false;
    }
  });
}

upBtn.addEventListener("click", () => {
  goToSection(currentSection - 1);
});

downBtn.addEventListener("click", () => {
  goToSection(currentSection + 1);
});

document.querySelector('a[href="#projects"]')?.addEventListener("click", (event) => {
  event.preventDefault();
  goToSection(1);
});

updateNavButtons();


// Reset scroll to top on refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// 1. MOTION ONLY (No opacity here for near image)
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

// 2. SKY FADE (Grouped)
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

// 3. NEAR IMAGE FADE (The Bug Fix)
// immediateRender: false + a late start ensures it's solid on load
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

// 4. THE SLOW CURTAIN
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

// 5. CONTENT REVEALS
const projects = gsap.utils.toArray(".project");
projects.forEach((project) => {
  const content = project.querySelector(".reveal");
  if (content) {
    gsap.to(content, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: content,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", function(event) {

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (!target) return;

    event.preventDefault();

    gsap.to(window, {
      duration: 7.5,
      scrollTo: {
        y: target,
        offsetY: 0
      },
      ease: "power2.inOut"
    });

  });

});
