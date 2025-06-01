document.addEventListener("DOMContentLoaded", () => {
  // === Theme Toggle ===
  const toggleButton = document.getElementById("theme-toggle");
  const icon = toggleButton.querySelector("i");
  const root = document.documentElement;
  const avatar = document.querySelector(".avatar");
  const about = document.querySelector(".about");

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    icon.className = theme === "dark" ? "ri-sun-line" : "ri-moon-line";
  }

  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme === "dark" ? "dark" : "light";
  setTheme(initialTheme);

  toggleButton.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  });

  // === Scroll Effects: Avatar Slide & About Section Activation ===
  window.addEventListener("scroll", () => {
    if (window.scrollY > 150) {
      avatar.classList.add("slide-left");
      about.classList.add("active");
    } else {
      avatar.classList.remove("slide-left");
      about.classList.remove("active");
    }
  });

  // === GSAP Registration ===
  gsap.registerPlugin(ScrollTrigger);

  // === Intro Animation ===
  const tl = gsap.timeline();

  tl.from("#leftSide", {
    x: "-100%",
    duration: 1.6,
    ease: "power3.out",
  })
    .from(
      "#rightSide",
      {
        x: "100%",
        duration: 1.6,
        ease: "power3.out",
      },
      "-=1.4"
    )
    .from(
      ".avatar",
      {
        scale: 0.85,
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
      },
      "-=1.2"
    )
    .from(
      ".left-text",
      {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      "-=1.1"
    )
    .from(
      ".right-text",
      {
        x: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      "-=1.0"
    );

  // === About Card Animation on Scroll ===
  gsap.to(".about-card", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#about",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  // === About Fade Effect ===
  ScrollTrigger.create({
    trigger: "#about",
    start: "top 70%",
    onEnter: () => gsap.to(".main", { autoAlpha: 0, duration: 0.6 }),
    onLeaveBack: () => gsap.to(".main", { autoAlpha: 1, duration: 0.6 }),
  });

  // === Timeline Animation (Dot Fill) ===
  const timelineFill = document.querySelector(".timeline-fill");
  const dots = document.querySelectorAll(".timeline-dot");
  const lines = document.querySelectorAll(".line-segment");
  let currentIndex = 0;

  function activateNext() {
    if (currentIndex >= dots.length) return;

    dots[currentIndex].classList.add("active");

    if (currentIndex < lines.length) {
      lines[currentIndex].classList.add("active");
    }

    if (timelineFill) {
      const totalDots = dots.length;
      const percentPerDot = 100 / (totalDots - 1);
      let fillPercent = currentIndex * percentPerDot;
      if (currentIndex === totalDots - 1) fillPercent = 100;
      timelineFill.style.width = `${fillPercent}%`;
    }

    currentIndex++;
    setTimeout(activateNext, 1500);
  }

  function checkTimelineScroll() {
    const timeline = document.querySelector(".timeline-container");
    if (!timeline) return;
    const rect = timeline.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
      activateNext();
      window.removeEventListener("scroll", checkTimelineScroll);
    }
  }

  window.addEventListener("scroll", checkTimelineScroll);
  checkTimelineScroll();

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".cards-container", {
    xPercent: -50,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: ".scroll-section",
      start: "top top",
      end: "+=100%",
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
  });

  // === Experience Section Items Fade In ===
  gsap.utils.toArray(".experience-item").forEach((item) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });
});
