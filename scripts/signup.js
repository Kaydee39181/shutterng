// Enhanced signup validation script
// - Validates email, optional phone, password strength and confirmation
// - Updates password requirement UI in real-time
// - Provides accessible messaging and redirects on success

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const message = document.getElementById('message');
    if (!form) return; // nothing to do

    // Password rule nodes from the markup
    const ruleNodes = {
        lower: document.getElementById('lower'),
        upper: document.getElementById('upper'),
        number: document.getElementById('number'),
        special: document.getElementById('special'),
        length: document.getElementById('length')
    };

    // Inputs
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirmpassword');

    // make message accessible
    if (message) {
        message.setAttribute('role', 'status');
        message.setAttribute('aria-live', 'polite');
    }

    // helper: show message
    function showMessage(text, ok = false) {
        if (!message) return;
        message.textContent = text;
        message.style.color = ok ? 'green' : 'red';
    }

    // simple, permissive email regex (keeps UX friendly)
    function isValidEmail(email) {
        if (!email) return false;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.trim());
    }

    // phone validation: optional, but if provided must have at least 7 digits
    function isValidPhone(phone) {
        if (!phone) return true; // optional
        const digits = phone.replace(/[^0-9]/g, '');
        return digits.length >= 7 && digits.length <= 15;
    }

    // password strength checks
    function getPasswordChecks(pw) {
        return {
            lower: /[a-z]/.test(pw),
            upper: /[A-Z]/.test(pw),
            number: /[0-9]/.test(pw),
            special: /[^A-Za-z0-9]/.test(pw),
            length: pw.length >= 8
        };
    }

    // update rule UI nodes
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

    // run live updates as the user types password
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            updateRuleUI(e.target.value);
        });
    }

    // optional: check confirm password as user types
    if (confirmInput && passwordInput) {
        confirmInput.addEventListener('input', () => {
            if (confirmInput.value && passwordInput.value !== confirmInput.value) {
                showMessage('Passwords do not match', false);
            } else if (confirmInput.value) {
                showMessage('', true);
            }
        });
    }

    // central validation function used by both submit handler and global validate()
    function validateAndMaybeSubmit(event) {
        if (event && event.preventDefault) event.preventDefault();

        const email = emailInput ? emailInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const pw = passwordInput ? passwordInput.value : '';
        const cpw = confirmInput ? confirmInput.value : '';

        if (!email) {
            showMessage('Please provide an email address', false);
            emailInput && emailInput.focus();
            return false;
        }

        if (!isValidEmail(email)) {
            showMessage('Please provide a valid email address', false);
            emailInput && emailInput.focus();
            return false;
        }

        if (!isValidPhone(phone)) {
            showMessage('Please provide a valid phone number (at least 7 digits)', false);
            phoneInput && phoneInput.focus();
            return false;
        }

        const checks = getPasswordChecks(pw);
        const allPass = Object.values(checks).every(Boolean);
        if (!allPass) {
            showMessage('Weak password! Use uppercase, lowercase, number, special character and at least 8 characters.', false);
            passwordInput && passwordInput.focus();
            updateRuleUI(pw);
            return false;
        }

        if (pw !== cpw) {
            showMessage('Passwords do not match', false);
            confirmInput && confirmInput.focus();
            return false;
        }

        // all good
        showMessage('Account Created. Redirecting...', true);

        // small UX delay before redirect
        setTimeout(() => {
            window.location.href = '/camerastore/index.html';
        }, 1200);

        return true;
    }

    // submit handler
    form.addEventListener('submit', validateAndMaybeSubmit);

    // expose a global validate() function so the existing onclick="validate()" in HTML still works
    window.validate = function () {
        // try to run the same validation routine. If the routine returns true we can call form.requestSubmit()
        const ok = validateAndMaybeSubmit();
        // If validation succeeded, ensure the form doesn't get blocked by our preventDefault: simulate submission by redirect
        // (We already redirect on success above.)
        return ok;
    };

});
