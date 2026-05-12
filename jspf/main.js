window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  const sections = ["#home", "#projects", "#project-2", "#project-3", "#contact"];
  let currentSection = 0;
  let isAnimating = false;
  const aboutTrigger = document.querySelector('#about-trigger');
  const aboutContent = "Passionate developer crafting immersive digital experiences. Specializing in high-performance GSAP animations and cinematic UI design.";
  let isAboutVisible = false;

  const upBtn = document.querySelector("#nav-up");
  const downBtn = document.querySelector("#nav-down");
  const sectionNav = document.querySelector(".section-nav");
  const projectsLink = document.querySelector('.hero-menu a[href="#projects"]');

  const resizeListener = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    ScrollTrigger.refresh();
  };

  window.addEventListener('resize', resizeListener);
  resizeListener();
  setTimeout(resizeListener, 150);

  function updateNavButtons() {
    if (upBtn) upBtn.disabled = currentSection === 0;
    if (downBtn) downBtn.disabled = currentSection === sections.length - 1;

    gsap.to(sectionNav, {
      opacity: currentSection === 0 ? 0 : 1,
      duration: 0.4
    });
  }

  function revealCurrentSection() {
    const section = document.querySelector(sections[currentSection]);
    const reveal = section?.querySelector(".reveal");
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
  if (isAnimating || index < 0 || index >= sections.length) return;

  isAnimating = true;

  const isHeroToWork = currentSection === 0 && index === 1;
  const isReturningHome = index === 0;

  gsap.to(window, {
    duration: isHeroToWork ? 7.5 : 2.2,
    scrollTo: { y: sections[index], autoKill: false },
    ease: "power2.inOut",
    onStart: () => {
      if (isReturningHome) {
        currentSection = index;
        updateNavButtons();
      }
    },
      onComplete: () => {
    currentSection = index;
    updateNavButtons();
  
    if (index >= 1) {
      gsap.to(".project-bg-fade", {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out"
      });
    } else {
      gsap.to(".project-bg-fade", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in"
      });
    }
  
    revealCurrentSection();
    ScrollTrigger.refresh();
    isAnimating = false;
  }
  });
}


  function toggleAbout() {
    if (isAboutVisible) return; 
    isAboutVisible = true;

    const tl = gsap.timeline();

    tl.to(".about-line", { height: "30px", duration: 0.5, ease: "power2.out" })
      .to(".about-box", { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.1")
      .to("#about-text", { duration: 2.5, text: aboutContent, ease: "none" });
  }

  if (aboutTrigger) {
    aboutTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      toggleAbout();
    });
  }

  window.addEventListener("keydown", (e) => {
    const blockedKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
    if (blockedKeys.includes(e.key)) {
      e.preventDefault();
      if (e.key === "ArrowUp" || e.key === "PageUp") goToSection(currentSection - 1);
      else if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") goToSection(currentSection + 1);
      else if (e.key === "Home") goToSection(0);
      else if (e.key === "End") goToSection(sections.length - 1);
    }
  });

  if (upBtn) upBtn.addEventListener("click", () => goToSection(currentSection - 1));
  if (downBtn) downBtn.addEventListener("click", () => goToSection(currentSection + 1));

  if (projectsLink) {
    projectsLink.addEventListener("click", (e) => {
      e.preventDefault();
      goToSection(1);
    });
  }

window.addEventListener("touchstart", (e) => {
  if (document.body.classList.contains("no-free-scroll")) {
    this.touchY = e.touches[0].clientY;
  }
}, { passive: false });

window.addEventListener("touchmove", (e) => {
  if (isAnimating || document.body.classList.contains("no-free-scroll")) {
    e.preventDefault();
  }
}, { passive: false });


window.addEventListener("wheel", (e) => {
  if (isAnimating || document.body.classList.contains("no-free-scroll")) {
    e.preventDefault();
  }
}, { passive: false });

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
  .to(".hero-near", { y: 450, ease: "none" }, 0);

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
  scrollTrigger: {
    trigger: ".hero",
    start: "70% top",
    end: "bottom top", 
    scrub: true
  }
});


gsap.utils.toArray(".project-image img, .project-image video").forEach((media) => {
  gsap.fromTo(media,
    { scale: 1.15 },
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


gsap.set(".reveal", { opacity: 0, y: 80 });
document.body.classList.add("no-free-scroll");
updateNavButtons();

});
