/**
   Client-side code!
 */

//Creating a socket instance
const socket = io();

//Finding needed elements on the page
const loginSection = document.querySelector('section.page-login');
const loginForm    = loginSection.querySelector('.page-login--section-form form');
const chatSection  = document.querySelector('section.page-chat');
const sections     = Array.from(document.querySelectorAll('section'));

function login(){
    return new Promise(resolve => {
        loginForm.addEventListener('submit', (event) => {

            //Preventing a page from reload after submit
            event.preventDefault();

            let user =  {
                username: event.target[0].value,
                email:    event.target[1].value
            };

            socket.emit('login', user);

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

//TODO fix a bug with multiple connections and possible memory leaks
//TODO add babel polyfill for latency

window.addEventListener('load', () => {
    //First a login section is rendered
    render(loginSection);

    //After login a chat section is rendered
    login().then(user => render(chatSection, {withData: user}));

    //listening to connections from new user
    socket.on('newUser', (newUser) => {
        console.log('New user just joined!', newUser);
    })
});