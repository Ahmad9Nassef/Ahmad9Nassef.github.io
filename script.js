/* =========================================
   AL-NASSIF WEBSITE — JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===========================
     NAVBAR — scroll effect
  =========================== */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  /* ===========================
     HAMBURGER MENU
  =========================== */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });


  /* ===========================
     SMOOTH SCROLL for all
     anchor links
  =========================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ===========================
     SCROLL REVEAL
  =========================== */
  const revealElements = document.querySelectorAll(
    '.service-card, .portfolio-item, .why-item, .contact-card, .section-header, .visual__card'
  );

  // Add reveal class
  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    const delay = (i % 5);
    if (delay > 0) el.classList.add(`reveal-delay-${delay}`);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => revealObserver.observe(el));


  /* ===========================
     PORTFOLIO FILTER
  =========================== */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        const show = filter === 'all' || category === filter;

        if (show) {
          item.style.opacity    = '1';
          item.style.transform  = 'scale(1)';
          item.style.display    = 'block';
        } else {
          item.style.opacity    = '0';
          item.style.transform  = 'scale(0.95)';
          setTimeout(() => {
            if (btn.getAttribute('data-filter') !== 'all' && item.getAttribute('data-category') !== btn.getAttribute('data-filter')) {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });

  // Add transition style to portfolio items
  portfolioItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });


  /* ===========================
     CONTACT FORM
  =========================== */
  const form        = document.getElementById('contact-form');
  const successMsg  = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = form.querySelector('#name').value.trim();
      const phone   = form.querySelector('#phone').value.trim();
      const service = form.querySelector('#service').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (!name || !phone) {
        alert('الرجاء إدخال الاسم ورقم الهاتف على الأقل.');
        return;
      }

      // Build WhatsApp message
      const whatsappNumber = '00905315402008'; // رقم الشركة بدون + وبدون أصفار
      let text = '';
      text += '🔔 *رسالة جديدة من الموقع*%0A';
      text += '━━━━━━━━━━━━━━━━━━%0A';
      text += '👤 *الاسم:* ' + encodeURIComponent(name) + '%0A';
      text += '📞 *الهاتف:* ' + encodeURIComponent(phone) + '%0A';
      if (service) text += '🔧 *الخدمة:* ' + encodeURIComponent(service) + '%0A';
      if (message) text += '💬 *الرسالة:* ' + encodeURIComponent(message) + '%0A';
      text += '━━━━━━━━━━━━━━━━━━';

      const whatsappURL = 'https://wa.me/' + whatsappNumber + '?text=' + text;

      // Show success message then open WhatsApp
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'جاري الفتح...';

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'إرسال الرسالة';
        successMsg.style.display = 'block';
        setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
        window.open(whatsappURL, '_blank');
      }, 600);
    });
  }

});


/* ===========================
   GLOBAL: Close mobile menu
   (called from onclick)
=========================== */
function closeMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger)  hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
}


/* =========================================
   PORTFOLIO TABS
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels  = document.querySelectorAll('.portfolio__panel');

 tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (target === 'all') {
        panels.forEach(p => p.classList.add('active')); // يعرض كل الأقسام
      } else {
        panels.forEach(p => p.classList.remove('active'));
        const panel = document.querySelector(`.portfolio__panel[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      }
    });
  });

});


/* =========================================
   LIGHTBOX
   ========================================= */
let currentImages = [];
let currentIndex  = 0;

function openLightbox(src, caption) {
  // Collect all images from the active panel
  const activePanel = document.querySelector('.portfolio__panel.active');
  if (activePanel) {
    const imgs = activePanel.querySelectorAll('.portfolio-item img');
    currentImages = Array.from(imgs).map(img => ({
      src: img.src,
      caption: img.closest('.portfolio-item').getAttribute('onclick')
        ? caption : caption
    }));
    currentIndex = currentImages.findIndex(img => img.src.includes(src.split('/').pop()));
    if (currentIndex === -1) currentIndex = 0;
  }

  const lightbox = document.getElementById('lightbox');
  const img      = document.getElementById('lightbox-img');
  const cap      = document.getElementById('lightbox-caption');

  img.src = src;
  cap.textContent = caption + ' — ' + (currentIndex + 1) + ' / ' + currentImages.length;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e.target === document.getElementById('lightbox')) {
    _closeLightbox();
  }
}

function closeLightboxBtn() {
  _closeLightbox();
}

function _closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  if (!currentImages.length) return;
  currentIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
  const item = currentImages[currentIndex];
  const img  = document.getElementById('lightbox-img');
  const cap  = document.getElementById('lightbox-caption');
  img.src = item.src;
  cap.textContent = item.caption + ' — ' + (currentIndex + 1) + ' / ' + currentImages.length;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      _closeLightbox();
  if (e.key === 'ArrowLeft')   lightboxNav(1);
  if (e.key === 'ArrowRight')  lightboxNav(-1);
});
