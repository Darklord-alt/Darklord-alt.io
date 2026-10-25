/**
 * Dhruvil Soni - Software Development & Systems Technologist Portfolio
 * Aesthetic: Monochrome Stealth / Terminal Ember
 * Controller: Mobile Navigation, ScrollSpy, Project Filtering, and Console Diagnostics
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initScrollSpy();
  initProjectFilters();
  initHeaderScrollState();
  initConsoleDiagnostics();
});

/* --------------------------------------------------------------------------
   1. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isCurrentlyExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !isCurrentlyExpanded;

    toggleBtn.setAttribute('aria-expanded', String(nextState));
    navLinks.classList.toggle('active', nextState);

    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = nextState ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
  });

  // Auto-close menu on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });

  // Auto-close menu when tapping outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    }
  });
}

/* --------------------------------------------------------------------------
   2. ScrollSpy Navigation Tracking
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   3. Interactive Project Filtering (All, Full Stack, AI Agents, .NET, Mobile)
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-filter');

      // Update active button state
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter project cards with snappy transition
      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedFilter === 'all' || cardCategory === selectedFilter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Header Sticky Elevation on Scroll
   -------------------------------------------------------------------------- */
function initHeaderScrollState() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.borderBottomColor = 'rgba(249, 115, 22, 0.25)';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
    } else {
      header.style.borderBottomColor = '#2A2A38';
      header.style.boxShadow = 'none';
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   5. Developer Console High-Signal Diagnostic Message
   -------------------------------------------------------------------------- */
function initConsoleDiagnostics() {
  console.log(
    '%c[SYS_ARCH // PRODUCTION_READY]%c Kernel initialized: Dhruvil Soni Portfolio\n%cPalette: Monochrome Stealth / Terminal Ember (#0A0A0C, #141418, #F97316)\nStatus: 99.9% Uptime | Node: Hamilton, ON',
    'color: #F97316; font-weight: bold; font-family: monospace; font-size: 13px;',
    'color: #FFFFFF; font-family: monospace; font-size: 12px;',
    'color: #71717A; font-family: monospace; font-size: 11px;'
  );
}