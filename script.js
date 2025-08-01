// ===== GLOBAL VARIABLES =====
const header = document.getElementById("header");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const scrollTopBtn = document.getElementById("scroll-top");
const contactForm = document.getElementById("contact-form");

// ===== NAVIGATION FUNCTIONALITY =====

// Mobile menu toggle
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ===== SCROLL EFFECTS =====

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Show/hide scroll to top button
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }

  // Update active navigation link
  updateActiveNavLink();
});

// ===== ACTIVE NAVIGATION LINK =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.id;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ===== FORM VALIDATION AND SUBMISSION =====
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form elements
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const submitBtn = this.querySelector('button[type="submit"]');

  // Clear previous errors
  clearFormErrors();

  let isValid = true;

  // Validate name
  if (!name.value.trim()) {
    showFormError("name", "Please enter your name");
    isValid = false;
  }

  // Validate email
  if (!email.value.trim()) {
    showFormError("email", "Please enter your email address");
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showFormError("email", "Please enter a valid email address");
    isValid = false;
  }

  // Validate message
  if (!message.value.trim()) {
    showFormError("message", "Please enter your message");
    isValid = false;
  } else if (message.value.trim().length < 10) {
    showFormError(
      "message",
      "Please enter a more detailed message (minimum 10 characters)"
    );
    isValid = false;
  }

  // If form is valid, simulate submission
  if (isValid) {
    // Show loading state
    submitBtn.classList.add("loading");
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate API call
    fetch("https://script.google.com/macros/s/AKfycbxGrAEufgn3paZKM051EpndZRYNCj-nQ1RIRpiyRRDKUrG4tfBMFpFPZSVzOSLbrftU/exec", {
      method: "POST",
      mode: "no-cors", // Required to avoid CORS errors
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    })
      .then(() => {
        // Reset button
        submitBtn.classList.remove("loading");
        submitBtn.textContent = "Send Secure Message";
        submitBtn.disabled = false;

        // Show success message
        document.getElementById("form-success").style.display = "block";
        contactForm.reset();

        setTimeout(() => {
          document.getElementById("form-success").style.display = "none";
        }, 5000);
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        submitBtn.classList.remove("loading");
        submitBtn.textContent = "Send Secure Message";
        submitBtn.disabled = false;
        alert("Something went wrong. Please try again later.");
      });
  }
});

// ===== FORM HELPER FUNCTIONS =====
function showFormError(fieldName, message) {
  const errorElement = document.getElementById(`${fieldName}-error`);
  const inputElement = document.getElementById(fieldName);

  errorElement.textContent = message;
  errorElement.style.display = "block";
  inputElement.style.borderColor = "#FF6B6B";
}

function clearFormErrors() {
  const errorElements = document.querySelectorAll(".form-error");
  const inputElements = document.querySelectorAll(
    ".form-input, .form-textarea"
  );

  errorElements.forEach((error) => {
    error.style.display = "none";
  });

  inputElements.forEach((input) => {
    input.style.borderColor = "rgba(255, 255, 255, 0.1)";
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===== SCROLL ANIMATIONS =====

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".feature-card, .blog-card, .about-text, .contact-info"
  );
  animateElements.forEach((el) => observer.observe(el));
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Debounce scroll events
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

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }

  updateActiveNavLink();
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation for mobile menu
navToggle.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    navToggle.click();
  }
});

// Focus management for mobile menu
navMenu.addEventListener("transitionend", () => {
  if (navMenu.classList.contains("active")) {
    const firstLink = navMenu.querySelector(".nav-link");
    if (firstLink) firstLink.focus();
  }
});

// ===== DEMO FUNCTIONALITY =====

// Handle demo button clicks
document.querySelectorAll('a[href="#demo"]').forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // Create a simple modal for demo
    const modal = document.createElement("div");
    modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                `;

    modal.innerHTML = `
                    <div style="
                        background: var(--secondary-bg);
                        padding: 2rem;
                        border-radius: var(--radius-lg);
                        text-align: center;
                        max-width: 500px;
                        margin: 1rem;
                        position: relative;
                    ">
                        <button style="
                            position: absolute;
                            top: 1rem;
                            right: 1rem;
                            background: none;
                            border: none;
                            color: var(--primary-text);
                            font-size: 1.5rem;
                            cursor: pointer;
                        " onclick="this.closest('[style*=fixed]').remove()">×</button>
                        <h3 style="color: var(--primary-accent); margin-bottom: 1rem; font-family: var(--font-primary);">
                            🚀 Demo Request
                        </h3>
                        <p style="color: var(--secondary-text); margin-bottom: 1.5rem;">
                            Sorry, this feature is currently unavailable...
                        </p>
                        <button class="btn btn-primary" onclick="this.closest('[style*=fixed]').remove()">
                            Got it!
                        </button>
                    </div>
                `;

    document.body.appendChild(modal);

    // Close modal on background click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    // Close modal on escape key
    const escapeHandler = (e) => {
      if (e.key === "Escape") {
        modal.remove();
        document.removeEventListener("keydown", escapeHandler);
      }
    };
    document.addEventListener("keydown", escapeHandler);
  });
});

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  // Initial active nav link setup
  updateActiveNavLink();

  // Add loading complete class to body
  document.body.classList.add("loaded");

  console.log("🔒 RudraVault website loaded successfully");
  console.log("🛡️ Elite security features activated");
});

// ===== ERROR HANDLING =====
window.addEventListener("error", (e) => {
  console.error("RudraVault Error:", e.error);
});

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment the following lines if you have a service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered'))
    //     .catch(registrationError => console.log('SW registration failed'));
  });
}
