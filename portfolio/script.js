// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll Progress Indicator
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  // Create or update scroll indicator
  let indicator = document.querySelector(".scroll-indicator");
  if (!indicator) {
    indicator = document.createElement("div");
    indicator.classList.add("scroll-indicator");
    document.body.appendChild(indicator);
  }

  indicator.style.transform = `scaleX(${scrollPercent / 100})`;
});

// Navbar Background Change on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
  }
});

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  setTimeout(type, 500); // Delay before starting
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 80);
  }
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      // Add special animations for specific elements
      if (entry.target.classList.contains("skill-category")) {
        entry.target.style.animationDelay = Math.random() * 0.5 + "s";
        entry.target.classList.add("fade-in");
      }

      if (entry.target.classList.contains("project-card")) {
        const delay =
          Array.from(entry.target.parentNode.children).indexOf(entry.target) *
          0.1;
        entry.target.style.animationDelay = delay + "s";
        entry.target.classList.add("fade-in");
      }

      if (entry.target.classList.contains("stat")) {
        animateCounter(entry.target);
      }
    }
  });
}, observerOptions);

// Observe elements for animations
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".skill-category, .project-card, .stat, .contact-item"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Counter Animation for Stats
function animateCounter(element) {
  const target = element.querySelector("h3");
  if (!target) return;

  const text = target.textContent;
  const number = parseInt(text.replace(/\D/g, ""));
  const suffix = text.replace(/\d/g, "");

  if (isNaN(number)) return;

  let current = 0;
  const increment = number / 30;

  const timer = setInterval(() => {
    current += increment;
    if (current >= number) {
      current = number;
      clearInterval(timer);
    }
    target.textContent = Math.floor(current) + suffix;
  }, 50);
}

// Parallax Effect for Floating Shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll(".shape");

  shapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.2;
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Dynamic Skill Item Hover Effects
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateY(-5px) scale(1.05)";
    item.style.boxShadow = "0 10px 25px rgba(0, 212, 255, 0.3)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0) scale(1)";
    item.style.boxShadow = "none";
  });
});

// Project Card 3D Tilt Effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
  });
});

// Glitch Effect for Hero Title on Click
document.querySelector(".hero-title")?.addEventListener("click", function () {
  this.classList.add("glitch");
  setTimeout(() => {
    this.classList.remove("glitch");
  }, 500);
});

// Add glitch CSS class dynamically
const style = document.createElement("style");
style.textContent = `
    .glitch {
        animation: glitch 0.5s ease-in-out;
    }
    
    @keyframes glitch {
        0% { transform: translateX(0); }
        20% { transform: translateX(-2px) skew(-2deg); }
        40% { transform: translateX(2px) skew(2deg); }
        60% { transform: translateX(-2px) skew(-2deg); }
        80% { transform: translateX(2px) skew(2deg); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(style);

// Contact Form Validation and Animation
const contactButtons = document.querySelectorAll(
  ".contact-item a, .btn-primary, .btn-secondary"
);
contactButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.background = "rgba(0, 212, 255, 0.6)";
    ripple.style.borderRadius = "50%";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    ripple.style.pointerEvents = "none";

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";

    this.style.position = "relative";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Theme Toggle (Optional Enhancement)
function createThemeToggle() {
  const toggleButton = document.createElement("button");
  toggleButton.innerHTML = "🌓";
  toggleButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 212, 255, 0.8);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 20px;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    toggleButton.innerHTML = document.body.classList.contains("light-theme")
      ? "🌙"
      : "🌓";
  });

  document.body.appendChild(toggleButton);
}

// Initialize theme toggle
// createThemeToggle(); // Uncomment to enable theme toggle

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
  // Scroll-based animations here
}, 16);

window.addEventListener("scroll", debouncedScroll);

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.code);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join("") === konamiSequence.join("")) {
    // Easter egg activated!
    document.body.style.animation = "rainbow 2s infinite";
    setTimeout(() => {
      document.body.style.animation = "";
    }, 5000);
    konamiCode = [];
  }
});

// Add rainbow animation
const rainbowStyle = document.createElement("style");
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Lightbox Functionality
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

// Video hover play/pause functionality removed for better user experience

// Close lightbox
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Lightbox navigation event listeners are now in DOMContentLoaded

// Keyboard support for all modals
document.addEventListener("keydown", (e) => {
  // Escape key closes any open modal
  if (e.key === "Escape") {
    if (lightbox.style.display === "block") {
      closeLightbox();
    }
  }

  // Arrow keys for navigation in lightbox
  if (lightbox.style.display === "block") {
    if (e.key === "ArrowLeft" && currentMediaIndex > 0) {
      currentMediaIndex--;
      loadMediaItem(currentMediaIndex);
    } else if (
      e.key === "ArrowRight" &&
      currentMediaIndex < currentMediaList.length - 1
    ) {
      currentMediaIndex++;
      loadMediaItem(currentMediaIndex);
    }
  }
});

function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "auto";

  // Stop any playing videos
  lightboxVideo.pause();
  lightboxVideo.src = "";

  // Reset media state
  currentMediaList = [];
  currentMediaIndex = 0;
}

// Image Lazy Loading Enhancement
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.src; // Trigger loading if not already loaded
      img.classList.add("loaded");
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
  imageObserver.observe(img);
});

// Complete media library for all projects
const projectMedia = {
  "Unproject - VR Design Tool": [
    {
      src: "../assets/images/projects/Unproject.png",
      type: "image",
      name: "VR Design Tool Interface",
    },
    {
      src: "../assets/videos/Unproject.mp4",
      type: "video",
      name: "VR Design Demo",
    },
  ],
  "Oneroot Android Apps": [
    {
      src: "../assets/images/projects/Oneroot.png",
      type: "image",
      name: "Android Apps Screenshot",
    },
  ],
  "BlackBox Development": [
    {
      src: "../assets/images/projects/Blackbox.png",
      type: "image",
      name: "BlackBox Website",
    },
  ],
  "Woo Plugin Wizard": [
    {
      src: "../assets/images/projects/WooPlugin.png",
      type: "image",
      name: "Plugin Generator Interface",
    },
  ],
  "Drypto UI Animations": [
    {
      src: "../assets/videos/Drypto_animation.mp4",
      type: "video",
      name: "UI Animation Demo",
    },
  ],
  "Practice Range VR": [
    {
      src: "../assets/images/projects/PracticeRange.png",
      type: "image",
      name: "Practice Range Screenshot",
    },
    {
      src: "../assets/videos/VR_GunReload.mp4",
      type: "video",
      name: "Gun Reload Demo",
    },
    {
      src: "../assets/videos/VR_GunShoot.mp4",
      type: "video",
      name: "Gun Shooting Demo",
    },
  ],
  "Run Across": [
    {
      src: "../assets/images/projects/RunAcross.jpg",
      type: "image",
      name: "3D Platformer Screenshot",
    },
  ],
  "Lost In The Woods": [
    {
      src: "../assets/videos/CarCrash.mp4",
      type: "video",
      name: "Gaze Detection Demo",
    },
  ],
  "HireBuddy Job Board": [
    {
      src: "../assets/images/projects/Hirebuddy.png",
      type: "image",
      name: "HireBuddy Job Board Interface",
    },
  ],
};

let currentMediaIndex = 0;
let currentMediaList = [];
let currentProjectTitle = "";

// Lightbox elements - initialize after DOM loads
let lightboxTitle,
  lightboxNavigation,
  lightboxPrevBtn,
  lightboxNextBtn,
  lightboxCounter,
  lightboxVideo,
  mediaTypeIndicator;

// Project Card Click Handlers
const projectLinks = {
  "#unproject-link": "https://www.unproject.ai",
  "#oneroot-marketplace":
    "https://play.google.com/store/apps/details?id=enp.oneroot.marketplace&hl=en_IN",
  "#blackbox-website": "https://blackbox-bixa.vercel.app",
  "#woo-plugin-wizard": "https://woocomerce-gemini.vercel.app",
  "#hirebuddy-job-board": "https://hirebuddy-job-board.vercel.app",
};

// Check if project card has video
function hasVideo(card) {
  return card.querySelector(".project-video") !== null;
}

// Open unified media viewer (replaces both lightbox and video player for image area clicks)
function openMediaViewer(projectTitle, startIndex = 0) {
  const mediaList = projectMedia[projectTitle];
  if (!mediaList || mediaList.length === 0) {
    console.log("No media found for project:", projectTitle);
    return;
  }

  console.log(
    "Opening media viewer for:",
    projectTitle,
    "with",
    mediaList.length,
    "items"
  );

  currentMediaList = mediaList;
  currentProjectTitle = projectTitle;
  currentMediaIndex = startIndex;

  // Ensure elements are initialized
  if (!lightboxTitle || !lightboxNavigation) {
    console.error("Lightbox elements not initialized");
    return;
  }

  lightboxTitle.textContent = projectTitle;

  // Show navigation if multiple media items
  if (mediaList.length > 1) {
    lightboxNavigation.style.display = "flex";
    lightboxCounter.textContent = `${startIndex + 1} / ${mediaList.length}`;
    console.log("Navigation enabled:", mediaList.length, "items");
  } else {
    lightboxNavigation.style.display = "none";
    console.log("Navigation disabled: single item");
  }

  loadMediaItem(startIndex);

  lightbox.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Load specific media item
function loadMediaItem(index) {
  const media = currentMediaList[index];
  if (!media) {
    console.error("No media at index:", index);
    return;
  }

  console.log("Loading media item:", index, media);

  lightboxCaption.textContent = media.name;
  if (mediaTypeIndicator) {
    mediaTypeIndicator.textContent = media.type.toUpperCase();
  }

  // Update navigation buttons
  if (lightboxPrevBtn && lightboxNextBtn) {
    lightboxPrevBtn.disabled = index === 0;
    lightboxNextBtn.disabled = index === currentMediaList.length - 1;
    console.log(
      "Navigation buttons updated. Prev disabled:",
      lightboxPrevBtn.disabled,
      "Next disabled:",
      lightboxNextBtn.disabled
    );
  }

  if (media.type === "image") {
    // Show image, hide video
    lightboxImage.src = media.src;
    lightboxImage.style.display = "block";
    if (lightboxVideo) {
      lightboxVideo.style.display = "none";
      lightboxVideo.pause();
    }
    console.log("Showing image:", media.src);
  } else if (media.type === "video") {
    // Show video, hide image
    if (lightboxVideo) {
      lightboxVideo.src = media.src;
      lightboxVideo.style.display = "block";
      lightboxVideo.play().catch((e) => console.log("Autoplay prevented:", e));
    }
    lightboxImage.style.display = "none";
    console.log("Showing video:", media.src);
  }

  // Update counter
  if (currentMediaList.length > 1 && lightboxCounter) {
    lightboxCounter.textContent = `${index + 1} / ${currentMediaList.length}`;
  }
}

// Add click handlers to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  // Handle clicking on the image area
  const imageArea = card.querySelector(".project-image");
  if (imageArea) {
    imageArea.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent card click

      const cardTitle = card.querySelector("h3").textContent;

      // Use unified media viewer for all projects
      openMediaViewer(cardTitle, 0);
    });
  }

  // Handle clicking on the rest of the card (opens website)
  card.addEventListener("click", (e) => {
    // Don't trigger if clicking on image area or overlay
    if (
      e.target.closest(".project-image") ||
      e.target.closest(".project-overlay")
    ) {
      return;
    }

    // Open website
    const url = card.getAttribute("data-url");
    const actualUrl = projectLinks[url];
    const cardTitle = card.querySelector("h3").textContent;

    if (actualUrl && actualUrl !== url) {
      window.open(actualUrl, "_blank");
    } else {
      alert(`${cardTitle}\n\nPreview unavailable. Please try again later.`);
    }
  });

  // Add visual feedback
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 25px 50px rgba(0, 212, 255, 0.2)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "";
  });
});

// Initialize all animations when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Karan Gupta Portfolio Loaded Successfully!");

  // Initialize lightbox elements
  lightboxTitle = document.querySelector(".lightbox-title");
  lightboxNavigation = document.querySelector(".lightbox-navigation");
  lightboxPrevBtn = document.querySelector(".lightbox-prev-btn");
  lightboxNextBtn = document.querySelector(".lightbox-next-btn");
  lightboxCounter = document.querySelector(".lightbox-counter");
  lightboxVideo = document.querySelector(".lightbox-video");
  mediaTypeIndicator = document.querySelector(".media-type-indicator");

  // Add lightbox navigation event listeners
  if (lightboxPrevBtn && lightboxNextBtn) {
    lightboxPrevBtn.addEventListener("click", () => {
      if (currentMediaIndex > 0) {
        currentMediaIndex--;
        loadMediaItem(currentMediaIndex);
      }
    });

    lightboxNextBtn.addEventListener("click", () => {
      if (currentMediaIndex < currentMediaList.length - 1) {
        currentMediaIndex++;
        loadMediaItem(currentMediaIndex);
      }
    });
  }

  // Add loading animation
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
