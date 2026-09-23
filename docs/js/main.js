/*
 * Inner City Club Football — site interactions.
 * Accessible disclosure pattern (WAI-ARIA APG) shared by the mobile nav
 * toggle, the "About" dropdown, and the COVID-19 accordion.
 */
(function () {
  'use strict';

  document.documentElement.classList.add('has-js');

  function setDisclosureState(button, panel, open) {
    button.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  }

  function initDisclosures() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-disclosure]'));

    buttons.forEach(function (button) {
      var panel = document.getElementById(button.getAttribute('aria-controls'));
      if (!panel) return;

      if (!button.hasAttribute('data-default-open')) {
        setDisclosureState(button, panel, false);
      }

      button.addEventListener('click', function () {
        var willOpen = button.getAttribute('aria-expanded') !== 'true';

        var group = button.getAttribute('data-group');
        if (group) {
          buttons.forEach(function (other) {
            if (other !== button && other.getAttribute('data-group') === group) {
              var otherPanel = document.getElementById(other.getAttribute('aria-controls'));
              if (otherPanel) setDisclosureState(other, otherPanel, false);
            }
          });
        }

        setDisclosureState(button, panel, willOpen);
      });
    });

    // Escape closes any open dropdown/menu and returns focus to its trigger.
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      buttons.forEach(function (button) {
        if (button.hasAttribute('data-dropdown') && button.getAttribute('aria-expanded') === 'true') {
          var panel = document.getElementById(button.getAttribute('aria-controls'));
          if (panel) setDisclosureState(button, panel, false);
          button.focus();
        }
      });
    });

    // Clicking outside a dropdown closes it.
    document.addEventListener('click', function (event) {
      buttons.forEach(function (button) {
        if (!button.hasAttribute('data-dropdown')) return;
        if (button.getAttribute('aria-expanded') !== 'true') return;
        var container = button.closest('[data-dropdown-container]') || button.parentElement;
        if (container && !container.contains(event.target)) {
          var panel = document.getElementById(button.getAttribute('aria-controls'));
          if (panel) setDisclosureState(button, panel, false);
        }
      });
    });
  }

  // Close the mobile menu after a nav link is activated, and reset menu
  // state when the viewport crosses the desktop breakpoint.
  function initNavBehaviour() {
    var navToggle = document.querySelector('.nav-toggle[data-disclosure]');
    var navPanel = navToggle && document.getElementById(navToggle.getAttribute('aria-controls'));
    if (!navToggle || !navPanel) return;

    navPanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.matchMedia('(max-width: 899.98px)').matches) {
          setDisclosureState(navToggle, navPanel, false);
        }
      });
    });

    var desktopQuery = window.matchMedia('(min-width: 900px)');
    var handleChange = function (event) {
      if (event.matches) setDisclosureState(navToggle, navPanel, false);
    };
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', handleChange);
    } else if (desktopQuery.addListener) {
      desktopQuery.addListener(handleChange);
    }
  }

  // Accessible tabs (WAI-ARIA APG pattern) — used by the achievements timeline.
  function initTabLists() {
    document.querySelectorAll('[role="tablist"]').forEach(function (tablist) {
      var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
      if (!tabs.length) return;

      function selectTab(tab, focusTab) {
        tabs.forEach(function (t) {
          var selected = t === tab;
          t.setAttribute('aria-selected', String(selected));
          t.tabIndex = selected ? 0 : -1;
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !selected;
        });
        if (focusTab) tab.focus();
      }

      tabs.forEach(function (tab, index) {
        tab.addEventListener('click', function () {
          selectTab(tab, false);
        });

        tab.addEventListener('keydown', function (event) {
          var newIndex = null;
          if (event.key === 'ArrowRight') newIndex = (index + 1) % tabs.length;
          else if (event.key === 'ArrowLeft') newIndex = (index - 1 + tabs.length) % tabs.length;
          else if (event.key === 'Home') newIndex = 0;
          else if (event.key === 'End') newIndex = tabs.length - 1;

          if (newIndex !== null) {
            event.preventDefault();
            selectTab(tabs[newIndex], true);
          }
        });
      });
    });
  }

  // Submits the Contact Us form to the underlying Google Form's response
  // endpoint, so visitors get a native in-page form instead of the embedded
  // Google UI, while responses still land in the same place.
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var status = document.getElementById('contact-form-status');
    var submitButton = form.querySelector('button[type="submit"]');
    var actionUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeE4MSg2lSnxa2ZHyjmSF9xG2j0AFn9buNWlWP-M8gpgTttBQ/formResponse';
    var fieldMap = {
      fullname: 'entry.1905465433',
      email: 'entry.2003528403',
      message: 'entry.1945490493'
    };

    function setStatus(text, variant) {
      status.textContent = text;
      status.className = 'contact-form__status' + (variant ? ' contact-form__status--' + variant : '');
      status.focus();
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var params = new URLSearchParams();
      Object.keys(fieldMap).forEach(function (name) {
        params.append(fieldMap[name], form.elements[name].value);
      });

      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';

      fetch(actionUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      }).then(function () {
        form.hidden = true;
        setStatus('Thanks — your message has been sent. We’ll get back to you soon.', 'success');
      }).catch(function () {
        submitButton.disabled = false;
        submitButton.textContent = 'Send message';
        setStatus('Sorry, something went wrong sending your message. Please email us directly instead.', 'error');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initDisclosures();
    initNavBehaviour();
    initTabLists();
    initContactForm();
  });
})();
