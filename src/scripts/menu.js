/**
 * Mobile hamburger menu toggle — vanilla JavaScript
 * TejadosReformas Burgos
 *
 * - Toggles .is-active on .nav-menu
 * - Toggles .is-open on .nav-toggle
 * - Closes menu on link click or outside click
 * - Prevents body scroll when menu is open
 */

(function () {
  'use strict';

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];
  const body = document.body;

  if (!navToggle || !navMenu) return;

  /**
   * Open the mobile menu
   */
  function openMenu() {
    navMenu.classList.add('is-active');
    navToggle.classList.add('is-open');
    body.classList.add('is-menu-open');
  }

  /**
   * Close the mobile menu
   */
  function closeMenu() {
    navMenu.classList.remove('is-active');
    navToggle.classList.remove('is-open');
    body.classList.remove('is-menu-open');
  }

  /**
   * Toggle menu open/closed
   */
  function toggleMenu() {
    const isActive = navMenu.classList.contains('is-active');
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // --- Event Listeners ---

  // Toggle button click
  navToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when a nav link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!navMenu.classList.contains('is-active')) return;

    const isToggleClick = navToggle.contains(e.target);
    const isMenuClick = navMenu.contains(e.target);

    if (!isToggleClick && !isMenuClick) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
      closeMenu();
    }
  });

  // Re-evaluate on resize (in case responsive CSS hides/shows the toggle)
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // If menu is open and we're on desktop, close it
      if (window.innerWidth >= 768 && navMenu.classList.contains('is-active')) {
        closeMenu();
      }
    }, 150);
  });
})();
