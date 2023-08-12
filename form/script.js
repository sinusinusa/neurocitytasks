const form = document.getElementById('myForm');
const errorContainer = document.getElementById('errorContainer');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    errorContainer.innerHTML = ''; // Очистить контейнер с ошибками

    const name = form.name.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!/^[а-яА-Яa-zA-Z]{3,30}$/.test(name)) {
        showError('Имя должно содержать только кириллицу или латиницу и быть длиной от 3 до 30 символов.');
    }

    if (!/^\+?\d{10,15}$/.test(phone)) {
        showError('Телефон должен содержать от 10 до 15 цифр и может начинаться с плюса.');
    }

    if (!/^(?=.*[A-Z])(?=.*\d).{8,40}$/.test(password)) {
        showError('Пароль должен содержать от 8 до 40 символов, хотя бы одну заглавную букву и одну цифру.');
    }

    if (password !== confirmPassword) {
        showError('Пароли не совпадают.');
    }
});

function showError(message) {
    const errorParagraph = document.createElement('p');
    errorParagraph.textContent = message;
    errorContainer.appendChild(errorParagraph);
}