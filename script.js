// script.js - with backend form submission + testimonial slider + UI actions

document.addEventListener('DOMContentLoaded', function () {

  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  navToggle?.addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('open');
    if (nav.classList.contains('open')) {
      document.querySelectorAll('.nav a').forEach(a => a.style.display = 'inline-block');
    } else {
      document.querySelectorAll('.nav a').forEach(a => a.style.display = '');
    }
  });

  // -----------------------------
  // ✅ Testimonial Carousel (Vanilla JS)
  // -----------------------------
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  let index = 0;

  const moveToSlide = (i) => {
    track.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[i].classList.add('active');
  };

  // Auto-slide every 5s
  let autoSlide = setInterval(() => {
    index = (index + 1) % slides.length;
    moveToSlide(index);
  }, 5000);

  // Click on dots to change slide
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      moveToSlide(i);
      clearInterval(autoSlide);
      autoSlide = setInterval(() => {
        index = (index + 1) % slides.length;
        moveToSlide(index);
      }, 5000);
    });
  });

  // -----------------------------
  // ✅ Contact Form → Send to Backend API
  // -----------------------------
  const form = document.getElementById('enrollForm');
  const formMsg = document.getElementById('form-msg');

  form?.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    formMsg.textContent = "Submitting...";
    formMsg.style.color = "#555";

    fetch("http://localhost:5000/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        form.reset();
        formMsg.textContent = "✅ Submitted successfully! We will contact you soon.";
        formMsg.style.color = "green";
      })
      .catch(() => {
        formMsg.textContent = "❌ Could not submit. Make sure backend is running.";
        formMsg.style.color = "red";
      });
  });

  // -----------------------------
  // ✅ "Contact for Fee" Buttons → Open WhatsApp Pre-Filled
  // -----------------------------
  document.querySelectorAll('.js-contact').forEach(btn => {
    btn.addEventListener('click', () => {
      const course = btn.getAttribute('data-course') || 'Course';
      const msg = encodeURIComponent(`Hi ThinkPlus, I want fee details and enrollment information for ${course}.`);
      window.open(`https://wa.me/919999999999?text=${msg}`, '_blank');
    });
  });

});
