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

        if(response.status != 200)
            return;

        window.location.href = "/";
    }else {
        const response = await fetch(
            `http://localhost:3000/user/login/${user}/${pass}`
        )

        if(response.status != 200)
            return;

        window.location.href = "/";
    }
})

const deleteForm = document.getElementById('deleteUserForm');


const messageForm = document.getElementById('messageForm');

const deleteMessageForm = document.getElementById('deleteMessageForm');

const checkCurrentUser = async () => {
    const response = await fetch(
        "http://localhost:3000/user/current"
    );

    if(response.status != 200)
        return;

    const { user } = await response.json();

    if(!user)
        return;


    const messageForm = () => {
        const formContainer = document.getElementById("formContainer");

        const heading = document.createElement('h2');
        heading.textContent = 'Message Management';

        const form = document.createElement('form');
        form.addEventListener("submit", async(event)=>{
            event.preventDefault();

            const formData = new FormData(form);
            const content = formData.get('message');

            const response = await fetch(
                `http://localhost:3000/messages/add/${content}`,{method: "POST"}
            );

            if(response.status != 200)
                return;
            const msgFeed = document.getElementById('messagesFeed');
            const div = document.createElement('div');
            div.textContent = `${user}: ${content}`;
            msgFeed.appendChild(div);


            console.log(response.status);
        })

        form.id = 'messageForm';


        const msgLabel = document.createElement('label');
        msgLabel.setAttribute('for', 'message');
        msgLabel.textContent = 'Message:';

        const msgTextArea = document.createElement('textarea');
        msgTextArea.id = 'message';
        msgTextArea.name = 'message';
        msgTextArea.rows = 4;
        msgTextArea.required = true;

        const submit = document.createElement('input')
        submit.setAttribute("type", "submit");
        submit.value = 'Add Message'

        form.appendChild(msgLabel);
        form.appendChild(msgTextArea);
        form.appendChild(submit);

        formContainer.appendChild(heading);
        formContainer.appendChild(form);

    }

    messageForm();


    const editForm = () => {
        const formContainer = document.getElementById("formContainer");

        const heading = document.createElement('h3');
        heading.textContent = 'Edit Message';

        const form = document.createElement('form');

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const old_content = formData.get('editMessageId');
            const new_content = formData.get('editMessage');


            const response = await fetch(
                `http://localhost:3000/messages/edit/${old_content}/${new_content}`,{method: "POST"}
            );

            if(response.status != 200)
                return;

            const msgFeed = document.getElementById('messagesFeed');

            for(const child of msgFeed.children) {
                if(child.textContent == `${user}: ${old_content}`)
                    child.textContent = `${user}: ${new_content}`
            }

            console.log(response.status);
        })

        form.id = "editMessageForm";



        const messageIdLabel = document.createElement("label");
        messageIdLabel.setAttribute('for', 'editMessageId');
        messageIdLabel.textContent = 'Message ID:';

        const messageIdInput = document.createElement('input');
        messageIdInput.type = 'text';
        messageIdInput.id = 'editMessageId';
        messageIdInput.name = 'editMessageId';
        messageIdInput.required = true;


        const newMessageIdLabel = document.createElement("label");
        newMessageIdLabel.setAttribute('for', 'editMessage');
        newMessageIdLabel.textContent = 'New Message:';

        const newMessageIdtextArea = document.createElement('textarea');
        newMessageIdtextArea.id = 'editMessage'
        newMessageIdtextArea.name = 'editMessage';
        newMessageIdtextArea.rows = 4;
        newMessageIdtextArea.required = true;

        const submit = document.createElement('input')
        submit.setAttribute("type", "submit");
        submit.value = 'Edit Message'

        form.appendChild(messageIdLabel)
        form.appendChild(messageIdInput);
        form.appendChild(newMessageIdLabel);
        form.appendChild(newMessageIdtextArea);
        form.appendChild(submit);

        formContainer.appendChild(heading);
        formContainer.appendChild(form);
    }

    editForm();


    const deleteForm = async () => {
        const formContainer = document.getElementById('formContainer');

        const heading = document.createElement('h3');
        heading.textContent = 'Delete Message';


        const form = document.createElement('form');
        form.addEventListener("submit", async(event)=>{
            event.preventDefault();

            const formData = new FormData(form);
            const content = formData.get('deleteMessageId');

            const response = await fetch(
                `http://localhost:3000/messages/delete/${content}`,{method: "POST"}
            );

            if(response.status != 200)
                return;

            const msgFeed = document.getElementById('messagesFeed');

            for(const child of msgFeed.children) {
                if(child.textContent == `${user}: ${content}`)
                    msgFeed.removeChild(child);
}
        })

        form.id = 'deleteMessageForm';


        const delMsglabel = document.createElement('label');
        delMsglabel.setAttribute('for', 'deleteMessageId');
        delMsglabel.textContent = 'Message Id';

        const delMsgInput = document.createElement('input');
        delMsgInput.type = 'text';
        delMsgInput.id = 'deleteMessageId';
        delMsgInput.name = 'deleteMessageId';
        delMsgInput.required = true;

        const submit = document.createElement('input')
        submit.setAttribute("type", "submit");
        submit.value = 'Delete Message'

        form.appendChild(delMsglabel);
        form.appendChild(delMsgInput);
        form.appendChild(submit);

        formContainer.appendChild(heading);
        formContainer.appendChild(form);

    }

    deleteForm();


    const deleteUserForm = async() => {
        const formContainer = document.getElementById('formContainer2')
        const heading = document.createElement('h2');

        heading.textContent = 'Delete User';

        const form = document.createElement('form');
        form.id = 'deleteUserForm';

        form.addEventListener("submit", async(event)=> {
            event.preventDefault();

            const response = await fetch(
                `http://localhost:3000/user/delete`, {
                    method: "POST"
                }
            )

            console.log(response.status);

            if(response.status != 200)
                return;

            const msgFeed = document.getElementById('messagesFeed');
            for(let i = 0; i < msgFeed.children.length; ++i) {
                if(msgFeed.children[i].textContent.startsWith(`${user}:`)) {
                    msgFeed.removeChild(msgFeed.children[i]);
                    --i;
                }

            }

            window.location.href = "/";
        });


        const submit = document.createElement('input')
        submit.setAttribute("type", "submit");
        submit.value = 'Delete User';

        form.appendChild(submit);

        formContainer.appendChild(heading);
        formContainer.appendChild(form);

    }

    deleteUserForm();


    const heading = document.createElement("h2");
    heading.textContent = "Logout User"

    const logoutButton = document.createElement('button');
    logoutButton.textContent = "Logout";

    logoutButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const response = await fetch(
            'http://localhost:3000/user/logout'
        )

        if(response.status != 200)
            return;

        window.location.href = window.location.href;
    });

    document.getElementById("formContainer2").appendChild(heading);
    document.getElementById("formContainer2").appendChild(logoutButton);
}

const loadMessages = async () => {
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





    // ... load msg management, edit, del user, del msg


window.onload = () => {
    loadMessages();
    checkCurrentUser();
}
