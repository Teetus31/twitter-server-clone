const loginForm = document.getElementById('loginForm');

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);

    const user = formData.get('username');
    const pass = formData.get('password');
    console.log(user, pass);

    if(formData.get('register')) {
        const response = await fetch(
            `http://localhost:3000/user/register/${user}/${pass}`,{
                method: 'POST',
            }
        );
        console.log(response.status);
    }else {
        const response = await fetch(
            `http://localhost:3000/user/login/${user}/${pass}`
        )
        console.log(response.status);
    }
})

const deleteForm = document.getElementById('deleteUserForm');
deleteForm.addEventListener("submit", async(event)=> {
    event.preventDefault();

    const formData = new FormData(deleteForm);
    const user = formData.get('deleteUsername');
    const pass = formData.get('deletePassword');

    const response = await fetch(
        `http://localhost:3000/user/delete/${user}/${pass}`, {
            method: "POST"
        }
    )

    if(response.status != 200)
        return;

    const msgFeed = document.getElementById('messagesFeed');
    for(let i = 0; i < msgFeed.children.length; ++i) {
        if(msgFeed.children[i].textContent.startsWith(`${user}:`)) {
            msgFeed.removeChild(msgFeed.children[i]);
            --i;
        }

    }
});

const messageForm = document.getElementById('messageForm');
messageForm.addEventListener("submit", async(event)=>{
    event.preventDefault();

    const formData = new FormData(messageForm);
    const username = formData.get('username');
    const content = formData.get('message');

    const response = await fetch(
        `http://localhost:3000/messages/add/${content}/${username}`,{method: "POST"}
    );

    if(response.status != 200)
        return;
    const msgFeed = document.getElementById('messagesFeed');
    const div = document.createElement('div');
    div.textContent = `${username}: ${content}`;
    msgFeed.appendChild(div);


    console.log(response.status);
})

const editMessageForm = document.getElementById('editMessageForm');
editMessageForm.addEventListener("submit", async(event)=>{
    event.preventDefault();

    const formData = new FormData(editMessageForm);
    const old_content = formData.get('editMessageId');
    const new_content = formData.get('editMessage');
    const username = formData.get('username');

    const response = await fetch(
        `http://localhost:3000/messages/edit/${username}/${old_content}/${new_content}`,{method: "POST"}
    );

    if(response.status != 200)
        return;

   const msgFeed = document.getElementById('messagesFeed');

    for(const child of msgFeed.children) {
        if(child.textContent == `${username}: ${old_content}`)
            child.textContent = `${username}: ${new_content}`
    }


    console.log(response.status);
})

const deleteMessageForm = document.getElementById('deleteMessageForm');
deleteMessageForm.addEventListener("submit", async(event)=>{
    event.preventDefault();

    const formData = new FormData(deleteMessageForm);
    const content = formData.get('deleteMessageId');
    const username = formData.get('username');

    const response = await fetch(
        `http://localhost:3000/messages/delete/${username}/${content}`,{method: "POST"}
    );

    if(response.status != 200)
        return;

    const msgFeed = document.getElementById('messagesFeed');

    for(const child of msgFeed.children) {
        if(child.textContent == `${username}: ${content}`)
            msgFeed.removeChild(child);
    }
})

window.onload = async () => {
    const response = await fetch(
        "http://localhost:3000/messages/getall"
    );

    const { msgList } = await response.json();
    console.log(msgList);
    const msgFeed = document.getElementById('messagesFeed');

    msgList.forEach(async msg => {
        const div = document.createElement('div');
        div.textContent = `${msg.username}: ${msg.content}`;
        msgFeed.appendChild(div);

    })
}
