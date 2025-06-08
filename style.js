// Smooth Dark Mode Toggle with GSAP Curtain Effect + Portfolio Animations

document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.querySelector(".theme-toggle");
  const themeIcon = themeBtn.querySelector("i");

  // Create curtain if not present
  let curtain = document.querySelector(".dark-curtain");
  if (!curtain) {
    curtain = document.createElement("div");
    curtain.classList.add("dark-curtain");
    document.body.appendChild(curtain);
  }

  let isAnimating = false;

  themeBtn.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;
    themeBtn.disabled = true;

    // Slide curtain down
    gsap.set(curtain, { yPercent: -100, display: "block" });
    gsap.to(curtain, {
      yPercent: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        // Toggle dark mode class & update icon
        document.body.classList.toggle("dark-mode");
        themeIcon.className = document.body.classList.contains("dark-mode")
          ? "ri-moon-line"
          : "ri-sun-line";
        // Slide curtain up
        gsap.to(curtain, {
          yPercent: -100,
          duration: 0.5,
          ease: "power2.inOut",
          delay: 0.05,
          onComplete: () => {
            gsap.set(curtain, { display: "none" });
            isAnimating = false;
            themeBtn.disabled = false;
          },
        });
      },
    });
  });

  // GSAP + ScrollTrigger Animations

  // 1. Fade + Slide Up for All Sections
  gsap.utils.toArray("section").forEach((sec) => {
    gsap.from(sec, {
      scrollTrigger: {
        trigger: sec,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power2.out",
    });
  });

  // 2. Hero Section Intro
  gsap.from(".hero-content h1", {
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: "power2.out",
  });
  gsap.from(".hero-content p", {
    opacity: 0,
    y: 30,
    delay: 0.3,
    duration: 1,
    ease: "power2.out",
  });
  gsap.from(".cta-button", {
    opacity: 0,
    scale: 0.9,
    delay: 0.6,
    duration: 0.8,
    ease: "back.out(1.7)",
  });

  // 3. Skills Tags - Staggered Bouncy
  gsap.from(".skill-tag", {
    scrollTrigger: {
      trigger: ".skill-tags",
      start: "top 90%",
    },
    opacity: 0,
    y: 30,
    scale: 0.9,
    stagger: 0.1,
    duration: 0.6,
    ease: "sine.inOut",
  });

  // 4. Floating Visuals
  gsap.utils.toArray(".floating").forEach((el) => {
    gsap.to(el, {
      y: 15,
      repeat: -1,
      yoyo: true,
      duration: 2 + Math.random(),
      ease: "sine.inOut",
    });
  });
});
