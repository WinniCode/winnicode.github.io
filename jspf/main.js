document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Prevent browser from remembering scroll position on refresh
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  /* =========================================
     SECTION NAVIGATION CONFIG
     ========================================= */
  const sections = ["#home", "#projects", "#project-2", "#project-3", "#contact"];
  let currentSection = 0;
  let isAnimating = false;

  const upBtn = document.querySelector("#nav-up");
  const downBtn = document.querySelector("#nav-down");
  const sectionNav = document.querySelector(".section-nav");
  const projectsLink = document.querySelector('.hero-menu a[href="#projects"]');

  function updateNavButtons() {
    upBtn.disabled = currentSection === 0;
    downBtn.disabled = currentSection === sections.length - 1;

    // Show side nav only when we leave the hero section
    gsap.to(sectionNav, {
      opacity: currentSection === 0 ? 0 : 1,
      pointerEvents: currentSection === 0 ? "none" : "auto",
      duration: 0.4
    });
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

    // 1. Temporarily UNLOCK the body so the window can move
    document.body.classList.remove("no-free-scroll");

    const targetSection = sections[index];
    const isHeroToWork = currentSection === 0 && index === 1;

    gsap.to(window, {
      duration: isHeroToWork ? 7.5 : 2.2, // Cinematic scroll for first jump
      scrollTo: { y: targetSection, autoKill: false },
      ease: "power2.inOut",
      onStart: () => {
        currentSection = index;
        updateNavButtons();
      },
      onComplete: () => {
        // 2. RE-LOCK the body once animation is done
        document.body.classList.add("no-free-scroll");
        revealCurrentSection();
        
        // Refresh ScrollTrigger to ensure parallax layers align perfectly
        ScrollTrigger.refresh();
        isAnimating = false;
      }
    });
  }

  /* =========================================
     INPUT HANDLERS
     ========================================= */
  
  // Block specific keys that could break the "locked" feel
  window.addEventListener("keydown", (e) => {
    const blockedKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
    if (blockedKeys.includes(e.key)) {
      e.preventDefault();
      if (e.key === "ArrowUp") goToSection(currentSection - 1);
      if (e.key === "ArrowDown" || e.key === " ") goToSection(currentSection + 1);
    }
  });

  // Nav Button Clicks
  upBtn.addEventListener("click", () => goToSection(currentSection - 1));
  downBtn.addEventListener("click", () => goToSection(currentSection + 1));

  // Hero Menu "Work" Link
  if (projectsLink) {
    projectsLink.addEventListener("click", (e) => {
      e.preventDefault();
      goToSection(1);
    });
  }

  /* =========================================
     HERO PARALLAX (ScrollTrigger)
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

  // Fade out the sky and near layers as we descend
  gsap.to(".hero-sky, .hero-near", {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "50% top",
      end: "bottom top",
      scrub: true
    }
  });

  // Fade in the project background as the hero leaves
  gsap.to(".project-bg-fade", {
    opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".first-project",
      start: "top 80%",
      end: "top 20%",
      scrub: true
    }
  });

  /* =========================================
     PROJECT MEDIA PARALLAX
     ========================================= */
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

  // Initial State setup
  gsap.set(".reveal", { opacity: 0, y: 80 });
  updateNavButtons();
});
