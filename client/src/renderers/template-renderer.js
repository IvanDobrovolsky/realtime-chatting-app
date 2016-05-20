
function renderProfileSection(chatLeftSectionPanel, profile) {
    chatLeftSectionPanel.innerHTML = `<div class="page-chat--left-panel---profile">Your profile:
                                        <div class="page-chat--left-panel---profile-avatar"><img src="${profile.avatar}"/></div>
                                        <div class="page-chat--left-panel---profile-username">${profile.username}</div>
                                        <div class="page-chat--left-panel---profile-email">${profile.email}</div>
                                      </div>`;
}

function renderUsersSection(chatLeftSectionPanel, users) {
    const usersTemplate = users
        .map( user => `<div class="page-chat--left-panel---users-user">
                                                <img src="${user.avatar}" class="page-chat--left-panel---users-user-avatar"/>
                                                <div class="page-chat--left-panel---users-user-username">${user.username}</div>
                                            </div>
                             `)
        .reduce((a, b) => a + b, '');
    chatLeftSectionPanel.innerHTML += `<div class="page-chat--left-panel---users">Users in chat: ${usersTemplate === '' ? 'No users!' : usersTemplate}</div>`;
}

export default {
    renderProfileSection,
    renderUsersSection
}