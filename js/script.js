/**
 * Dark Bento Systems & Engineering Workbench Interaction Engine
 * Siddhesh Bhoir Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initCardMouseTracking();
  initTechnicalArsenalFilters();
  initEmailCopyMechanisms();
});

/**
 * 1. Interactive Mouse-Tracking Card Border Spotlight
 * Dynamically computes cursor coordinates relative to each card for subtle radial gradient illumination.
 */
function initCardMouseTracking() {
  const cards = document.querySelectorAll('.bento-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      // Gracefully move spotlight out of bounds
      card.style.setProperty('--mouse-x', '-9999px');
      card.style.setProperty('--mouse-y', '-9999px');
    });
  });
}

/**
 * 2. Technical Arsenal Filter Tabs
 * Filters skill cards dynamically without DOM recreation or layout disruption.
 */
function initTechnicalArsenalFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const skillTiles = document.querySelectorAll('.skill-tile');

  if (!tabs.length || !skillTiles.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Toggle active states on tabs
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.getAttribute('data-filter');

      skillTiles.forEach((tile) => {
        const itemCategory = tile.getAttribute('data-category');

        if (filterCategory === 'all' || itemCategory === filterCategory) {
          tile.classList.remove('is-hidden');
          // Smooth fade-in
          tile.style.opacity = '0';
          tile.style.transform = 'translateY(6px)';
          setTimeout(() => {
            tile.style.opacity = '1';
            tile.style.transform = 'translateY(0)';
          }, 30);
        } else {
          tile.classList.add('is-hidden');
        }
      });
    });
  });
}

/**
 * 3. Clipboard Management & Instant Feedback Toast
 * Handles copying the developer's email from multiple triggers with fallback support.
 */
function initEmailCopyMechanisms() {
  const TARGET_EMAIL = 'siddheshbhoir.kc@gmail.com';
  const heroCopyBtn = document.getElementById('copy-email-hero-btn');
  const footerCopyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');

  let toastTimeout = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  async function handleEmailCopy(buttonElement) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(TARGET_EMAIL);
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = TARGET_EMAIL;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      showToast(`Copied to clipboard: ${TARGET_EMAIL}`);

      // Visual feedback on the button itself if it possesses a copy-badge
      const badge = buttonElement.querySelector('.copy-badge');
      if (badge) {
        const originalText = badge.textContent;
        badge.textContent = 'Copied!';
        badge.style.color = '#10b981';

        setTimeout(() => {
          badge.textContent = originalText;
          badge.style.color = '';
        }, 2200);
      }
    } catch (err) {
      showToast(`Copy failed. Email: ${TARGET_EMAIL}`);
    }
  }

  if (heroCopyBtn) {
    heroCopyBtn.addEventListener('click', () => handleEmailCopy(heroCopyBtn));
  }

  if (footerCopyBtn) {
    footerCopyBtn.addEventListener('click', () => handleEmailCopy(footerCopyBtn));
  }
}