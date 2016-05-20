
function renderMessage(messagesSection, message, type){

    if(type === 'outcome') {
        messagesSection.innerHTML += `<div class="page-chat--messages-message---outcome">
                    <div class="page-chat--messages-message---outcome-text">${message.text}</div>
                </div>`
    } else if (type === 'income'){
        messagesSection.innerHTML += `<div class="page-chat--messages-message---income">
                    <img src="${message.user.avatar}" class="page-chat--messages-message---income-avatar"/>
                    <div class="page-chat--messages-message---income-container">
                        <div class="page-chat--messages-message---income-container-username">${message.user.username}</div>
                        <div class="page-chat--messages-message---income-container-text">${message.text}</div>
                    </div>
               </div>`
    }
}

export default {
    renderMessage
}