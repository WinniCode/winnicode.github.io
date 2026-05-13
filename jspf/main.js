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
  const aboutWrapper = document.querySelector('.about-wrapper');
  const aboutContent = "I’m Chris, a Computational Biologist dedicated to bridging the gap between complex biological data and intuitive user experiences. I specialise in building robust bioinformatics pipelines with a focus on creative software engineering and streamlined UI design. Explore my 'Work' to see my latest builds.";

  const upBtn = document.querySelector("#nav-up");
  const downBtn = document.querySelector("#nav-down");
  const sectionNav = document.querySelector(".section-nav");
  const projectsLink = document.querySelector('.hero-menu a[href="#projects"]');


  let aboutTl = gsap.timeline({ paused: true });

  function closeAboutFast() {
  if (!aboutTl.paused()) {
    gsap.set("#about-text", { opacity: 0 }); 
    aboutTl.reverse("boxFull"); 
        }
      }
  
  aboutTl.to(".about-line", { height: "40px", duration: 0.4, ease: "power2.in" })
         .to(".about-box", { height: "200px", borderColor: "rgba(0, 209, 255, 0.5)", duration: 0.3, ease: "power2.out" })
         .to(".about-box", { width: "100%", duration: 0.5, ease: "expo.out" })
         .add("boxFull")
         .to("#about-text", { opacity: 1, duration: 0.2 })
         .to("#about-text", { duration: 3.0, text: aboutContent, ease: "none" }, "-=0.1");


  if (aboutTrigger) {
    aboutTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (aboutTl.reversed() || aboutTl.paused()) {
        aboutTl.play();
      } else {
        closeAboutFast();
      }
    });
  }


  ["click", "touchstart"].forEach(evt => {
    window.addEventListener(evt, (e) => {
      if (!aboutTl.paused() && !aboutTl.reversed()) {
        if (aboutWrapper && !aboutWrapper.contains(e.target)) {
          closeAboutFast();
        }
      }
    }, { passive: true });
  });


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

 
    if (!aboutTl.paused() && !aboutTl.reversed()) {
      closeAboutFast();
    }

    isAnimating = true;

    const isHeroToWork = currentSection === 0 && index === 1;
    const isReturningHome = index === 0;

    gsap.to(window, {
      duration: isHeroToWork ? 8.5 : 2.2,
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
          gsap.to(".project-bg-fade", { opacity: 1, duration: 4.0, ease: "power1.inOut" });
        } else {
          gsap.to(".project-bg-fade", { opacity: 0, duration: 5.0, ease: "power1.inOut" });
        }
        
        revealCurrentSection();
        ScrollTrigger.refresh();
        isAnimating = false;
      }
    });
  }


  const resizeListener = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    ScrollTrigger.refresh();
  };

  window.addEventListener('resize', resizeListener);
  resizeListener();

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


  window.addEventListener("wheel", (e) => {
    if (isAnimating || document.body.classList.contains("no-free-scroll")) e.preventDefault();
  }, { passive: false });

  window.addEventListener("touchmove", (e) => {
    if (isAnimating || document.body.classList.contains("no-free-scroll")) e.preventDefault();
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
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 2
    }
  });

  gsap.utils.toArray(".project-image img, .project-image video").forEach((media) => {
    gsap.fromTo(media,
      { scale: 1.15 },
      {
        scale: 1,
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
