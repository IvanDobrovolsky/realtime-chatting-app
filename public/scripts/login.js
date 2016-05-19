const socket = io();

const loginForm = document.querySelector('.page-login--section-form form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(event);

    socket.emit('login', {
        username: event.target[0].value,
        email:    event.target[1].value
    });

    socket.on('noUsersInChat', () => {
        window.location.assign('/invite');
    });

    socket.on('authorized', (user) => {
        localStorage.setItem('access-token', user.token);
        window.location.assign('/chat' + user.id);
    })
});