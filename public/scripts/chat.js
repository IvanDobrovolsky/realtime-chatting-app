/**
   Client-side code!
 */

//Finding needed elements on the page
const loginSection         = document.querySelector('section.page-login');
const loginForm            = loginSection.querySelector('.page-login--section-form form');
const chatSection          = document.querySelector('section.page-chat');
const chatLeftSectionPanel = chatSection.querySelector('aside.page-chat--left-panel');
const sections             = Array.from(document.querySelectorAll('section'));

function login(){
    return new Promise(resolve => {
        loginForm.addEventListener('submit', event => {

            //Preventing a page from reload after submit
            event.preventDefault();

            let user =  {
                username: event.target[0].value,
                email:    event.target[1].value
            };

            resolve(user);
        });
    });
}

//The function shows only specified section and hides all other
function show(sectionToRender){
    for(let section of sections){
        if (section.isSameNode(sectionToRender)){
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    }
}

function renderProfileSection(profile) {
    chatLeftSectionPanel.innerHTML = `<div class="page-chat--left-panel---profile">Your profile:
                                        <div class="page-chat--left-panel---profile-avatar"><img src="${profile.avatar}"/></div>
                                        <div class="page-chat--left-panel---profile-username">${profile.username}</div>
                                        <div class="page-chat--left-panel---profile-email">${profile.email}</div>
                                      </div>`;
}

function renderUsersSection(users) {
    const usersTemplate = users
                             .map( user => `<div class="page-chat--left-panel---users-user">
                                                <img src="${user.avatar}" class="page-chat--left-panel---users-user-avatar"/>
                                                <div class="page-chat--left-panel---users-user-username">${user.username}</div>
                                            </div>
                             `)
                             .reduce((a, b) => a + b, '');
    chatLeftSectionPanel.innerHTML += `<div class="page-chat--left-panel---users">Users in chat: ${usersTemplate === '' ? 'No users!' : usersTemplate}</div>`;
}


//TODO add babel polyfill for latency

window.addEventListener('load', () => {

    //First a login section is rendered
    show(loginSection);

    //Connecting via web-sockets
    login().then( user => {

        //Creating a socket instance
        const socket = io();

        //Firing a login event and passing data to it
        socket.emit('login', user);

        //After login a chat section is rendered
        show(chatSection);

        socket.on('joinedChat', chat => {
            renderProfileSection(chat.you);
            renderUsersSection(chat.other)
        });


        //listening to connections from new user
        socket.on('newUser', (newUser) => {
            console.log('New user just joined!', newUser);
        })
    });
});