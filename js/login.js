document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');

    resetValidation();

    let isValid = true;

    if (!email.value.trim() || !isValidEmail(email.value)) {
        setInvalid(email);
        isValid = false;
    }

    if (!password.value.trim()) {
        setInvalid(password);
        isValid = false;
    }

    if (isValid) {
        const successMessage = document.querySelector('.success-message');
        successMessage.style.display = 'block';

        // Guardar email en localStorage para usarlo en la página de inicio
        localStorage.setItem('userEmail', email.value);

        // Redireccionar después de 2 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setInvalid(element) {
    element.classList.add('is-invalid');
}

function resetValidation() {
    document.querySelectorAll('.is-invalid').forEach(element => {
        element.classList.remove('is-invalid');
    });

    document.querySelector('.success-message').style.display = 'none';
}