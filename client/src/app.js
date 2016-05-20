
import toastr from 'toastr';
import utils from './utils';
import templateRenderer from './renderers/template-renderer';

//Finding needed elements on the page
const loginSection         = document.querySelector('section.page-login');
const loginForm            = loginSection.querySelector('.page-login--section-form form');
const chatSection          = document.querySelector('section.page-chat');
const chatLeftSectionPanel = chatSection.querySelector('aside.page-chat--left-panel');
const sections             = Array.from(document.querySelectorAll('section'));


window.addEventListener('load', () => {

    //First a login section is rendered
    utils.show(loginSection, sections);

    //Connecting via web-sockets
    utils.login(loginForm).then( user => {

        //Creating a socket instance
        const socket = io();

        //'Your' user object will be stored in here
        let you = {};

        //Firing a login event and passing data to it
        socket.emit('login', user);

        //After login a chat section is rendered
        utils.show(chatSection, sections);

        socket.on('youJoinedChat', chat => {
            you = chat.user;
            templateRenderer.renderProfileSection(chatLeftSectionPanel, chat.user);
            templateRenderer.renderUsersSection(chatLeftSectionPanel, chat.other);
            toastr.success('You joined chat!');
        });

        
        //listening to connections from new user
        socket.on('newUserJoinedChat', chat => {
            console.log(chat);
            toastr.success(`'${chat.user.username}' just joined the chat!`);
            templateRenderer.renderProfileSection(chatLeftSectionPanel, you);
            templateRenderer.renderUsersSection(chatLeftSectionPanel, utils.getOtherUsers(you, chat.other));
        });

        socket.on('userLeftChat', chat => {
            console.log(chat);
            toastr.error(`'${chat.user.username}' just left the chat!`);
            templateRenderer.renderProfileSection(chatLeftSectionPanel, you);
            templateRenderer.renderUsersSection(chatLeftSectionPanel, utils.getOtherUsers(you, chat.other));
        })
    });
});