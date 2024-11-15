const HOST = 'https://ya-praktikum.tech/api/v2/';

let me = null;

const request = async (url, method, body) => {
    const resp = await fetch(`${HOST}${url}`, {
        credentials: 'include',
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null
    });

    if(!resp.ok) {
        const error = await resp.json();
        throw error.reason
    }

    if(resp.headers.get('content-type')?.includes('json')) {
        return await resp.json();
    }

    return await resp.text();
}

const viewForAuthUser = (user) => {
    const p = document.body.querySelector('.auth');
    p.classList.remove('hidden');

    const f = document.body.querySelector('.login-form');
    f.remove();

    renderSelectChat();
}

const onLogin = async (e) => {
    e.preventDefault();
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');

    const login = loginInput.value;
    const password = passwordInput.value;

    await request('auth/signin', 'POST', {login, password});

    me = await request('auth/user', 'GET');
    viewForAuthUser(me);
    e.target.reset()
}

const logout = async () => {
    await request('auth/logout', 'POST');
    window.location.reload()
}


const initApp = async () => {
    me = await request('auth/user', 'GET');
    viewForAuthUser(me)
}

const renderSelectChat = async () => {
    const chats = await request('chats', 'GET');
    const selectContainer = document.getElementById('select-chat-container');
    selectContainer.innerHTML = `
        <select id="chat-select">
            <option></option>
            ${chats.map(chat => `<option value="${chat.id}">${chat.title}</option>`)}
        </select>
    `;

    const select = selectContainer.querySelector('#chat-select')
    select.addEventListener('change', (e) => {
        const chatId = e.target.value;
        createWebSocket(chatId, me)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    const logoutBtn = document.querySelector('.logout');

    logoutBtn.addEventListener('click', logout)
    form.addEventListener('submit', onLogin);

    initApp();
})


const createWebSocket = async (chatid, user) => {
    const resp = await request(`chats/token/${chatid}`, 'POST');
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chatid}/${resp.token}`);

    socket.addEventListener('open', () => {
        console.log('Соединение установлено');

        const sendBtn = document.getElementById('send-message');
        const select = document.getElementById('typeMessage');

        sendBtn.addEventListener('click', () => {
            console.log()
            const textArea = document.getElementById('type-messages');
            socket.send(JSON.stringify({
                content: textArea.value,
                type: `${select.value}`,
              }));
        })
      });
      
      socket.addEventListener('close', event => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }
      
        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });
      
      socket.addEventListener('message', event => {
        console.log('Получены данные', event.data);

        const data = JSON.parse(event.data)

        const messages = document.getElementById('chats');
        const div = document.createElement('div');

        div.classList.add('message')

        if(data.user_id === me.id) {
            div.classList.add('message_me')
        }
        div.innerText = data.content

        messages.append(div)
      });
      
      socket.addEventListener('error', event => {
        console.log('Ошибка', event.message);
      }); 
}

