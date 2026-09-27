/* Go With The Flow Barbershop — site behaviour.
   Deliberately tiny: no libraries, no analytics, no cookies, no network calls
   except the contact form submit you configure below. */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONTACT FORM
     Paste your Formspree endpoint here to turn the form on, e.g.
       var FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
     Leave it empty and the form politely says it is not connected yet
     instead of pretending to send.

     IMPORTANT: index.html sets a Content-Security-Policy with
     `connect-src 'self'`. When you paste an endpoint here you must also add
     its origin to that directive (e.g. `connect-src 'self' https://formspree.io`)
     or the browser will block the request and the form will fail silently.
     ------------------------------------------------------------------ */
  var FORM_ENDPOINT = '';

  /* ---------------- Mobile nav ---------------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var reveals = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(reveals, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  }

  /* ---------------- Footer year ---------------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------------- Contact form ---------------- */
  var form = document.querySelector('.contact-form');
  if (!form) return;

  var status = form.querySelector('.form-status');

  function say(message, kind) {
    status.textContent = message;
    status.className = 'form-status' + (kind ? ' is-' + kind : '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot: a real visitor never sees this field, so anything in it is a bot.
    if (form.company && form.company.value) return;

    if (!form.name.value.trim() || !form.email.value.trim() || !form.message.value.trim()) {
      say('Please fill in your name, email and message.', 'error');
      return;
    }

    if (!FORM_ENDPOINT) {
      say('This form is not connected yet — please call 206-555-0100 in the meantime.', 'error');
      return;
    }

    var button = form.querySelector('button[type=submit]');
    button.disabled = true;
    say('Sending…');

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        form.reset();
        say('Thanks — we will get back to you shortly.', 'ok');
      })
      .catch(function () {
        say('Something went wrong. Please call 206-555-0100 instead.', 'error');
      })
      .then(function () {
        button.disabled = false;
      });
  });
})();
