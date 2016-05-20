function login(loginForm){
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
function show(sectionToRender, sections){
    for(let section of sections){
        if (section.isSameNode(sectionToRender)){
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    }
}

//Showing only other users, not you
function getOtherUsers(you, users){
    let other = [...users];
    other.splice(other.findIndex(user => user.id === you.id), 1);
    return other;
}

export default {
    login,
    show,
    getOtherUsers
}