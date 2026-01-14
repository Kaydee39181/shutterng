// Clean password checklist updater for login page
function hasLower(str) { return /[a-z]/.test(str); }
function hasUpper(str) { return /[A-Z]/.test(str); }
function hasNumber(str) { return /\d/.test(str); }
function hasSpecial(str) { return /[^A-Za-z0-9]/.test(str); }
function minLength(str, len = 8) { return str.length >= len; }

const passwordInput = document.getElementById('password');
if (passwordInput) {
    passwordInput.addEventListener('input', () => {
        const value = passwordInput.value || '';
        const low = hasLower(value);
        const up = hasUpper(value);
        const num = hasNumber(value);
        const spec = hasSpecial(value);
        const len = minLength(value);

        const map = {
            lower: low,
            upper: up,
            number: num,
            special: spec,
            length: len
        };

        Object.keys(map).forEach(k => {
            const el = document.getElementById(k);
            if (!el) return;
            el.className = map[k] ? 'valid' : 'invalid';
        });
    });
}
