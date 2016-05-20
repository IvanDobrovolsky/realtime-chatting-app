/**
   Client-side code!
 */

//Finding needed elements on the page
const loginSection = document.querySelector('section.page-login');
const loginForm    = loginSection.querySelector('.page-login--section-form form');
const chatSection  = document.querySelector('section.page-chat');
const sections     = Array.from(document.querySelectorAll('section'));

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
function render(sectionToRender){
    for(let section of sections){
        if (section.isSameNode(sectionToRender)){
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    }
}

//TODO add babel polyfill for latency

window.addEventListener('load', () => {

    //First a login section is rendered
    render(loginSection);

    //Connecting via web-sockets
    login().then( user => {

        //Creating a socket instance
        const socket = io();

        //Firing a login event and passing data to it
        socket.emit('login', user);

        //After login a chat section is rendered
        render(chatSection, {withData: user});

        //listening to connections from new user
        socket.on('newUser', (newUser) => {
            console.log('New user just joined!', newUser);
        })
    });
});