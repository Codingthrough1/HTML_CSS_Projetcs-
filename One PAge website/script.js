// Lightweight interactions: menu toggle, contact form simulation, set year
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuBtn.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = '';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.gap = '0.5rem';
    }
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 680) navLinks.style.display = '';
    });
  });

  // Contact form fake send
  window.handleSubmit = (ev) => {
    ev.preventDefault();
    const status = document.getElementById('formStatus');
    const btn = ev.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.textContent = '';

    // Simulate network
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send message';
      status.textContent = 'Thanks — your message was sent (simulation).';
      ev.target.reset();
    }, 900);
    return false;
  };

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();
});
