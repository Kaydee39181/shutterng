// Login validation script
// - Validates email and password presence
// - Updates password requirement UI in real-time (same rules as signup)
// - Shows messages in #message and redirects on success

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const message = document.getElementById('message');
  if (!form) return;

  const ruleNodes = {
    lower: document.getElementById('lower'),
    upper: document.getElementById('upper'),
    number: document.getElementById('number'),
    special: document.getElementById('special'),
    length: document.getElementById('length')
  };

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (message) {
    message.setAttribute('role', 'status');
    message.setAttribute('aria-live', 'polite');
  }

  function showMessage(text, ok = false) {
    if (!message) return;
    message.textContent = text;
    message.style.color = ok ? 'green' : 'red';
  }

  function getPasswordChecks(pw) {
    return {
      lower: /[a-z]/.test(pw),
      upper: /[A-Z]/.test(pw),
      number: /[0-9]/.test(pw),
      special: /[^A-Za-z0-9]/.test(pw),
      length: pw.length >= 8
    };
  }

  function updateRuleUI(pw) {
    if (!ruleNodes.lower) return;
    const checks = getPasswordChecks(pw);
    Object.keys(checks).forEach(k => {
      const node = ruleNodes[k];
      if (!node) return;
      if (checks[k]) {
        node.classList.remove('invalid');
        node.classList.add('valid');
      } else {
        node.classList.remove('valid');
        node.classList.add('invalid');
      }
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('input', (e) => {
      updateRuleUI(e.target.value);
    });
  }

  function validateAndMaybeSubmit(event) {
    if (event && event.preventDefault) event.preventDefault();

    const email = emailInput ? emailInput.value.trim() : '';
    const pw = passwordInput ? passwordInput.value : '';

    if (!email) {
      showMessage('Please enter your email', false);
      emailInput && emailInput.focus();
      return false;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      showMessage('Please enter a valid email', false);
      emailInput && emailInput.focus();
      return false;
    }

    if (!pw) {
      showMessage('Please enter your password', false);
      passwordInput && passwordInput.focus();
      return false;
    }

    // optional: require same strength as signup for login too
    const checks = getPasswordChecks(pw);
    const allPass = Object.values(checks).every(Boolean);
    if (!allPass) {
      showMessage('Password does not meet requirements', false);
      passwordInput && passwordInput.focus();
      updateRuleUI(pw);
      return false;
    }

    showMessage('Login successful. Redirecting...', true);
    setTimeout(() => window.location.href = 'camerastore/index.html', 1000);
    return true;
  }

  form.addEventListener('submit', validateAndMaybeSubmit);

  // expose for compatibility
  window.validateLogin = function() {
    return validateAndMaybeSubmit();
  };

});
