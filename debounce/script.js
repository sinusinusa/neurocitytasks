const toggleButton = document.getElementById('toggleButton');
const elements = document.querySelectorAll('.element');

let isOpen = false;

function toggleElements() {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.toggle('show-element');
        }, index * 300); // Поочередное появление с интервалом 300 мс
    });

    isOpen = !isOpen;
}

function debounce(func, wait) {
    let timeout;

    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}

toggleButton.addEventListener('click', debounce(toggleElements, 1000));
