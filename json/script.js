/* Recieve and processing data */
var base_url = 'https://reqres.in/api/users';
let currentPage = 1;
var totalPages = 1;

async function fetchData(page) {
    var url;
    if(page > 1){
        url = base_url+`?page=${currentPage}`;
        console.log(url);
    }
    else{
        url = base_url;
    }
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        json = await response.json();
        process(json);

    } catch (error) {
        console.error('Fetch error:', error);
    }
}
function fillUsers(users){

    users = users.sort((a, b) => {
        return a.first_name.localeCompare(b.first_name);
    });
    const userContainer = document.querySelector('.user-list');

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        const avatar = document.createElement('img');
        avatar.className = 'user-avatar';
        avatar.src = user.avatar;

        const userDetails = document.createElement('div');
        userDetails.className = 'user-details';

        const email = document.createElement('div');
        email.className = 'user-email';
        email.textContent = user.email;

        const name = document.createElement('div');
        name.className = 'user-name';
        name.textContent = `${user.first_name} ${user.last_name}`;

        const userId = document.createElement('div');
        userId.className = 'user-id';
        userId.textContent = `ID: ${user.id}`;

        userDetails.appendChild(email);
        userDetails.appendChild(name);
        userDetails.appendChild(userId);

        userCard.appendChild(avatar);
        userCard.appendChild(userDetails);

        userContainer.appendChild(userCard);
    });

}
function process(data){
    users = data.data;
    totalPages = data.total_pages;
    fillUsers(data.data);
    if (currentPage>=totalPages){
        disableShowMore();
    }
}

fetchData();
/* .Recieve and processing data */

/* Validation */
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

function isValidProfilePhotoUrl(url) {
    return url.startsWith("http://") || url.startsWith("https://");
}

function isValidName(name) {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
}

function isValidId(id) {
    const idRegex = /^[0-9]+$/;
    return idRegex.test(id);
}
/* .Validation */
/* page logic */
function disableShowMore(){
    showMore = document.querySelector("#showMoreButton");
    showMore.setAttribute('disabled', '');
    showMore.textContent = 'Больше пользователей не найдено';
}
/* .page logic */
/* events */
showMoreButton.addEventListener('click', () => {
    currentPage++;
        fetchData(currentPage);
});
/* .events */






